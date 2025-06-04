
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const ProfileSetup = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [basicForm, setBasicForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    address: '',
    social_media_links: {}
  });

  const [customerForm, setCustomerForm] = useState({
    job: ''
  });

  const [collectorForm, setCollectorForm] = useState({
    business_name: '',
    business_description: '',
    business_address: '',
    founding_year: new Date().getFullYear(),
    specialties: [] as string[],
    daily_capacity: 0,
    price_list: {}
  });

  useEffect(() => {
    if (profile?.is_profile_complete) {
      navigate('/');
    }
  }, [profile, navigate]);

  const availableSpecialties = [
    'Aki', 'Elektronik', 'Kaca', 'Kaleng', 'Kain', 'Minyak & Oli', 
    'Plastik', 'Styrofoam', 'Kardus', 'Kertas', 'Kayu & Perabotan', 
    'Besi', 'Kuningan', 'Aluminium', 'Tembaga'
  ];

  const handleSpecialtyToggle = (specialty: string) => {
    setCollectorForm(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setLoading(true);

    try {
      // Update basic profile
      const { error: profileError } = await updateProfile({
        ...basicForm,
        is_profile_complete: true
      });

      if (profileError) throw profileError;

      // Update role-specific profile
      if (profile.role === 'customer') {
        const { error } = await supabase
          .from('customer_profiles')
          .upsert({
            id: user.id,
            ...customerForm
          });
        if (error) throw error;
      } else if (profile.role === 'collector') {
        const { error } = await supabase
          .from('collector_profiles')
          .upsert({
            id: user.id,
            ...collectorForm
          });
        if (error) throw error;
      }

      toast({
        title: "Profil Berhasil Disimpan",
        description: "Selamat datang di Barbekyu!"
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }

    setLoading(false);
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-emerald-800">Lengkapi Profil Anda</CardTitle>
          <CardDescription>
            Sebagai {profile.role === 'customer' ? 'Pelanggan' : 'Pengepul'}, silakan lengkapi informasi berikut
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-emerald-800">Informasi Dasar</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={basicForm.name}
                    onChange={(e) => setBasicForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    value={basicForm.phone}
                    onChange={(e) => setBasicForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">No. WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={basicForm.whatsapp}
                  onChange={(e) => setBasicForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat</Label>
                <Textarea
                  id="address"
                  value={basicForm.address}
                  onChange={(e) => setBasicForm(prev => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Role-specific Information */}
            {profile.role === 'customer' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">Informasi Pelanggan</h3>
                <div className="space-y-2">
                  <Label htmlFor="job">Pekerjaan</Label>
                  <Input
                    id="job"
                    value={customerForm.job}
                    onChange={(e) => setCustomerForm(prev => ({ ...prev, job: e.target.value }))}
                    required
                  />
                </div>
              </div>
            )}

            {profile.role === 'collector' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">Informasi Pengepul</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business_name">Nama Usaha</Label>
                    <Input
                      id="business_name"
                      value={collectorForm.business_name}
                      onChange={(e) => setCollectorForm(prev => ({ ...prev, business_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founding_year">Tahun Pendirian</Label>
                    <Input
                      id="founding_year"
                      type="number"
                      value={collectorForm.founding_year}
                      onChange={(e) => setCollectorForm(prev => ({ ...prev, founding_year: parseInt(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_description">Deskripsi Usaha</Label>
                  <Textarea
                    id="business_description"
                    value={collectorForm.business_description}
                    onChange={(e) => setCollectorForm(prev => ({ ...prev, business_description: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_address">Alamat Usaha</Label>
                  <Textarea
                    id="business_address"
                    value={collectorForm.business_address}
                    onChange={(e) => setCollectorForm(prev => ({ ...prev, business_address: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daily_capacity">Kapasitas Harian (kg)</Label>
                  <Input
                    id="daily_capacity"
                    type="number"
                    value={collectorForm.daily_capacity}
                    onChange={(e) => setCollectorForm(prev => ({ ...prev, daily_capacity: parseInt(e.target.value) }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Spesialisasi Jenis Barang</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSpecialties.map((specialty) => (
                      <Button
                        key={specialty}
                        type="button"
                        variant={collectorForm.specialties.includes(specialty) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className={collectorForm.specialties.includes(specialty) 
                          ? "bg-emerald-600 hover:bg-emerald-700" 
                          : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        }
                      >
                        {specialty}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan Profil'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
