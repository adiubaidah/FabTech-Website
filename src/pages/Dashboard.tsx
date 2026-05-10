import { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Clock, CheckCircle2, AlertCircle, Package, ArrowRight, User, Mail, Calendar, CreditCard, X, Info } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const PAYMENT_INSTRUCTIONS = {
  bank: "Bank BRI",
  accountNumber: "632901025977537",
  accountName: "Adam Nabil",
  steps: [
    "Transfer sesuai nominal yang tertera ke rekening di atas",
    "Simpan bukti transfer Anda",
    "Kirim bukti transfer melalui menu Chat dengan menyertakan ID Pesanan",
    "Admin akan memverifikasi pembayaran Anda dalam 1x24 jam"
  ]
};

export function Dashboard() {
  const { user, profile, isAdmin } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, 'orders');
    const q = isAdmin 
      ? query(ordersRef, orderBy('createdAt', 'desc'))
      : query(ordersRef, where('clientUid', '==', user.uid), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, isAdmin]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const updateData: any = {
        status: newStatus,
        updatedAt: serverTimestamp()
      };

      if (newStatus === 'quoted' && priceInput) {
        updateData.price = priceInput;
      }

      await updateDoc(doc(db, 'orders', orderId), {
        ...updateData
      });
      toast.success(`Status updated to ${newStatus}`);
      setPriceInput("");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter uppercase mb-4">
              {isAdmin ? 'Admin' : 'Client'} <span className="text-black/20">Dashboard</span>
            </h1>
            <p className="text-black/40 font-medium">Welcome back, {profile?.displayName || user?.displayName}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white border border-black/5 px-6 py-3 rounded-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">{orders.length} Active Projects</span>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border border-black/5">
            <Package size={48} className="mx-auto text-black/10 mb-6" />
            <h3 className="text-2xl font-bold uppercase text-black/20 mb-4">No projects yet</h3>
            <p className="text-black/40 max-w-sm mx-auto mb-8">Start your first engineering project with us today.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <motion.div
                layout
                key={order.id}
                className="bg-white rounded-[2rem] p-8 border border-black/5 hover:border-black/10 transition-all flex flex-col lg:flex-row gap-8 items-start lg:items-center"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className={cn(
                      "px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      order.status === 'pending' && "bg-orange-100 text-orange-600",
                      order.status === 'reviewing' && "bg-purple-100 text-purple-600",
                      order.status === 'quoted' && "bg-blue-100 text-blue-600",
                      order.status === 'payment_pending' && "bg-yellow-100 text-yellow-600",
                      order.status === 'in_progress' && "bg-indigo-100 text-indigo-600",
                      order.status === 'completed' && "bg-green-100 text-green-600",
                      order.status === 'cancelled' && "bg-red-100 text-red-600",
                    )}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-bold text-black/20 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} /> {order.createdAt?.toDate ? format(order.createdAt.toDate(), 'MMM dd, yyyy') : 'Just now'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold uppercase mb-2">{order.serviceType}</h3>
                  <p className="text-black/40 text-sm line-clamp-2 mb-4">{order.description}</p>
                  
                  {isAdmin && (
                    <div className="flex flex-wrap gap-4 text-xs font-medium text-black/60 border-t border-black/5 pt-4">
                      <div className="flex items-center gap-1"><User size={14} /> {order.clientName}</div>
                      <div className="flex items-center gap-1"><Mail size={14} /> {order.clientEmail}</div>
                      {order.deadline && <div className="flex items-center gap-1"><Calendar size={14} /> {order.deadline}</div>}
                      {order.price && <div className="flex items-center gap-1 text-brand-blue font-bold"><CreditCard size={14} /> Rp {Number(order.price).toLocaleString()}</div>}
                    </div>
                  )}

                  {!isAdmin && order.status === 'quoted' && (
                    <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tagihan Pembayaran</p>
                        <p className="text-2xl font-bold text-[#1a2b56]">Rp {Number(order.price).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowPaymentModal(true);
                        }}
                        className="bg-[#1a2b56] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-blue transition-all shadow-lg shadow-blue-500/20"
                      >
                        Bayar Sekarang
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  {isAdmin ? (
                    <div className="flex flex-col gap-2">
                      {order.status === 'reviewing' && (
                        <input 
                          type="number" 
                          placeholder="Masukkan Harga (Rp)"
                          value={priceInput}
                          onChange={(e) => setPriceInput(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-brand-blue"
                        />
                      )}
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-black/5 border-none rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="quoted">Quoted</option>
                        <option value="payment_pending">Payment Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowPaymentModal(true);
                      }}
                      className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors flex items-center gap-2"
                    >
                      Project Details <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Payment & Details Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1a2b56] uppercase tracking-tighter">Detail Pesanan</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Layanan</p>
                  <p className="font-bold text-[#1a2b56]">{selectedOrder.serviceType}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</p>
                  <p className="font-bold text-brand-blue uppercase text-xs">{selectedOrder.status.replace('_', ' ')}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi</p>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedOrder.description}</p>
              </div>

              {selectedOrder.status === 'quoted' && (
                <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#1a2b56] text-white rounded-xl flex items-center justify-center">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a2b56]">Instruksi Pembayaran</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Total: Rp {Number(selectedOrder.price).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bank</p>
                      <p className="font-bold text-[#1a2b56]">{PAYMENT_INSTRUCTIONS.bank}</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-blue-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nomor Rekening</p>
                      <p className="font-bold text-[#1a2b56]">{PAYMENT_INSTRUCTIONS.accountNumber}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Langkah Konfirmasi:</p>
                    {PAYMENT_INSTRUCTIONS.steps.map((step, i) => (
                      <div key={i} className="flex gap-3 items-start text-sm text-slate-600">
                        <div className="w-5 h-5 bg-white border border-blue-100 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold text-brand-blue">
                          {i + 1}
                        </div>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="px-8 py-3 bg-[#1a2b56] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-blue transition-all"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
