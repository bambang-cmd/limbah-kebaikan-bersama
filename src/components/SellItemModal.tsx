
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

interface SellItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const wasteTypes = [
  "Aki", "Elektronik", "Kaca", "Kaleng", "Kain", 
  "Minyak & Oli", "Plastik", "Styrofoam", "Kardus", 
  "Kertas", "Kayu & Perabotan", "Besi", "Kuningan", 
  "Aluminium", "Tembaga"
];

export const SellItemModal = ({ isOpen, onClose }: SellItemModalProps) => {
  const [formData, setFormData] = useState({
    type: '',
    weight: '',
    description: '',
    location: '',
    photos: []
  });

  const handleSubmit = () => {
    console.log('Selling item:', formData);
    // Reset form
    setFormData({
      type: '',
      weight: '',
      description: '',
      location: '',
      photos: []
    });
    onClose();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({ 
            ...prev, 
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` 
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Jual Barang Bekas</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="waste-type">Jenis Barang Bekas</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis barang bekas" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Berat (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              placeholder="Masukkan berat dalam kg"
              min="0"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi (Opsional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Deskripsi kondisi barang, catatan khusus, dll."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lokasi</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Alamat atau koordinat GPS"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="px-3"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-emerald-600">
              Gunakan tombol GPS untuk mendapatkan lokasi otomatis
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photos">Foto Barang (Opsional)</Label>
            <Input
              id="photos"
              type="file"
              multiple
              accept="image/*"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            <p className="text-xs text-emerald-600">
              Upload foto untuk menarik lebih banyak pengepul
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-2">Informasi Penting:</h4>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Barang akan di-broadcast ke pengepul dalam radius 20km</li>
              <li>• Anda akan mendapat notifikasi jika ada pengepul yang tertarik</li>
              <li>• Gratis untuk pelanggan, tidak ada biaya apapun</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Batal
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={!formData.type || !formData.weight || !formData.location}
            >
              Posting Barang
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
