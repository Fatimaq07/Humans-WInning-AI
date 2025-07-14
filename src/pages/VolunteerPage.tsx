import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import VolunteerForm from './VolunteerForm';

const VolunteerSection: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-black to-primary flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Three.js Animation Placeholder */}
      <div className="absolute inset-0 -z-10">
        {/* Add your Three.js component here */}
        {/* Example: <ThreeBackground /> */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-accent to-purple-600 blur-3xl"></div>
      </div>

      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Volunteer Corner – Become a Story Ambassador or Event Coordinator!
        </h1>
        <p className="text-gray-300 mb-8 leading-relaxed">
          ✨ HWAI is looking for dedicated volunteers to help us spread the mission of celebrating human perseverance and achievements. If you're passionate about community building and have a few hours to contribute, join us!
        </p>
        <h2 className="text-2xl font-semibold text-white mb-4">Why volunteer with HWAI?</h2>
        <ul className="text-gray-300 mb-8 text-left space-y-2">
          <li>○ Amplify the voices of real unsung heroes</li>
          <li>○ Support a positive, inspiring message India needs</li>
          <li>○ Network with like-minded changemakers</li>
          <li>○ Build skills in storytelling, event management, or outreach</li>
        </ul>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-accent to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto shadow-lg hover:shadow-accent/25"
        >
          Volunteer With Us
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>

      {showForm && <VolunteerForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default VolunteerSection;
