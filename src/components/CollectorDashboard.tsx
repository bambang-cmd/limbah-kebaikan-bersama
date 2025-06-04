
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Bell, Calendar, User, Star } from "lucide-react";

interface CollectorDashboardProps {
  onLogout: () => void;
}

export const CollectorDashboard = ({ onLogout }: CollectorDashboardProps) => {
  const [currentTier] = useState("PRO - TRIAL");

  const availableItems = [
    {
      id: 1,
      type: "Plastik",
      weight: "5 kg",
      distance: "1.2 km",
      price: "Rp 15.000",
      customer: "Ahmad S.",
      location: "Jl. Merdeka No. 12"
    },
    {
      id: 2,
      type: "Kardus",
      weight: "15 kg",
      distance: "0.8 km",
      price: "Rp 45.000",
      customer: "Sari M.",
      location: "Jl. Mawar No. 5"
    },
    {
      id: 3,
      type: "Besi",
      weight: "25 kg",
      distance: "3.1 km",
      price: "Rp 125.000",
      customer: "Budi T.",
      location: "Jl. Kenanga No. 8"
    }
  ];

  const scheduledPickups = [
    {
      id: 1,
      customer: "Ahmad S.",
      items: "Plastik 5kg",
      time: "09:00",
      location: "Jl. Merdeka No. 12",
      status: "confirmed"
    },
    {
      id: 2,
      customer: "Dewi L.",
      items: "Kardus 10kg",
      time: "14:00",
      location: "Jl. Anggrek No. 15",
      status: "pending"
    }
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
                <h1 className="text-xl font-bold text-emerald-800">Dashboard Pengepul</h1>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                  {currentTier}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-emerald-300 text-emerald-700">
                Upgrade Tier
              </Button>
              <Button variant="outline" onClick={onLogout}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="map" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map">Peta Interaktif</TabsTrigger>
                <TabsTrigger value="available">Barang Tersedia</TabsTrigger>
                <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              </TabsList>

              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Peta Barang Bekas</CardTitle>
                    <CardDescription>Lokasi barang bekas yang tersedia dalam radius Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center">
                      <div className="text-center text-emerald-600">
                        <MapPin className="w-12 h-12 mx-auto mb-4" />
                        <p className="font-semibold">Peta Interaktif</p>
                        <p className="text-sm">Menampilkan lokasi barang bekas tersedia</p>
                        <div className="flex justify-center space-x-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-xs">Plastik</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs">Kardus</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs">Besi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="available">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Barang Tersedia</CardTitle>
                    <CardDescription>Daftar barang bekas yang bisa Anda beli</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {availableItems.map((item) => (
                      <div key={item.id} className="p-4 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-emerald-800">{item.type}</h3>
                            <p className="text-sm text-emerald-600">{item.weight} • {item.distance}</p>
                            <p className="text-xs text-emerald-500">{item.customer} • {item.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-800">{item.price}</div>
                            <Button size="sm" className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                              Hubungi
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-emerald-800">Jadwal Pengambilan</CardTitle>
                    <CardDescription>Jadwal pengambilan barang hari ini</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scheduledPickups.map((pickup) => (
                      <div key={pickup.id} className="p-4 border border-emerald-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-emerald-800">{pickup.customer}</h3>
                            <p className="text-sm text-emerald-600">{pickup.items}</p>
                            <p className="text-xs text-emerald-500">{pickup.location}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-800">{pickup.time}</div>
                            <Badge 
                              variant={pickup.status === "confirmed" ? "default" : "secondary"}
                              className={pickup.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : ""}
                            >
                              {pickup.status === "confirmed" ? "Dikonfirmasi" : "Menunggu"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Statistik Bulan Ini</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-emerald-600">Total Beli</span>
                  <span className="font-bold text-emerald-800">342 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Pengeluaran</span>
                  <span className="font-bold text-emerald-800">Rp 1.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Transaksi</span>
                  <span className="font-bold text-emerald-800">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-600">Rating</span>
                  <span className="font-bold text-emerald-800 flex items-center">
                    4.8 <Star className="w-4 h-4 text-yellow-500 ml-1" />
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Tier Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Tier Langganan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge className="bg-emerald-100 text-emerald-800 mb-2">
                    PRO - TRIAL
                  </Badge>
                  <p className="text-sm text-emerald-600 mb-4">
                    Trial berakhir dalam 45 hari
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Beli Langganan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-emerald-200">
                  <Bell className="w-4 h-4 mr-2" />
                  Atur Notifikasi
                </Button>
                <Button variant="outline" className="w-full justify-start border-emerald-200">
                  <Calendar className="w-4 h-4 mr-2" />
                  Lihat Riwayat
                </Button>
                <Button variant="outline" className="w-full justify-start border-emerald-200">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
