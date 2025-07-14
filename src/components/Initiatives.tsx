import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Initiatives = () => {
  const threeRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      pointsRef.current?.children || [],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pointsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (threeRef.current) {
      threeRef.current.appendChild(renderer.domElement);
    }

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(stars);
    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current) {
        threeRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <div ref={threeRef} className="fixed inset-0 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Community Initiatives</h2>
        <div ref={pointsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl p-6 border border-accent/20 backdrop-blur-md bg-white/5 text-gray-300 text-lg hover:border-accent/40 transition-all duration-300">
            Global mentorship programs empowering future leaders.
          </div>
          <div className="glass-card rounded-2xl p-6 border border-accent/20 backdrop-blur-md bg-white/5 text-gray-300 text-lg hover:border-accent/40 transition-all duration-300">
            AI for Good hackathons driving social impact projects.
          </div>
          <div className="glass-card rounded-2xl p-6 border border-accent/20 backdrop-blur-md bg-white/5 text-gray-300 text-lg hover:border-accent/40 transition-all duration-300">
            Local meetups fostering real-world collaboration.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
