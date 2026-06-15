import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { Send, Upload, Info, CheckCircle2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function Order() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: 'Desain CAD 3D',
    description: '',
    deadline: '',
    shippingAddress: '',
    referenceUrl: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        clientUid: user.uid,
        clientName: user.displayName,
        clientEmail: user.email,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSubmitted(true);
      toast.success('Project request submitted successfully!');
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Info size={40} className="text-black/20" />
          </div>
          <h2 className="text-3xl font-bold uppercase mb-4">Authentication Required</h2>
          <p className="text-black/40 mb-12">Please sign in with your Google account to start a new project request.</p>
          <button
            onClick={login}
            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold uppercase mb-4">Request Received</h2>
          <p className="text-black/40 mb-8">Thank you! Our engineering team will review your project and get back to you with a quote within 24 hours.</p>
          <p className="text-sm text-black/20 font-mono">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter uppercase mb-8 text-[#1a2b56]">Mulai <br />Proyek</h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-12">
              Ceritakan kebutuhan engineering Anda. Semakin detail informasi yang Anda berikan, semakin akurat penawaran awal kami.
            </p>

            <div className="space-y-8">
              {[
                { title: 'Peninjauan', desc: 'Engineer kami menganalisis kebutuhan dan kelayakan proyek Anda.' },
                { title: 'Penawaran', desc: 'Kami memberikan rincian biaya dan estimasi waktu pengerjaan.' },
                { title: 'Eksekusi', desc: 'Setelah disetujui, kami memulai proses desain dan fabrikasi.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-2xl font-bold text-brand-blue font-mono">0{i + 1}</div>
                  <div>
                    <h3 className="font-bold uppercase mb-1 text-[#1a2b56]">{step.title}</h3>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Jenis Layanan</label>
                <select
                  required
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                >
                  <option>ENGINEERING DESIGN</option>
                  <option>ENGINEERING ANALYSIS </option>
                  <option>REVERSE ENGINEERING</option>
                  <option>FABRICATION & PROTOTYPING</option>
                  <option>ENGINEERING CONSULTATION</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Deskripsi Proyek</label>
                <textarea
                  required
                  placeholder="Jelaskan tujuan proyek, spesifikasi teknis, dan kendala yang ada..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Target Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">URL Referensi (Opsional)</label>
                  <input
                    type="url"
                    placeholder="Link ke proyek serupa atau file"
                    value={formData.referenceUrl}
                    onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Alamat Pengiriman (Untuk Fabrikasi)</label>
                <input
                  type="text"
                  placeholder="Ke mana produk akhir harus dikirim?"
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  {loading ? 'Mengirim...' : (
                    <>Kirim Permintaan <Send size={18} /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
