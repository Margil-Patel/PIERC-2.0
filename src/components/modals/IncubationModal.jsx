import React, { useState } from 'react';

export default function IncubationModal({ isOpen, onClose, initialProgram = 'nivesh' }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    program: initialProgram || 'nivesh',
    startupName: '',
    founderName: '',
    email: '',
    phone: '',
    sector: 'DeepTech',
    stage: 'Idea / Prototype',
    pitchSummary: '',
    fundingNeeded: '₹10L - ₹25L',
    hasPatent: 'No'
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

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-deep/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-surface-card border border-hairline-light rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-graphite-deep text-canvas-light px-6 py-5 flex items-center justify-between border-b border-graphite-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric-glow animate-pulse"></span>
              <span className="font-label-caps text-xs text-electric-glow uppercase tracking-wider font-semibold">
                PIERC Venture Application Portal
              </span>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-canvas-light mt-1">
              Apply for Incubation &amp; Acceleration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-graphite-surface hover:bg-graphite-border text-canvas-light flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h4 className="font-headline-md text-2xl font-bold text-on-surface">
                Application Submitted Successfully!
              </h4>
              <p className="font-body-sm text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.founderName || 'Founder'}</strong>. Your application for <strong>{formData.startupName || 'your venture'}</strong> under the <strong>{formData.program.toUpperCase()}</strong> track has been logged. Our Incubation Committee will review your application and reach out within 48 hours.
              </p>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-hairline-light max-w-md mx-auto font-label-code text-xs text-on-surface-variant text-left">
                <p><strong>Tracking ID:</strong> PIERC-2026-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p><strong>Sector:</strong> {formData.sector}</p>
                <p><strong>Funding Requirement:</strong> {formData.fundingNeeded}</p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between border-b border-hairline-light pb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step === 1 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                    1
                  </span>
                  <span className="text-xs font-semibold text-on-surface">Venture &amp; Program</span>
                </div>
                <div className="h-[1px] w-12 bg-hairline-light"></div>
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step === 2 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'}`}>
                    2
                  </span>
                  <span className="text-xs font-semibold text-on-surface">Founder &amp; Pitch</span>
                </div>
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                      Select Incubation Track
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="nivesh">Startup Nivesh 3.0 (Capital &amp; VC Syndication)</option>
                      <option value="healthtech">HealthTech Accelerator (Clinical Sandbox)</option>
                      <option value="growthpad">Startup Growthpad (Post-Revenue Scale)</option>
                      <option value="pre-incubation">Pre-Incubation &amp; Validation Sprint</option>
                      <option value="bootcamp">7-Day Startup Bootcamp</option>
                      <option value="fablab">FabLab Prototyping Resident</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Startup / Project Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="startupName"
                        value={formData.startupName}
                        onChange={handleChange}
                        placeholder="e.g. NeuroSync Technologies"
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Domain / Sector
                      </label>
                      <select
                        name="sector"
                        value={formData.sector}
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="DeepTech">DeepTech &amp; AI</option>
                        <option value="HealthTech">HealthTech &amp; BioTech</option>
                        <option value="IoT & Hardware">IoT, Robotics &amp; Hardware</option>
                        <option value="SaaS & Enterprise">SaaS &amp; Enterprise Software</option>
                        <option value="FinTech">FinTech &amp; Commerce</option>
                        <option value="AgriTech">AgriTech &amp; CleanTech</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Maturity Stage
                      </label>
                      <select
                        name="stage"
                        value={formData.stage}
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Idea / Concept">Idea / Concept Stage</option>
                        <option value="Proof of Concept">Proof of Concept (PoC)</option>
                        <option value="Working Prototype">Working Prototype / MVP</option>
                        <option value="Early Revenue">Early Revenue / Beta Users</option>
                        <option value="Scaling">Scaling / Seed Funded</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Target Funding Need
                      </label>
                      <select
                        name="fundingNeeded"
                        value={formData.fundingNeeded}
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Under ₹5L (Grant)">Under ₹5L (Seed Grant)</option>
                        <option value="₹5L - ₹25L">₹5L - ₹25L (SSIP / SISFS)</option>
                        <option value="₹25L - ₹1Cr">₹25L - ₹1Cr (Angel Round)</option>
                        <option value="₹1Cr - ₹5Cr">₹1Cr - ₹5Cr (Institutional VC)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.startupName.trim()) {
                          setStep(2);
                        } else {
                          alert('Please enter your Startup / Project Name');
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:bg-primary-container transition-all"
                    >
                      Next Step →
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Lead Founder Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="founderName"
                        value={formData.founderName}
                        onChange={handleChange}
                        placeholder="Dr. / Prof. / Mr. / Ms."
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="founder@company.com"
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Contact Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                        Parul University Affiliation?
                      </label>
                      <select
                        name="hasPatent"
                        value={formData.hasPatent}
                        onChange={handleChange}
                        className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Student">Current Student / Alumnus</option>
                        <option value="Faculty">Faculty Researcher / Staff</option>
                        <option value="External">External Founder / Startup</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1.5">
                      Venture Elevator Pitch (2-3 Sentences) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      name="pitchSummary"
                      value={formData.pitchSummary}
                      onChange={handleChange}
                      placeholder="What problem are you solving? What is your technological innovation or USP?"
                      className="w-full p-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition-all shadow-md"
                    >
                      Submit Application →
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
