import React, { useState } from 'react';

export default function MentorModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    role: 'Mentor & Industry Advisor',
    expertise: 'DeepTech & AI',
    experienceYears: '10+ Years',
    investmentInterest: 'Yes, Interested in Seed Syndicates'
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-deep/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-surface-card border border-hairline-light rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-graphite-deep text-canvas-light px-6 py-5 flex items-center justify-between border-b border-graphite-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-electric-glow">
              <span className="material-symbols-outlined text-[22px]">groups</span>
            </div>
            <div>
              <span className="font-label-caps text-xs text-electric-glow uppercase tracking-wider font-semibold">
                PIERC Stewardship Network
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-canvas-light">
                Join as Mentor or Angel Investor
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-graphite-surface hover:bg-graphite-border text-canvas-light flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">handshake</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold text-on-surface">
                Welcome to the PIERC Network!
              </h4>
              <p className="font-body-sm text-sm text-on-surface-variant max-w-sm mx-auto">
                Thank you, <strong>{formData.name}</strong>. Our Ecosystem Alliances team (Ajay Barot / Jay Sudani) will review your profile and connect regarding upcoming cohort pitch panels and portfolio advisory sessions.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Anand Mahindra"
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@organization.com"
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Primary Domain / Sector
                  </label>
                  <select
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="DeepTech & AI">DeepTech &amp; AI</option>
                    <option value="Healthcare & BioTech">Healthcare &amp; BioTech</option>
                    <option value="Hardware & Manufacturing">Hardware &amp; Manufacturing</option>
                    <option value="SaaS & Product Growth">SaaS &amp; Product Growth</option>
                    <option value="Venture Capital & Finance">Venture Capital &amp; Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Engagement Mode
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Mentor & Industry Advisor">Mentor &amp; Industry Advisor</option>
                    <option value="Angel Investor">Angel Investor / Syndicate LP</option>
                    <option value="Institutional VC Partner">Institutional VC Partner</option>
                    <option value="Corporate Sandbox Sponsor">Corporate Sandbox Sponsor</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all shadow-md"
                >
                  Join Network →
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
