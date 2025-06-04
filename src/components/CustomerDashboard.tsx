
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Calendar, User } from "lucide-react";
import { SellItemModal } from "@/components/SellItemModal";

interface CustomerDashboardProps {
  onLogout: () => void;
}

export const CustomerDashboard = ({ onLogout }: CustomerDashboardProps) => {
  const [showSellModal, setShowSellModal] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "3 pengepul tertarik dengan barang plastik Anda",
      time: "2 menit yang lalu",
      type: "new"
    },
    {
      id: 2,
      message: "Pengambilan kardus dijadwalkan besok pagi",
      time: "1 jam yang lalu",
      type: "schedule"
    }
  ];

  const activeListings = [
    {
      id: 1,
      type: "Plastik",
      weight: "5 kg",
      status: "Menunggu pengepul",
      interested: 3
    },
    {
      id: 2,
      type: "Kardus",
      weight: "15 kg",
      status: "Dijadwalkan",
      date: "Besok, 09:00"
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
                <h1 className="text-xl font-bold text-emerald-800">Dashboard Pelanggan</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowSellModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Jual Barang
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
          <div className="md:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-emerald-600">Total Terjual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-800">47 kg</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-emerald-600">Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-800">Rp 235K</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-emerald-600">CO2 Diselamatkan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-800">94 kg</div>
                </CardContent>
              </Card>
            </div>

            {/* Active Listings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Barang Aktif Dijual</CardTitle>
                <CardDescription>Daftar barang bekas yang sedang ditawarkan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeListings.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 border border-emerald-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-emerald-800">{item.type}</h3>
                      <p className="text-sm text-emerald-600">{item.weight}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={item.status === "Dijadwalkan" ? "default" : "secondary"}
                        className={item.status === "Dijadwalkan" ? "bg-emerald-100 text-emerald-800" : ""}
                      >
                        {item.status}
                      </Badge>
                      {item.interested && (
                        <p className="text-xs text-emerald-600 mt-1">{item.interested} pengepul tertarik</p>
                      )}
                      {item.date && (
                        <p className="text-xs text-emerald-600 mt-1">{item.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 border border-emerald-200 rounded-lg">
                    <p className="text-sm text-emerald-700">{notif.message}</p>
                    <p className="text-xs text-emerald-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-emerald-800">Ahmad Pelanggan</h3>
                  <p className="text-sm text-emerald-600">Member sejak Jan 2024</p>
                  <Badge className="mt-2 bg-emerald-100 text-emerald-800">
                    Eco Warrior
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SellItemModal 
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
      />
    </div>
  );
};
