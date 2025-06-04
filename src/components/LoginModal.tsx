
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (type: 'customer' | 'collector') => void;
}

export const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (type: 'customer' | 'collector') => {
    // Simulate login
    onLogin(type);
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-emerald-800">Masuk ke Barbekyu</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Pelanggan</TabsTrigger>
            <TabsTrigger value="collector">Pengepul</TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-email">Email</Label>
              <Input
                id="customer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer-password">Password</Label>
              <Input
                id="customer-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button 
              onClick={() => handleLogin('customer')} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Masuk sebagai Pelanggan
            </Button>
          </TabsContent>
          
          <TabsContent value="collector" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collector-email">Email</Label>
              <Input
                id="collector-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collector-password">Password</Label>
              <Input
                id="collector-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button 
              onClick={() => handleLogin('collector')} 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Masuk sebagai Pengepul
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
