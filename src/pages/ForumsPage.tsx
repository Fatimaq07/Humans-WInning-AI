import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() / 2) * 0.1;
      meshRef.current.rotation.y = clock.getElapsedTime() / 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.5, 100, 16]} />
      <meshStandardMaterial color={'#a855f7'} wireframe />
    </mesh>
  );
};

const ForumsPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const discordRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const meetupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current?.children || [],
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    const sections = [
      { ref: discordRef, direction: 'left' },
      { ref: whatsappRef, direction: 'right' },
      { ref: meetupsRef, direction: 'left' },
    ];

    sections.forEach(({ ref, direction }) => {
      gsap.fromTo(ref.current,
        { opacity: 0, x: direction === 'left' ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen text-white bg-black overflow-hidden">
      {/* Three.js Canvas */}
      <Canvas
        className="fixed top-0 left-0 w-full h-full"
        style={{ zIndex: -1 }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedBackground />
      </Canvas>

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center">
        <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Community <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Forums</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join, connect, and collaborate with millions across the globe through our exclusive communities.
          </p>
        </div>
      </section>

      {/* Discord Section */}
      <section ref={discordRef} className="py-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center bg-black/70 border border-purple-700 shadow-2xl rounded-3xl p-10 transition-transform duration-500 hover:scale-105">
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold mb-4">💬 Join our Discord Server</h2>
            <p className="text-gray-300 mb-6">
              Be part of vibrant discussions, live voice channels, and exclusive community events.
            </p>
            <a
              href="https://discord.gg/z5FUGp6NAY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
            >
              Join Discord
            </a>
          </div>
          <MessageCircle className="w-24 h-24 text-purple-400 hidden md:block ml-8" />
        </div>
      </section>

      {/* WhatsApp Section */}
      <section ref={whatsappRef} className="py-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center bg-black/70 border border-purple-700 shadow-2xl rounded-3xl p-10 transition-transform duration-500 hover:scale-105">
          <div className="flex-1 text-right">
            <h2 className="text-3xl font-bold mb-4">📱 Join our WhatsApp Community</h2>
            <p className="text-gray-300 mb-6">
              Connect instantly, share ideas, and stay updated in real-time with our global members.
            </p>
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-purple-500 to-green-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
            >
              Join WhatsApp
            </a>
          </div>
          <MessageCircle className="w-24 h-24 text-green-400 hidden md:block mr-8" />
        </div>
      </section>

      {/* Meetups Section */}
      <section ref={meetupsRef} className="py-20">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center bg-black/70 border border-purple-700 shadow-2xl rounded-3xl p-10 transition-transform duration-500 hover:scale-105">
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold mb-4">🤝 Join Global Meetups</h2>
            <p className="text-gray-300 mb-6">
              Attend physical and virtual meetups worldwide, make friends, and build lasting networks.
            </p>
            <a
              href="#"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
            >
              Explore Meetups
            </a>
          </div>
          <MessageCircle className="w-24 h-24 text-pink-400 hidden md:block ml-8" />
        </div>
      </section>
    </div>
  );
};

export default ForumsPage;
