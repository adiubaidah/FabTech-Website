import { Link } from 'react-router-dom';
import { Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontak" className="bg-[#0a0f1e] text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
              <span>FabTech</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Layanan desain engineering dan fabrikasi profesional untuk industri dan pengembangan produk.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/adamkhotiru/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/adamnabil-" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold mb-6">Layanan Kami</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/services" className="hover:text-white transition-colors">Desain CAD 3D</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Gambar Teknik</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Fabrikasi Mekanik</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><Link to="/#tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/#tim" className="hover:text-white transition-colors">Tim Kami</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/#alur" className="hover:text-white transition-colors">Alur Kerja</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Tagihan Pembayaran</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-brand-blue" />
                <span>Jl. Ploso I No.4, Rangkah, Kec. Tambaksari, Surabaya, Jawa Timur 60133</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-brand-blue" />
                <span>081231925683</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-brand-blue" />
                <span>adamnabil37337@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>© 2026 FabTech. Hak Cipta Dilindungi.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat Layanan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
