
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, User, Search, Calendar, Bell } from "lucide-react";
import { PricingTable } from "@/components/PricingTable";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { CollectorDashboard } from "@/components/CollectorDashboard";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [userType, setUserType] = useState<'customer' | 'collector' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (type: 'customer' | 'collector') => {
    setUserType(type);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };

  if (isLoggedIn && userType) {
    return userType === 'customer' ? 
      <CustomerDashboard onLogout={handleLogout} /> : 
      <CollectorDashboard onLogout={handleLogout} />;
  }

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
                <h1 className="text-2xl font-bold text-emerald-800">Barbekyu</h1>
                <p className="text-xs text-emerald-600">Barang Bekas Milik You</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowLogin(true)}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                Masuk
              </Button>
              <Button 
                onClick={() => setShowRegister(true)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-emerald-900 mb-6">
            Platform Jual-Beli Limbah
            <span className="text-emerald-600"> Barang Bekas</span>
          </h1>
          <p className="text-xl text-emerald-700 mb-8 leading-relaxed">
            Menghubungkan penjual dengan pengepul secara efektif sambil 
            mengkampanyekan pelestarian lingkungan melalui daur ulang
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowRegister(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-3"
            >
              Mulai Jual Barang Bekas
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowRegister(true)}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-3"
            >
              Daftar Sebagai Pengepul
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-900 mb-12">
            Mengapa Memilih Barbekyu?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-emerald-200">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">Gratis untuk Pelanggan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600">
                  Platform 100% gratis untuk penjual barang bekas. Dapatkan keuntungan maksimal dari limbah Anda.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">Sistem Matching Otomatis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600">
                  Algoritma cerdas mencocokkan barang bekas dengan pengepul yang sesuai berdasarkan lokasi dan jenis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-800">Notifikasi Real-time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-emerald-600">
                  Dapatkan notifikasi langsung ketika ada pengepul yang tertarik dengan barang bekas Anda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-900 mb-12">
            Paket Langganan Pengepul
          </h2>
          <PricingTable />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-900 mb-12">
            Cara Kerja Platform
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800 mb-2">Pelanggan Input Barang Bekas</h3>
                <p className="text-emerald-600">Masukkan jenis, berat, dan lokasi barang bekas yang ingin dijual</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800 mb-2">Sistem Broadcast ke Pengepul</h3>
                <p className="text-emerald-600">Platform mengirim notifikasi ke pengepul yang sesuai dengan tier langganan</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800 mb-2">Komunikasi & Negosiasi</h3>
                <p className="text-emerald-600">Pelanggan dan pengepul berkomunikasi langsung untuk negosiasi harga</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-emerald-800 mb-2">Transaksi Selesai</h3>
                <p className="text-emerald-600">Pengambilan barang, transaksi, rating, dan review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-emerald-800 font-bold text-lg">B</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Barbekyu</h3>
              <p className="text-sm text-emerald-200">Barang Bekas Milik You</p>
            </div>
          </div>
          <p className="text-emerald-200 mb-4">
            Platform jual-beli limbah barang bekas untuk pelestarian lingkungan dan peningkatan ekonomi masyarakat
          </p>
          <p className="text-emerald-300 text-sm">
            © 2024 Barbekyu. Semua hak dilindungi.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
      <RegisterModal 
        isOpen={showRegister} 
        onClose={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Index;
