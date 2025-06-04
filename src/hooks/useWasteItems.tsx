
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface WasteItem {
  id: string;
  customer_id: string;
  waste_type: string;
  weight: number;
  description?: string;
  location_address: string;
  location_coordinates: number[];
  photos?: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface CreateWasteItemData {
  waste_type: string;
  weight: number;
  description?: string;
  location_address: string;
  location_coordinates: number[];
  photos?: string[];
}

export const useWasteItems = () => {
  const [wasteItems, setWasteItems] = useState<WasteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchWasteItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('waste_items')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching waste items:', error);
        return;
      }

      setWasteItems(data || []);
    } catch (error) {
      console.error('Error in fetchWasteItems:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWasteItem = async (itemData: CreateWasteItemData) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      // Format coordinates as PostGIS point
      const coordinates = `(${itemData.location_coordinates[0]}, ${itemData.location_coordinates[1]})`;
      
      const { data, error } = await supabase
        .from('waste_items')
        .insert([
          {
            customer_id: user.id,
            waste_type: itemData.waste_type,
            weight: itemData.weight,
            description: itemData.description,
            location_address: itemData.location_address,
            location_coordinates: coordinates,
            photos: itemData.photos || []
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating waste item:', error);
        throw error;
      }

      // Add to local state
      setWasteItems(prev => [data, ...prev]);
      
      toast({
        title: "Berhasil!",
        description: "Barang bekas berhasil diposting. Notifikasi telah dikirim ke pengepul yang sesuai.",
      });

      return data;
    } catch (error) {
      console.error('Error in createWasteItem:', error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memposting barang bekas.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const updateWasteItemStatus = async (itemId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('waste_items')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', itemId);

      if (error) {
        console.error('Error updating waste item status:', error);
        throw error;
      }

      // Update local state
      setWasteItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, status } : item
        )
      );

      toast({
        title: "Status diperbarui",
        description: "Status barang bekas berhasil diperbarui.",
      });
    } catch (error) {
      console.error('Error in updateWasteItemStatus:', error);
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan saat memperbarui status.",
        variant: "destructive"
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchWasteItems();
  }, [user]);

  return {
    wasteItems,
    loading,
    createWasteItem,
    updateWasteItemStatus,
    refetch: fetchWasteItems
  };
};
