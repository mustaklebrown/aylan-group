"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Formation', href: '/formation' },
  { name: 'Livraison', href: '/livraison' },
  { name: 'E-commerce', href: '/e-commerce' },
  { name: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* Main Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <nav className={`pointer-events-auto w-full max-w-6xl rounded-2xl md:rounded-full transition-all duration-500 ease-out border ${scrolled || isOpen ? 'bg-[#001A3B]/80 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] py-3 md:py-2' : 'bg-white/5 backdrop-blur-md border-white/10 shadow-lg py-4 md:py-2'}`}>
          <div className="px-4 md:px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link href="/" className="flex items-center group" onClick={() => setIsOpen(false)}>
                <Image 
                  src="/logo.png" 
                  alt="Aylan Group Logo" 
                  width={150} 
                  height={50} 
                  className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 shadow-inner">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white/80 hover:text-white font-medium hover:bg-white/10 px-5 py-2 rounded-full transition-all duration-300 text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions & Mobile Menu Toggle */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/espace-client" className="hidden sm:inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-medium transition-all duration-300 text-xs md:text-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md">
                Espace Client
              </Link>
              <Link href="/blog" className="hidden sm:inline-flex items-center justify-center bg-gradient-to-r from-[#3A94F5] to-[#225CA4] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full font-semibold transition-all duration-300 text-xs md:text-sm shadow-[0_4px_15px_rgba(58,148,245,0.4)] hover:shadow-[0_8px_25px_rgba(58,148,245,0.5)] hover:-translate-y-0.5 border border-white/10">
                Blog <ChevronRight size={16} className="ml-1" />
              </Link>
              
              {/* Mobile Toggle Button */}
              <button 
                className="lg:hidden text-white bg-white/5 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-[#001A3B]/95 backdrop-blur-xl lg:hidden flex flex-col pt-28 px-6 pb-8 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6 flex-grow overflow-y-auto">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-white border-b border-white/10 pb-4 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="flex flex-col gap-4 mt-8">
          <Link 
            href="/espace-client" 
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center bg-white/5 text-white border border-white/10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
          >
            Espace Client
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#3A94F5] to-[#225CA4] text-white py-4 rounded-xl font-bold text-lg shadow-lg">
            Blog
          </Link>
        </div>
      </div>
    </>
  );
}
