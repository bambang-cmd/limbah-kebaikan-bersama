
import { useWasteItems } from '@/hooks/useWasteItems';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Weight } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export const WasteItemsList = () => {
  const { wasteItems, loading, updateWasteItemStatus } = useWasteItems();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Tersedia';
      case 'reserved':
        return 'Dipesan';
      case 'sold':
        return 'Terjual';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-emerald-600">Memuat daftar barang...</div>
      </div>
    );
  }

  if (wasteItems.length === 0) {
    return (
      <div className="text-center p-8">
        <div className="text-gray-500 mb-4">Belum ada barang bekas yang diposting</div>
        <p className="text-sm text-gray-400">
          Mulai jual barang bekas Anda untuk mendapatkan penghasilan tambahan
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {wasteItems.map((item) => (
        <Card key={item.id} className="border-emerald-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-emerald-800">{item.waste_type}</CardTitle>
              <Badge className={getStatusColor(item.status)}>
                {getStatusText(item.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-4 text-sm text-emerald-600">
              <div className="flex items-center space-x-1">
                <Weight className="w-4 h-4" />
                <span>{item.weight} kg</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-emerald-600">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{item.location_address}</span>
            </div>

            {item.description && (
              <p className="text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg">
                {item.description}
              </p>
            )}

            {item.status === 'available' && (
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateWasteItemStatus(item.id, 'cancelled')}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Batalkan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
