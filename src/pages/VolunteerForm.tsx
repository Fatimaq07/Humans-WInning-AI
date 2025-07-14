import React, { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { X, ArrowRight } from 'lucide-react';

type SkillOption = {
  value: string;
  label: string;
};

const techOptions: SkillOption[] = [
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'Python', label: 'Python' },
  { value: 'AI/ML', label: 'AI/ML' },
  { value: 'UI/UX', label: 'UI/UX' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Content Writing', label: 'Content Writing' },
  { value: 'Community Management', label: 'Community Management' },
];

interface Props {
  onClose: () => void;
}

const VolunteerForm: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    bio: '',
    contribution: '',
  });

  const [skills, setSkills] = useState<MultiValue<SkillOption>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, skills });
    alert('Thank you for volunteering!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center px-4 py-10 z-50">
      <form
        onSubmit={handleSubmit}
        className="relative glass-card max-w-3xl w-full p-10 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 to-purple-600/10 overflow-y-auto max-h-full"
      >
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Join as a Volunteer</h2>
        <div className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            rows={3}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <div>
            <label className="text-gray-300 mb-2 block">Skill Set</label>
            <Select
              options={techOptions}
              isMulti
              onChange={setSkills}
              placeholder="Select your skills"
              className="text-black"
              classNamePrefix="select"
            />
          </div>
          <textarea
            name="contribution"
            placeholder="What can you contribute to HWAI?"
            rows={4}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-accent to-purple-600 text-white px-6 py-3 rounded-full w-full font-semibold hover:from-purple-600 hover:to-accent transition-all duration-300 transform hover:scale-105 flex justify-center items-center shadow-lg hover:shadow-accent/25"
        >
          Submit
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
