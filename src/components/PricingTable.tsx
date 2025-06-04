
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "PEMULA",
    price: "Gratis",
    description: "Untuk pengepul yang baru memulai",
    features: [
      "8 jenis barang: Aki, Elektronik, Kaca, Kaleng, Kain, Minyak & Oli, Plastik, Styrofoam",
      "Berat: Ringan (0-10kg)",
      "Radius: Terbatas (0-2km)",
      "Notifikasi",
      "Transaksi & Riwayat",
      "Share ke Media Sosial"
    ],
    popular: false
  },
  {
    name: "AMATIR",
    price: "Rp 100.000",
    description: "Untuk pengepul dengan skala menengah",
    features: [
      "11 jenis barang: + Kardus, Kertas, Besi",
      "Berat: Sedang (0-100kg)",
      "Radius: Dekat (0-5km)",
      "Semua fitur Pemula",
      "Analisis & Statistik Transaksi"
    ],
    popular: false
  },
  {
    name: "ADVANCE",
    price: "Rp 150.000",
    description: "Untuk pengepul dengan jangkauan luas",
    features: [
      "13 jenis barang: + Kayu & Perabotan, Kuningan",
      "Berat: Berat (0-1000kg)",
      "Radius: Menengah (0-10km)",
      "Semua fitur Amatir",
      "Peta Interaktif"
    ],
    popular: true
  },
  {
    name: "PRO",
    price: "Rp 200.000",
    description: "Untuk pengepul profesional",
    features: [
      "15 jenis barang: + Aluminium, Tembaga",
      "Berat: Sangat Berat (0-10000kg)",
      "Radius: Jauh (0-20km)",
      "Semua fitur Advance",
      "Jadwal Pengambilan & Optimasi Rute"
    ],
    popular: false
  }
];

export const PricingTable = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiers.map((tier, index) => (
        <Card 
          key={index} 
          className={`relative border-2 transition-all hover:shadow-lg ${
            tier.popular 
              ? 'border-emerald-500 shadow-emerald-100' 
              : 'border-emerald-200'
          }`}
        >
          {tier.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500">
              Terpopuler
            </Badge>
          )}
          <CardHeader className="text-center">
            <CardTitle className="text-emerald-800">{tier.name}</CardTitle>
            <div className="text-3xl font-bold text-emerald-600">
              {tier.price}
              {tier.price !== "Gratis" && <span className="text-sm text-emerald-500">/bulan</span>}
            </div>
            <CardDescription className="text-emerald-600">
              {tier.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tier.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex items-start space-x-2">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-emerald-700">{feature}</span>
              </div>
            ))}
            <Button 
              className={`w-full mt-6 ${
                tier.popular 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
              }`}
              disabled={tier.price === "Gratis"}
            >
              {tier.price === "Gratis" ? "Gratis" : "Pilih Paket"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
