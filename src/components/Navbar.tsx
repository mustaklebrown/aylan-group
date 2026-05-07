"use client";

import Link from 'next/link';
import { Menu, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      <nav className={`pointer-events-auto w-full max-w-6xl rounded-2xl md:rounded-full transition-all duration-500 ease-out border ${scrolled ? 'bg-[#001A3B]/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]  md:py-2' : 'bg-white/5 backdrop-blur-md border-white/10 shadow-lg py-4 md:py-2'}`}>
        <div className="px-4 md:px-6 flex items-center justify-between">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3A94F5] to-[#225CA4] flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(58,148,245,0.4)] group-hover:scale-105 transition-transform border border-white/20">
                A
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Aylan <span className="text-gradient-gold">Group</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 shadow-inner">
            {[
              { name: 'Formation', href: '/formation' },
              { name: 'Livraison', href: '/livraison' },
              { name: 'E-commerce', href: '/e-commerce' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white font-medium hover:bg-white/10 px-5 py-2 rounded-full transition-all duration-300 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/espace-client" className="hidden sm:inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-medium transition-all duration-300 text-xs md:text-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md">
              Espace Client
            </Link>
            <button className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-[#3A94F5] to-[#225CA4] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold transition-all duration-300 text-xs md:text-sm shadow-[0_4px_15px_rgba(58,148,245,0.4)] hover:shadow-[0_8px_25px_rgba(58,148,245,0.5)] hover:-translate-y-0.5 border border-white/10">
              Commander <ChevronRight size={16} className="ml-1" />
            </button>
            <button className="lg:hidden text-white bg-white/5 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
