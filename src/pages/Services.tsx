import { motion } from 'motion/react';
import { Box, Settings, Check } from 'lucide-react';

const detailedServices = [
  {
    id: 'cad',
    title: 'Desain CAD 3D',
    icon: <Box size={24} />,
    description: 'Pemodelan 3D detail untuk komponen mesin, produk, dan alat industri',
    features: [
      'Desain komponen mesin custom',
      'Desain produk konsumen',
      'Desain alat industri dan fixture',
      'Assembly dan exploded view',
      'Analisis struktur dasar',
      'Render visualisasi produk'
    ],
    pricing: {
      label: 'Harga:',
      value: 'Mulai dari Rp 300.000',
      durationLabel: 'Durasi:',
      durationValue: '3-7 hari kerja',
      deliverablesLabel: 'Yang Anda Terima:',
      deliverables: [
        'File 3D (STEP, IGES, native format)',
        'Gambar render produk',
        'Assembly drawing'
      ]
    },
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80',
    iconBg: 'bg-[#1a2b56]'
  },
  {
    id: 'fab',
    title: 'Fabrikasi',
    icon: <Settings size={24} />,
    description: 'Pembuatan produk nyata dari desain hingga produk jadi',
    features: [
      'Fabrikasi mesin custom',
      'Prototype produk',
      'Alat bantu produksi (jig & fixture)',
      '3d printing',
      'Quality control',
      'Installation support'
    ],
    pricing: {
      label: 'Harga:',
      value: 'Mulai dari Rp 3.000.000',
      durationLabel: 'Durasi:',
      durationValue: '1-4 minggu',
      deliverablesLabel: 'Yang Anda Terima:',
      deliverables: [
        'Produk/mesin jadi',
        'Dokumentasi teknis',
        'Garansi & after-sales support'
      ]
    },
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80',
    iconBg: 'bg-[#1a2b56]'
  }
];

export function Services() {
  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-24">
          <h1 className="text-6xl font-bold tracking-tighter uppercase mb-8 text-[#1a2b56]">
            Layanan Kami
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            Solusi engineering komprehensif dari desain hingga fabrikasi
          </p>
        </div>

        <div className="space-y-32">
          {detailedServices.map((service, i) => (
            <div 
              key={service.id}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-start`}
            >
              {/* Content Side */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-6 mb-8">
                  <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold text-[#1a2b56]">{service.title}</h2>
                </div>

                <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-10">
                  <h3 className="text-lg font-bold text-[#1a2b56] mb-6">Fitur Layanan:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="text-green-500">
                          <Check size={18} strokeWidth={3} />
                        </div>
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="flex-1 w-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-[#1a2b56] flex items-center justify-center">
                    <div className="opacity-20 scale-[4]">
                      {service.icon}
                    </div>
                  </div>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
