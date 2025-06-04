
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Package, MapPin, BarChart3, Clock, CheckCircle } from "lucide-react";
import { NotificationDropdown } from './NotificationDropdown';

export const CollectorDashboard = () => {
  const { profile, signOut } = useAuth();

  // Get collector profile from database (would need separate hook)
  const collectorProfile = {
    business_name: "CV Maju Jaya",
    current_tier: "pemula",
    trial_status: "pending",
    trial_expires_at: "2024-04-15",
    is_verified: false
  };

  const getTierBadge = (tier: string) => {
    const tierColors = {
      pemula: "bg-gray-100 text-gray-800",
      amatir: "bg-blue-100 text-blue-800", 
      advance: "bg-purple-100 text-purple-800",
      pro: "bg-gold-100 text-gold-800"
    };
    return tierColors[tier as keyof typeof tierColors] || "bg-gray-100 text-gray-800";
  };

  const getTrialStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return "bg-yellow-100 text-yellow-800";
      case 'approved':
        return "bg-green-100 text-green-800";
      case 'rejected':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    { title: "Barang Tersedia", value: "24", icon: Package, color: "text-blue-600" },
    { title: "Transaksi Bulan Ini", value: "15", icon: BarChart3, color: "text-green-600" },
    { title: "Jadwal Hari Ini", value: "3", icon: Clock, color: "text-purple-600" },
    { title: "Rating", value: "4.8/5", icon: CheckCircle, color: "text-orange-600" }
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
                  {collectorProfile.business_name}
                </h1>
                <div className="flex items-center space-x-2">
                  <Badge className={getTierBadge(collectorProfile.current_tier)}>
                    Tier {collectorProfile.current_tier.toUpperCase()}
                  </Badge>
                  {collectorProfile.trial_status === 'pending' && (
                    <Badge className={getTrialStatusBadge(collectorProfile.trial_status)}>
                      Trial Pending
                    </Badge>
                  )}
                  {!collectorProfile.is_verified && (
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                      Belum Terverifikasi
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationDropdown />
              <Button variant="outline" onClick={signOut}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trial Info */}
        {collectorProfile.trial_status === 'pending' && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Permohonan Trial PRO Sedang Diproses
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Kami sedang meninjau permohonan trial Tier PRO Anda. Proses verifikasi memakan waktu maksimal 24 jam.
                Setelah disetujui, Anda akan mendapat akses penuh ke fitur Tier PRO selama 3 bulan.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

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
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="map">Peta Interaktif</TabsTrigger>
            <TabsTrigger value="schedule">Jadwal</TabsTrigger>
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="statistics">Statistik</TabsTrigger>
            <TabsTrigger value="subscription">Langganan</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Peta Barang Bekas Tersedia</CardTitle>
                <CardDescription>Lihat lokasi barang bekas yang tersedia sesuai tier Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-4" />
                    <p>Peta interaktif akan segera hadir</p>
                    <p className="text-sm text-emerald-500 mt-2">
                      Fitur ini akan menampilkan lokasi barang bekas sesuai dengan tier langganan Anda
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Jadwal Pengambilan</CardTitle>
                <CardDescription>Kelola jadwal pengambilan barang bekas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Belum ada jadwal pengambilan
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Riwayat Transaksi</CardTitle>
                <CardDescription>Daftar transaksi pembelian barang bekas</CardDescription>
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
                <CardTitle className="text-emerald-800">Statistik Bisnis</CardTitle>
                <CardDescription>Analisis performa bisnis pengepul</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  Fitur statistik akan segera hadir
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-emerald-800">Status Langganan</CardTitle>
                <CardDescription>Kelola tier dan langganan Anda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-emerald-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-emerald-800">Tier Saat Ini</h3>
                    <Badge className={getTierBadge(collectorProfile.current_tier)}>
                      {collectorProfile.current_tier.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-emerald-600">
                    Anda menggunakan tier {collectorProfile.current_tier} dengan batasan akses sesuai tier tersebut.
                  </p>
                </div>

                {collectorProfile.trial_status === 'pending' && (
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Trial PRO (Pending)</h3>
                    <p className="text-sm text-yellow-700">
                      Permohonan trial PRO sedang diproses. Jika disetujui, Anda akan mendapat akses ke semua fitur tier PRO selama 3 bulan.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
