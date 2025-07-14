import React from 'react';
import { Mail, Twitter, Linkedin, Github, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Community: [
      'Join Now',
      'Member Directory',
      'Forums',
      'Events',
      'Success Stories'
    ],
    Resources: [
      'Research Papers',
      'Video Library',
      'Podcasts',
      'Case Studies',
      'Tools & APIs'
    ],
    Support: [
      'Help Center',
      'Contact Us',
      'Documentation',
      'Status Page',
      'Bug Reports'
    ],
    Company: [
      'About Us',
      'Careers',
      'Press Kit',
      'Privacy Policy',
      'Terms of Service'
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/WhatsApp Image 2025-04-25 at 00.10.59_2f46c5d0.jpg" 
                alt="HWAI Logo" 
                className="h-10 w-auto"
              />
              <span className="text-white font-bold text-xl">HWAI</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering humans to thrive in the AI era through collaboration, education, and ethical innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest insights on human-AI collaboration delivered to your inbox.</p>
            </div>
            <div className="flex gap-3">
              <input 
                type="email" 
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Email address for newsletter"
              />
              <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Humans Winning AI. All rights reserved. Built with ❤️ for the future of human-AI collaboration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;