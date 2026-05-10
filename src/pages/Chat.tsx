import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, onSnapshot, orderBy, addDoc, serverTimestamp, doc, setDoc, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, MessageSquare, Search, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { storage } from '../lib/firebase';

export function Chat() {
  const { user, profile, isAdmin } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // For clients, their chat ID is their UID
  const chatId = isAdmin ? selectedChatId : user?.uid;

  useEffect(() => {
    if (!user) return;

    if (isAdmin) {
      // Admins see all chats
      const chatsRef = collection(db, 'chats');
      const q = query(chatsRef, orderBy('lastMessageAt', 'desc'));
      const unsub = onSnapshot(q, (snap) => {
        setChats(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });
      return () => unsub();
    } else {
      // Clients ensure their chat exists
      const chatRef = doc(db, 'chats', user.uid);
      setDoc(chatRef, {
        userId: user.uid,
        userName: user.displayName,
        lastMessageAt: serverTimestamp(),
      }, { merge: true });
    }
  }, [user, isAdmin]);

  useEffect(() => {
    if (!chatId) return;

    const msgsRef = collection(db, 'chats', chatId, 'messages');
    const q = query(msgsRef, orderBy('createdAt', 'asc'), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Max 5MB.");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `chats/${chatId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedFile) || !chatId || !user) return;

    const msgText = newMessage;
    const file = selectedFile;
    setNewMessage('');
    setSelectedFile(null);
    setPreviewUrl(null);

    setUploading(true);
    try {
      let imageUrl = null;
      if (file) {
        imageUrl = await uploadImage(file);
      }

      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        senderId: user.uid,
        senderName: user.displayName,
        text: msgText,
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
        isAdmin: isAdmin
      });

      await setDoc(doc(db, 'chats', chatId), {
        lastMessage: imageUrl ? 'Sent an image' : msgText,
        lastMessageAt: serverTimestamp(),
        userName: isAdmin ? chats.find(c => c.id === chatId)?.userName : user.displayName,
        userId: isAdmin ? chatId : user.uid
      }, { merge: true });

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-sm h-full overflow-hidden flex">
        
        {/* Sidebar for Admin */}
        {isAdmin && (
          <div className="w-80 border-r border-black/5 flex flex-col">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Active Chats</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20" size={16} />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full bg-black/5 border-none rounded-xl pl-10 pr-4 py-2 text-sm outline-none"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={cn(
                    "w-full p-6 text-left hover:bg-black/[0.02] transition-colors border-b border-black/5 flex items-center gap-4",
                    selectedChatId === chat.id && "bg-black/[0.03]"
                  )}
                >
                  <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center font-bold text-black/20">
                    {chat.userName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm uppercase truncate">{chat.userName}</h4>
                      <span className="text-[10px] font-mono text-black/20">
                        {chat.lastMessageAt?.toDate && format(chat.lastMessageAt.toDate(), 'HH:mm')}
                      </span>
                    </div>
                    <p className="text-xs text-black/40 truncate">{chat.lastMessage || 'No messages yet'}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black/[0.01]">
          {chatId ? (
            <>
              <div className="p-6 bg-white border-b border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-tight">
                      {isAdmin ? chats.find(c => c.id === chatId)?.userName : 'FabTech Support'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[80%]",
                      msg.senderId === user.uid ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-6 py-3 rounded-2xl text-sm leading-relaxed",
                        msg.senderId === user.uid
                          ? "bg-black text-white rounded-tr-none"
                          : "bg-white border border-black/5 text-black rounded-tl-none shadow-sm"
                      )}
                    >
                      {msg.imageUrl && (
                        <div className="mb-2 -mx-2 -mt-1">
                          <img 
                            src={msg.imageUrl} 
                            alt="Sent" 
                            className="max-w-full rounded-lg h-auto object-cover max-h-60"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-mono text-black/20 mt-1">
                      {msg.createdAt?.toDate && format(msg.createdAt.toDate(), 'HH:mm')}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 bg-white border-t border-black/5">
                {previewUrl && (
                  <div className="mb-4 relative inline-block">
                    <img src={previewUrl} alt="Preview" className="h-20 w-20 object-cover rounded-xl border border-black/10" />
                    <button 
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedFile(null);
                      }}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 shadow-lg"
                    >
                      <X size={12} />
                    </button>
                    {uploading && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl">
                        <Loader2 className="animate-spin text-black" size={20} />
                      </div>
                    )}
                  </div>
                )}
                <form onSubmit={sendMessage} className="flex gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-4 rounded-2xl bg-black/5 text-black/40 hover:bg-black/10 transition-colors"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={uploading ? "Sending image..." : "Type your message..."}
                    disabled={uploading}
                    className="flex-1 bg-black/5 border-none rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={uploading || (!newMessage.trim() && !selectedFile)}
                    className="bg-black text-white p-4 rounded-2xl hover:bg-black/80 transition-colors disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mb-6">
                <MessageSquare size={40} className="text-black/10" />
              </div>
              <h3 className="text-2xl font-bold uppercase text-black/20">Select a chat to start messaging</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
