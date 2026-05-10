import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Wrench, 
  Box, 
  FileText, 
  Factory, 
  CheckCircle2, 
  MessageSquare, 
  Lightbulb, 
  Cpu, 
  ChevronDown,
  Phone,
  User,
  Clock,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';
import { portfolioData } from '../data/portfolio';

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
            alt="Engineering Workshop" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1a2b56]/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tight mb-4"
          >
            FabTech
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-light tracking-widest uppercase mb-8 opacity-80"
          >
            Design & Fabrication
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-12 opacity-70 max-w-2xl mx-auto leading-relaxed"
          >
            Mengubah ide menjadi desain teknik yang presisi dan produk nyata.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/order"
              className="bg-brand-blue text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
            >
              Konsultasi Sekarang <ArrowRight size={20} />
            </Link>
            <Link
              to="/portfolio"
              className="bg-transparent border border-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              Lihat Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tentang FabTech */}
      <section id="tentang" className="py-24 bg-slate-50 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-[#1a2b56] rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-xl">
            <Wrench size={32} />
          </div>
          <h2 className="text-4xl font-bold text-[#1a2b56] mb-8">Tentang FabTech</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            FabTech menyediakan layanan desain CAD 3D dan fabrikasi pengembangan produk.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Kami mendukung proses dari desain konsep hingga manufaktur produk nyata dengan presisi dan standar engineering.
          </p>
        </div>
      </section>

      {/* Tim Engineering Kami */}
      <section id="tim" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <User size={32} />
            </div>
            <h2 className="text-4xl font-bold text-[#1a2b56] mb-4">Tim Engineering Kami</h2>
            <p className="text-slate-500">Profesional berpengalaman siap membantu proyek Anda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { name: 'Adam Nabil Khotir', role: 'Lead Engineer', sub: '2+ tahun di CAD Design' },
              { name: 'Hellen Keysha Sabrina', role: 'Technical Drawing', sub: 'Spesialis Gambar Teknik' },
              { name: 'R. Ariobhagaskara Yunus H', role: 'Fabrication Manager', sub: 'Expert Fabrikasi & Produksi' },
              { name: 'Saddat Ridlo Al-wasi', role: 'Marketing', sub: 'Business Development' },
              { name: 'Muhammad Zidane Saver', role: 'Fabrication Expert', sub: 'Expert Fabrikasi & Produksi' },
              { name: 'Aidan Syahreza Fitra W', role: 'Admin', sub: 'Project Administration' },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-all h-full flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-[#1a2b56] rounded-full flex items-center justify-center text-white mb-6">
                  <User size={32} />
                </div>
                <h3 className="font-bold text-[#1a2b56] text-sm uppercase mb-2 leading-tight min-h-[2.5rem] flex items-center justify-center">
                  {member.name}
                </h3>
                <p className="text-brand-blue font-bold text-[10px] uppercase tracking-widest mb-2">{member.role}</p>
                <p className="text-slate-400 text-[10px] leading-relaxed">{member.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Kami */}
      <section id="layanan" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a2b56] mb-4">Layanan Kami</h2>
          <p className="text-slate-500">Solusi engineering komprehensif dari desain hingga fabrikasi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              title: 'Desain CAD 3D', 
              icon: <Box size={32} />, 
              desc: 'Pemodelan 3D detail untuk komponen mesin, produk, dan alat industri.',
              features: ['Desain Komponen', 'Assembly Drawing', 'Rendering'],
              price: 'Rp 300.000'
            },
            { 
              title: 'Fabrikasi', 
              icon: <Settings size={32} />, 
              desc: 'Pembuatan produk nyata dari desain hingga produk jadi dengan standar presisi.',
              features: ['Mesin Custom', 'Prototype', 'Jig & Fixture'],
              price: 'Rp 3.000.000'
            },
          ].map((s, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -8 }}
              className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-16 h-16 bg-[#1a2b56] text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                {s.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1a2b56] mb-4">{s.title}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">{s.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {s.features.map(f => (
                  <span key={f} className="px-3 py-1 bg-slate-50 text-[#1a2b56] text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-widest">
                    {f}
                  </span>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center justify-end">
                <Link to="/services" className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-[#1a2b56] hover:bg-[#1a2b56] hover:text-white transition-all">
                  <ArrowRight size={20} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mengapa Memilih Kami */}
      <section className="py-24 bg-[#0a0f1e] text-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mengapa Memilih Kami</h2>
            <p className="text-white/40">Keunggulan dalam setiap aspek engineering dan fabrikasi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Desain engineering yang presisi',
              'Pemodelan CAD profesional',
              'Dari konsep hingga fabrikasi',
              'Konsultasi gratis',
              'Harga terjangkau'
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl flex items-center gap-4 border border-white/10">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur Kerja Kami */}
      <section id="alur" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a2b56] mb-4">Alur Kerja Kami</h2>
            <p className="text-slate-500">Pendekatan sistematis dari konsep hingga penyelesaian</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Konsultasi', icon: <MessageSquare />, desc: 'Diskusi kebutuhan proyek Anda' },
              { num: '2', title: 'Desain Konsep', icon: <Lightbulb />, desc: 'Konsep desain awal dan perencanaan' },
              { num: '3', title: 'Pemodelan CAD 3D', icon: <Box />, desc: 'Pemodelan 3D detail dan simulasi' },
              { num: '4', title: 'Gambar Teknik', icon: <FileText />, desc: 'Gambar engineering siap produksi' },
              { num: '5', title: 'Fabrikasi', icon: <Wrench />, desc: 'Manufaktur dan perakitan (opsional)' },
              { num: '6', title: 'Produk Jadi', icon: <Cpu />, desc: 'Pengecekan kualitas dan pengiriman' },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-xl relative shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#1a2b56] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.num}
                </div>
                <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a2b56] mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Kami */}
      <section id="portfolio" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1a2b56] mb-4">Portfolio Kami</h2>
          <p className="text-slate-500">Menampilkan proyek-proyek engineering dan fabrikasi terbaik kami untuk berbagai sektor industri.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.slice(0, 4).map((project, i) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 relative aspect-video md:aspect-auto overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest text-[#1a2b56]">
                    {project.category}
                  </div>
                </div>
                <div className="md:w-1/2 p-6 flex flex-col">
                  <div className="flex items-center gap-2 text-brand-blue mb-3">
                    <Clock size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{project.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2b56] mb-2 leading-tight">{project.title}</h3>
                  <p className="text-brand-blue font-bold text-xs mb-3">{project.price}</p>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <Link to="/portfolio" className="mt-auto text-brand-blue text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                    Detail Proyek <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a2b56] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg shadow-blue-500/10"
          >
            Lihat Semua Portfolio <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-white border-2 border-[#1a2b56] rounded-full flex items-center justify-center mx-auto mb-8 text-[#1a2b56]">
              <span className="text-3xl font-bold">?</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1a2b56] mb-4">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-slate-500">Temukan jawaban untuk pertanyaan umum tentang layanan kami</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Apa saja layanan yang ditawarkan FabTech?', a: 'Kami menawarkan desain CAD 3D, gambar teknik, dan fabrikasi mekanik.' },
              { q: 'Berapa lama waktu pengerjaan proyek?', a: 'Waktu pengerjaan bervariasi tergantung kompleksitas, biasanya antara 1-4 minggu.' },
              { q: 'Bagaimana cara memulai konsultasi?', a: 'Login terlebih dahulu menggunakan akun Google Anda, kemudian Anda bisa menekan tombol "Chat / Konsultasi Sekarang" di halaman utama atau menu navigasi kanan atas. Setelah itu, isi formulir detail proyek Anda (deskripsi, deadline, dan referensi), dan tim engineering kami akan meninjau serta memberikan penawaran harga (quote) dalam waktu 24 jam. Anda juga dapat memantau status proyek dan melakukan pembayaran melalui Dashboard Client.' },
              { q: 'Apakah FabTech bisa menangani proyek skala kecil?', a: 'Ya, kami melayani proyek dari skala individu hingga kebutuhan industri.' },
              { q: 'Software apa yang digunakan untuk desain?', a: 'Kami menggunakan software standar industri seperti SolidWorks, AutoCAD, dan Fusion 360.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-[#1a2b56]">{faq.q}</span>
                  <ChevronDown className={cn("transition-transform", openFaq === i && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-600 border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80" 
            alt="Engineering Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#1a2b56]/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Punya ide untuk mesin atau produk?</h2>
          <p className="text-xl mb-12 opacity-80">Kami membantu mendesain dan membuatnya.</p>
          <Link
            to="/order"
            className="inline-flex bg-brand-blue text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-blue-600 transition-all gap-2 items-center shadow-2xl"
          >
            Hubungi Kami <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
