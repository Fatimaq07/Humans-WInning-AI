import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Stories', href: '/stories' },
    { name: 'Features', href: '/features' },
    { name: 'Publications', href: '/publications' },
    { name: 'Forums', href: '/forums' },
    { name: 'Volunteer Corner', href: '/volunteer' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-2xl border-b border-accent/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/WhatsApp Image 2025-04-25 at 00.10.59_2f46c5d0.jpg"
                alt="HWAI"
                className="h-12 w-auto"
              />
              <span className="text-white font-bold text-2xl tracking-tight bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                HWAI
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 relative">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
                  isActive(item.href)
                    ? 'text-white bg-accent/20 shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* 🔥 Join Community Button with Hand Animation */}
            <Link
              to="/auth"
              className="ml-6 bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 font-medium shadow-lg hover:shadow-accent/25 relative overflow-hidden"
              onClick={() => {
                const hand = document.getElementById("handPointer");
                if (hand) {
                  hand.style.opacity = "1";
                  hand.style.transform = "translateX(0)";
                  setTimeout(() => {
                    hand.style.transform = "translateX(0) scale(0.9)";
                    setTimeout(() => {
                      hand.style.transform = "translateX(0) scale(1)";
                      setTimeout(() => {
                        hand.style.opacity = "0";
                        hand.style.transform = "translateX(200%)";
                      }, 500);
                    }, 200);
                  }, 700);
                }
              }}
            >
              Join Community

              <img
                id="handPointer"
                src="/d7e88eaa52232561fc59c10449ce142f.png"
                alt="Hand Pointer"
                className="absolute top-0 right-0 w-12 pointer-events-none"
                style={{
                  opacity: 0,
                  transform: "translateX(200%)",
                  transition: "transform 0.8s ease, opacity 0.5s ease"
                }}
              />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-3"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-6 bg-primary/95 backdrop-blur-md rounded-2xl border border-accent/20 shadow-2xl">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-all duration-300 font-medium py-3 px-4 rounded-lg ${
                    isActive(item.href)
                      ? 'text-white bg-accent/20 shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/auth"
                className="ml-6 bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-accent transition-all duration-300 w-full text-center font-medium shadow-lg hover:shadow-accent/25"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Community
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
