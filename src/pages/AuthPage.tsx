import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const spiralRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!spiralRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, spiralRef.current.clientWidth / spiralRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(spiralRef.current.clientWidth, spiralRef.current.clientHeight);
    spiralRef.current.appendChild(renderer.domElement);

    const particleCount = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = i * 0.15;
      const radius = 0.1 * i * 0.015;
      positions[i * 3] = radius * Math.cos(angle);
      positions[i * 3 + 1] = radius * Math.sin(angle);
      positions[i * 3 + 2] = Math.sin(i * 0.1) * 2;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.8 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.01; // Faster rotation
      points.rotation.y += 0.015;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      spiralRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log('Form submitted:', formData);
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'https://accounts.google.com/signin/v2/identifier';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left: Spiral background */}
      <div
        ref={spiralRef}
        style={{ flex: 1, position: 'relative' }}
      ></div>

      {/* Right: Form */}
      <div
        style={{
          flex: 1,
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #1e1e2f, #3b1e5a)',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          Humans <span style={{ color: '#a855f7' }}>Winning</span> AI
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          {isSignUp ? 'Join the revolution' : 'Welcome back, human'}
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setIsSignUp(true)}
            style={{
              flex: 1,
              padding: '0.7rem',
              background: isSignUp ? 'linear-gradient(to right, #00bcd4, #a855f7)' : 'transparent',
              color: 'white',
              border: '1px solid #a855f7',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsSignUp(false)}
            style={{
              flex: 1,
              padding: '0.7rem',
              background: !isSignUp ? 'linear-gradient(to right, #00bcd4, #a855f7)' : 'transparent',
              color: 'white',
              border: '1px solid #a855f7',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                required
                style={{ width: '100%', padding: '0.8rem 2.5rem', fontSize: '0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              style={{ width: '100%', padding: '0.8rem 2.5rem', fontSize: '0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              style={{ width: '100%', padding: '0.8rem 2.5rem', fontSize: '0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isSignUp && (
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', color: 'gray' }} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                required
                style={{ width: '100%', padding: '0.8rem 2.5rem', fontSize: '0.85rem', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: 'linear-gradient(to right, #00bcd4, #a855f7)',
              padding: '0.8rem',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.6rem',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight style={{ marginLeft: '0.5rem' }} />
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            style={{
              background: '#fff',
              color: '#333',
              padding: '0.7rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
