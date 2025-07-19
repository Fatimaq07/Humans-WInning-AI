import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BookOpen, Download, Calendar, User, Search } from 'lucide-react';
import { gsap } from 'gsap';

const PublicationsPage = () => {
  const threeRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const publications = [
    {
      title: "The Future of Human-AI Collaboration",
      author: "Dr. Sarah Chen",
      date: "March 2024",
      type: "Research Paper",
      description: "A comprehensive study on the evolving relationship between humans and AI in the workplace.",
      downloads: "2.5K"
    },
    {
      title: "Ethical AI Implementation Guidelines",
      author: "HWAI Ethics Committee",
      date: "February 2024",
      type: "White Paper",
      description: "Best practices and frameworks for implementing AI systems with human values at the core.",
      downloads: "1.8K"
    },
    {
      title: "AI Readiness Assessment Framework",
      author: "Marcus Rodriguez",
      date: "January 2024",
      type: "Technical Report",
      description: "A detailed framework for evaluating organizational readiness for AI transformation.",
      downloads: "3.2K"
    }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesType = filterType === 'All' || pub.type === filterType;
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  useEffect(() => {
    // Three.js orbit-like points background
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (threeRef.current) {
      threeRef.current.appendChild(renderer.domElement);
    }

    const orbitGeometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 1200 + 400;
      const angle = Math.random() * 2 * Math.PI;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
    }
    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const orbitMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#a855f7'),
      size: 2,
      transparent: true,
      opacity: 0.7
    });

    const orbits = new THREE.Points(orbitGeometry, orbitMaterial);
    scene.add(orbits);
    camera.position.z = 1200;

    const animate = () => {
      requestAnimationFrame(animate);
      orbits.rotation.x += 0.0005;
      orbits.rotation.y += 0.0007;
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

  useEffect(() => {
    const cards = publicationsRef.current?.children || [];
    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );
  }, [filteredPublications]);

  return (
    <div
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundImage: "url('/freepik__the-style-is-candid-image-photography-with-natural__76252.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Three.js animation */}
      <div ref={threeRef} className="fixed inset-0 z-0"></div>

      {/* Content overlay without blur */}
      <div className="relative z-10 bg-black/50">
        <section className="pt-32 pb-12 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Research <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">Publications</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Access cutting-edge research, white papers, and technical reports on human-AI collaboration.
          </p>
        </section>

        {/* Filter and Search */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              {["All", "Research Paper", "White Paper", "Technical Report"].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-full font-semibold border transition-all duration-300
                    ${filterType === type
                      ? "bg-gradient-to-r from-accent to-purple-600 text-white border-none"
                      : "border-purple-600 text-gray-300 hover:bg-purple-600/20"}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex items-center bg-purple-900/30 border border-purple-600 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-300 mr-2" />
              <input
                type="text"
                placeholder="Search publications..."
                className="bg-transparent outline-none text-gray-300 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4">
            <div ref={publicationsRef} className="space-y-8">
              {filteredPublications.map((publication, index) => (
                <div
                  key={index}
                  className="rounded-3xl p-8 border border-accent/20 group hover:shadow-2xl hover:shadow-accent/25 transition-all duration-500 bg-black/80"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <BookOpen className="w-6 h-6 text-accent mr-3" />
                        <span className="bg-gradient-to-r from-accent to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {publication.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                        {publication.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{publication.description}</p>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {publication.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {publication.date}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {publication.downloads} downloads
                        </div>
                      </div>
                    </div>
                    <button className="mt-6 md:mt-0 md:ml-6 bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg hover:shadow-accent/25">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
              {filteredPublications.length === 0 && (
                <p className="text-center text-gray-400 mt-10">No publications found matching your criteria.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicationsPage;
