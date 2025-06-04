
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, Settings, BarChart3 } from "lucide-react";

export const AdminDashboard = () => {
  const { signOut } = useAuth();

  const stats = [
    { title: "Total Pengguna", value: "1,248", icon: Users, color: "text-blue-600" },
    { title: "Pengepul Aktif", value: "342", icon: UserCheck, color: "text-green-600" },
    { title: "Transaksi Bulan Ini", value: "856", icon: BarChart3, color: "text-purple-600" },
    { title: "Pendapatan", value: "Rp 45.2M", icon: Settings, color: "text-orange-600" }
  ];

  const pendingApprovals = [
    { id: 1, name: "CV Maju Jaya", type: "Trial Pengepul Pro", date: "2024-01-15" },
    { id: 2, name: "UD Sukses Mandiri", type: "Trial Pengepul Pro", date: "2024-01-14" },
    { id: 3, name: "PT Hijau Lestari", type: "Trial Pengepul Pro", date: "2024-01-13" }
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
                <h1 className="text-xl font-bold text-emerald-800">Dashboard Admin</h1>
                <Badge className="bg-red-100 text-red-800 text-xs">
                  Administrator
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-800">Permohonan Trial Pending</CardTitle>
              <CardDescription>Pengepul yang mengajukan trial PRO</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex justify-between items-center p-4 border border-emerald-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-emerald-800">{approval.name}</h3>
                    <p className="text-sm text-emerald-600">{approval.type}</p>
                    <p className="text-xs text-emerald-500">{approval.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Setujui
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                      Tolak
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-emerald-800">Aksi Cepat</CardTitle>
              <CardDescription>Fitur administrasi platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start border-emerald-200">
                <Users className="w-4 h-4 mr-2" />
                Kelola Pengguna
              </Button>
              <Button variant="outline" className="w-full justify-start border-emerald-200">
                <BarChart3 className="w-4 h-4 mr-2" />
                Laporan Platform
              </Button>
              <Button variant="outline" className="w-full justify-start border-emerald-200">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan Sistem
              </Button>
              <Button variant="outline" className="w-full justify-start border-emerald-200">
                <UserCheck className="w-4 h-4 mr-2" />
                Verifikasi Pengepul
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
