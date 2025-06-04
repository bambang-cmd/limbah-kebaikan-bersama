
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Bell, BarChart3, Share2 } from "lucide-react";
import { SellItemModal } from './SellItemModal';
import { WasteItemsList } from './WasteItemsList';
import { NotificationDropdown } from './NotificationDropdown';

export const CustomerDashboard = () => {
  const { profile, signOut } = useAuth();
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const stats = [
    { title: "Total Posting", value: "12", icon: Package, color: "text-blue-600" },
    { title: "Terjual", value: "8", icon: BarChart3, color: "text-green-600" },
    { title: "Penghasilan", value: "Rp 250K", icon: Share2, color: "text-purple-600" },
    { title: "Dampak Lingkungan", value: "45kg CO₂", icon: Bell, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-800">
                  Halo, {profile?.name || 'Pelanggan'}!
                </h1>
                <Badge className="bg-blue-100 text-blue-800 text-xs">
                  Pelanggan
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationDropdown />
              <Button
                onClick={() => setIsSellModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Jual Barang
              </Button>
              <Button variant="outline" onClick={signOut}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-800">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="items">Barang Saya</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="statistics">Statistik</TabsTrigger>
            <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-emerald-800">Daftar Barang Bekas</CardTitle>
                    <CardDescription>Kelola barang bekas yang Anda posting</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsSellModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Barang
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <WasteItemsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Riwayat Transaksi</CardTitle>
                <CardDescription>Daftar transaksi penjualan barang bekas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Fitur transaksi akan segera hadir
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Statistik Penjualan</CardTitle>
                <CardDescription>Analisis performa penjualan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Fitur statistik akan segera hadir
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Pencapaian Lingkungan</CardTitle>
                <CardDescription>Dampak positif Anda terhadap lingkungan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Fitur pencapaian akan segera hadir
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <SellItemModal 
        isOpen={isSellModalOpen} 
        onClose={() => setIsSellModalOpen(false)} 
      />
    </div>
  );
};
