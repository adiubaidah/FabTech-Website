import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { cn } from '../lib/utils';
import { Menu, X, User, LogOut, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navbar() {
  const { user, profile, isAdmin } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Order', path: '/order' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a2b56]/90 backdrop-blur-md border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-[#1a2b56] rotate-45" />
              </div>
              <span>FABTECH</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white/60",
                  location.pathname === link.path ? "text-white" : "text-white/40"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-black/10">
                <Link to="/chat" className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
                  <MessageSquare size={20} />
                </Link>
                <Link to="/dashboard" className="p-2 hover:bg-black/5 rounded-full transition-colors">
                  <LayoutDashboard size={20} />
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-black/5 px-4 pt-2 pb-6 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-4 text-base font-medium rounded-lg transition-colors",
                  location.pathname === link.path ? "bg-black/5 text-black" : "text-black/40"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-black/5 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/chat"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-4 text-base font-medium text-black/40"
                  >
                    <MessageSquare size={20} /> Chat
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-4 text-base font-medium text-black/40"
                  >
                    <LayoutDashboard size={20} /> Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full text-left px-3 py-4 text-base font-medium text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { login(); setIsOpen(false); }}
                  className="w-full bg-black text-white px-3 py-4 rounded-lg text-base font-medium"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
