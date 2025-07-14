import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typewriter } from "react-simple-typewriter";
import { Fade, Slide, Flip } from "react-awesome-reveal";
import { CheckCircle } from "lucide-react";
import type { Engine } from "tsparticles-engine";

const particlesInit = async (main: Engine): Promise<void> => {
  await loadFull(main);
};

const AboutPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 w-full h-full"
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 60 },
            color: { value: ["#ffffff", "#9b5de5", "#6a00f4"] },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 5 } },
            move: { enable: true, speed: 1.5 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Page Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-10">
        {/* Who We Are */}
        <div id="about" className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <Slide direction="left" triggerOnce>
            <div>
              <h1 className="text-5xl font-extrabold text-purple-400 mb-6">
                <Typewriter
                  words={["Who We Are?"]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                We are a futuristic team of innovators, thinkers, and dreamers dedicated to empowering humanity through artificial intelligence.
                <br /><br />
                Our focus is on blending advanced AI technology with human creativity to create solutions that are not only powerful but also ethical and inclusive.
                <br /><br />
                From transforming industries to uplifting communities, our mission is to shape a future where AI enhances every aspect of life — making it smarter, more efficient, and more inspiring.
              </p>
            </div>
          </Slide>
          <Fade triggerOnce>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1581091012184-7a2508f52a7b"
                alt="AI Team"
                className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700 border-4 border-purple-500"
              />
              <div className="absolute inset-0 rounded-3xl bg-purple-500 opacity-10 group-hover:opacity-20 transition-opacity duration-700 blur-2xl"></div>
            </div>
          </Fade>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <Fade cascade damping={0.1} triggerOnce>
            <div>
              <h2 className="text-4xl font-bold text-purple-400 mb-6">Our Mission</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="text-purple-500 w-6 h-6 mr-2" />
                  Empower individuals and organizations globally.
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-purple-500 w-6 h-6 mr-2" />
                  Foster innovation and creativity through AI.
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-purple-500 w-6 h-6 mr-2" />
                  Build a sustainable, inclusive future.
                </li>
              </ul>

              <h2 className="text-4xl font-bold text-purple-400 mt-12 mb-6">Our Vision</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="text-purple-500 w-6 h-6 mr-2" />
                  Create a world where AI and humans coexist in harmony.
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-purple-500 w-6 h-6 mr-2" />
                  Enable everyone to harness AI for positive change.
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-purple-500 w-6 h-6 mr-2" />
                  Inspire next generations to dream beyond limits.
                </li>
              </ul>
            </div>
          </Fade>
          <Slide direction="right" triggerOnce>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1611078489929-0a7f1cb8fb11"
                alt="Vision"
                className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-700 border-4 border-purple-500"
              />
              <div className="absolute inset-0 rounded-3xl bg-purple-500 opacity-10 group-hover:opacity-20 transition-opacity duration-700 blur-2xl"></div>
            </div>
          </Slide>
        </div>

        {/* Where We Are Active */}
        <div className="text-center mb-20">
          <Flip triggerOnce>
            <h2 className="text-4xl font-bold text-purple-400 mb-6">Where We Are Active</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-10">
              Our footprint spans across Asia, Europe, North America, and beyond. We partner with universities, startups, enterprises, and governments to empower communities and drive impactful AI solutions worldwide.
            </p>
            <div className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden border-4 border-purple-500 shadow-2xl mb-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31509.325154417123!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808d1993ea99%3A0x0!2zMzfCsDQ2JzMwLjYiTiAxMjLCsDI1JzA3LjkiVw!5e0!3m2!1sen!2sin!4v1621929637637!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Flip>
        </div>

        {/* Motive / Tagline */}
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Our Motive</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto text-center">
            We believe that when technology and humanity come together, they can achieve unimaginable milestones. We are here to lead that movement, build a responsible future, and make AI accessible, ethical, and inspiring for everyone.
          </p>
        </Fade>
      </div>
    </div>
  );
};

export default AboutPage;
