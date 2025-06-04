
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    businessDescription: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = (type: string) => {
    console.log(`Registering as ${type}:`, formData);
    // Reset form
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      address: '',
      businessDescription: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Daftar di Barbekyu</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Pelanggan</TabsTrigger>
            <TabsTrigger value="collector">Pengepul</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer-email">Email</Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@contoh.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-name">Nama Lengkap</Label>
                <Input
                  id="customer-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nama lengkap"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer-password">Password</Label>
                <Input
                  id="customer-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-confirm">Konfirmasi Password</Label>
                <Input
                  id="customer-confirm"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer-phone">No. Telepon / WhatsApp</Label>
              <Input
                id="customer-phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="08123456789"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customer-address">Alamat</Label>
              <Textarea
                id="customer-address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Alamat lengkap"
                rows={3}
              />
            </div>
            
            <Button 
              onClick={() => handleRegister('customer')} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Daftar sebagai Pelanggan
            </Button>
          </TabsContent>
          
          <TabsContent value="collector" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collector-email">Email</Label>
                <Input
                  id="collector-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@contoh.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collector-name">Nama Usaha</Label>
                <Input
                  id="collector-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nama usaha pengepul"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collector-password">Password</Label>
                <Input
                  id="collector-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collector-confirm">Konfirmasi Password</Label>
                <Input
                  id="collector-confirm"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collector-phone">No. Telepon / WhatsApp</Label>
              <Input
                id="collector-phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="08123456789"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collector-address">Alamat Usaha</Label>
              <Textarea
                id="collector-address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Alamat lokasi usaha"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collector-business">Deskripsi Usaha</Label>
              <Textarea
                id="collector-business"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                placeholder="Deskripsikan usaha pengepul Anda"
                rows={3}
              />
            </div>
            
            <Button 
              onClick={() => handleRegister('collector')} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Daftar sebagai Pengepul
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
