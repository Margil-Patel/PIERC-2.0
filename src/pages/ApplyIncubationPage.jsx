import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function ApplyIncubationPage() {
  const [searchParams] = useSearchParams();
  const initialProgram = searchParams.get('program') || 'nivesh';

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  const [formData, setFormData] = useState({
    program: initialProgram,
    startupName: '',
    sector: 'DeepTech & AI',
    stage: 'Working Prototype / MVP',
    fundingNeeded: '₹5L - ₹25L (SSIP / SISFS)',
    hasPatent: 'Filed / Under Process',
    founderName: '',
    email: '',
    phone: '',
    affiliation: 'Student',
    teamSize: '2-5 Co-founders',
    pitchSummary: '',
    deckLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomId = `PIERC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setTrackingId(randomId);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-white text-slate-900 flex flex-col min-h-screen">
      {/* =========================================
          HERO BANNER (LIGHT PINK THEME)
      ========================================= */}
      <section className="relative bg-gradient-to-br from-[#fff0f4] via-[#fce7f0] to-[#fbcfe8]/40 text-slate-900 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-pink-200/80">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 text-rose-700 text-xs font-semibold uppercase tracking-wider border border-pink-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            PIERC Cohort 2026 • Incubation Portal
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700">Incubation &amp; Acceleration</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 max-w-3xl leading-relaxed">
            Transform your innovation into a venture-scaled startup. Benefit from 0% equity dilution, seed grants up to ₹25 Lakhs, 24/7 MIT FabLab prototyping access, and 150+ global mentors.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-pink-200/60 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span> 0% Equity Dilution
            </span>
            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-pink-200/60 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span> DST &amp; BIRAC Supported
            </span>
            <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-pink-200/60 shadow-xs">
              <span className="text-emerald-600 font-bold">✓</span> 48-Hour Review Response
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          APPLICATION FORM & SIDEBAR (FRONT PAGE LIGHT THEME)
      ========================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 flex-1 border-b border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* MAIN FORM CARD (COL 8) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">

            {submitted ? (
              /* SUCCESS VIEW */
              <div className="space-y-8 text-center py-8 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-4xl shadow-md">
                  ✓
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                    Submission Confirmation
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    Application Submitted Successfully!
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong>{formData.founderName || 'Founder'}</strong>. Your application for <strong>{formData.startupName || 'your venture'}</strong> has been registered with the PIERC Selection Board.
                  </p>
                </div>

                {/* TRACKING CARD */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-3 font-mono text-xs text-slate-700">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Tracking Reference:</span>
                    <span className="text-rose-600 font-bold text-sm">{trackingId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Incubation Track:</span>
                    <span className="text-slate-900 font-semibold">{formData.program.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Sector:</span>
                    <span className="text-slate-900">{formData.sector}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Funding Requirement:</span>
                    <span className="text-emerald-600 font-bold">{formData.fundingNeeded}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-xs max-w-md mx-auto">
                  💡 A confirmation copy has been sent to <strong>{formData.email || 'your email'}</strong>. Our evaluation panel will reach out within 2 business days.
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all border border-slate-300"
                  >
                    Submit Another Application
                  </button>

                  <Link
                    to="/"
                    className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-lg"
                  >
                    Back to Home →
                  </Link>
                </div>
              </div>
            ) : (
              /* FORM STEPS */
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* STEP PROGRESS BAR */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                      step === 1 ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
                    }`}>
                      1
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 1</div>
                      <div className="text-sm font-bold text-slate-900">Venture &amp; Program Profile</div>
                    </div>
                  </div>

                  <div className="hidden sm:block h-[1px] w-16 bg-slate-200" />

                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                      step === 2 ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
                    }`}>
                      2
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Step 2</div>
                      <div className="text-sm font-bold text-slate-900">Founder &amp; Pitch Specs</div>
                    </div>
                  </div>
                </div>

                {/* STEP 1: VENTURE PROFILE */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Incubation Track Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-rose-600">
                        Select Preferred Incubation Track *
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className="w-full py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                      >
                        <option value="nivesh">Startup Nivesh 3.0 (Seed Capital &amp; VC Syndication)</option>
                        <option value="healthtech">HealthTech Accelerator (Clinical Trial Sandbox &amp; BioNEST)</option>
                        <option value="growthpad">Growthpad Accelerator (Post-Revenue Scaling &amp; Debt)</option>
                        <option value="pre-incubation">Pre-Incubation Track (Idea Validation &amp; PoC Grant)</option>
                        <option value="fablab">FabLab Hardware Resident (24/7 Prototype Lab Access)</option>
                        <option value="bootcamp">7-Day Startup Bootcamp Sprint</option>
                      </select>
                    </div>

                    {/* Startup Name & Sector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Startup / Venture Name *
                        </label>
                        <input
                          required
                          type="text"
                          name="startupName"
                          value={formData.startupName}
                          onChange={handleChange}
                          placeholder="e.g. NeuroAura Technologies"
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Domain / Technology Sector *
                        </label>
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleChange}
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        >
                          <option value="DeepTech & AI">DeepTech, AI &amp; Quantum</option>
                          <option value="HealthTech & BioTech">HealthTech &amp; BioTech</option>
                          <option value="IoT, Robotics & Hardware">IoT, Robotics &amp; Hardware</option>
                          <option value="Defence & Aerospace">Defence &amp; Aerospace Tech</option>
                          <option value="SaaS & Enterprise">SaaS &amp; Enterprise Software</option>
                          <option value="CleanTech & AgriTech">CleanTech, Energy &amp; AgriTech</option>
                          <option value="FinTech & Commerce">FinTech &amp; E-Commerce</option>
                        </select>
                      </div>
                    </div>

                    {/* Maturity Stage & Funding Needed */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Current Maturity Stage *
                        </label>
                        <select
                          name="stage"
                          value={formData.stage}
                          onChange={handleChange}
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        >
                          <option value="Idea / Concept">Idea / Concept Phase</option>
                          <option value="Proof of Concept">Proof of Concept (PoC / Lab Scale)</option>
                          <option value="Working Prototype / MVP">Working Prototype / MVP (TRL 4-6)</option>
                          <option value="Early Revenue / Pilot">Early Revenue / Active Beta Pilot</option>
                          <option value="Scaling / Seed Funded">Scaling / Previously Seed Funded</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Target Funding Requirement *
                        </label>
                        <select
                          name="fundingNeeded"
                          value={formData.fundingNeeded}
                          onChange={handleChange}
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        >
                          <option value="Under ₹5L (Grant)">Under ₹5L (Student PoC Grant)</option>
                          <option value="₹5L - ₹25L (SSIP / SISFS)">₹5L - ₹25L (SSIP 2.0 / SISFS Seed Grant)</option>
                          <option value="₹25L - ₹1Cr (Angel Round)">₹25L - ₹1Cr (Angel Investor Round)</option>
                          <option value="₹1Cr - ₹5Cr (Institutional VC)">₹1Cr - ₹5Cr (Institutional VC Series A)</option>
                        </select>
                      </div>
                    </div>

                    {/* Patent Status */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Intellectual Property / Patent Status
                      </label>
                      <select
                        name="hasPatent"
                        value={formData.hasPatent}
                        onChange={handleChange}
                        className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                      >
                        <option value="Filed / Under Process">Patent Filed / Provisional Granted</option>
                        <option value="Granted Patent">Patent Granted / Commercialized</option>
                        <option value="Trade Secret / Copyright">Trade Secret / Software Copyright Registered</option>
                        <option value="No IP Yet">No IP / Planning to File via PIERC Cell</option>
                      </select>
                    </div>

                    {/* NEXT BUTTON */}
                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (formData.startupName.trim()) {
                            setStep(2);
                            window.scrollTo({ top: 250, behavior: 'smooth' });
                          } else {
                            alert('Please enter your Startup / Venture Name');
                          }
                        }}
                        className="px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-all shadow-lg hover:shadow-rose-600/20 flex items-center gap-2"
                      >
                        Continue to Step 2 →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: FOUNDER & PITCH */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    {/* Lead Founder Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Lead Founder Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          name="founderName"
                          value={formData.founderName}
                          onChange={handleChange}
                          placeholder="e.g. Dr. Aravind Sharma"
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="founder@venture.io"
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone & Affiliation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Contact Phone / WhatsApp *
                        </label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Parul University Affiliation
                        </label>
                        <select
                          name="affiliation"
                          value={formData.affiliation}
                          onChange={handleChange}
                          className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                        >
                          <option value="Student">Current PU Student / Scholar</option>
                          <option value="Alumnus">PU Alumnus</option>
                          <option value="Faculty">PU Faculty Researcher / Staff</option>
                          <option value="External">External Founder / External Startup</option>
                        </select>
                      </div>
                    </div>

                    {/* Pitch Elevator Summary */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Elevator Pitch &amp; Core Technical USP *
                      </label>
                      <textarea
                        required
                        rows={4}
                        name="pitchSummary"
                        value={formData.pitchSummary}
                        onChange={handleChange}
                        placeholder="Detail the core problem you are solving, your technological innovation, current validation, and how PIERC incubation will accelerate your growth..."
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Deck Link */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Pitch Deck / Video Demo Link (Google Drive / Dropbox / Notion)
                      </label>
                      <input
                        type="url"
                        name="deckLink"
                        value={formData.deckLink}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/file/d/..."
                        className="w-full py-3 px-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                      />
                    </div>

                    {/* FORM ACTION BUTTONS */}
                    <div className="pt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all border border-slate-300"
                      >
                        ← Back to Step 1
                      </button>

                      <button
                        type="submit"
                        className="px-9 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm transition-all shadow-lg hover:shadow-rose-600/20"
                      >
                        Submit Incubation Proposal →
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* RIGHT SIDEBAR (COL 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* INCUBATION PERKS CARD */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h3 className="text-base font-extrabold text-slate-900">Incubation Ecosystem Perks</h3>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-sm shrink-0">💰</span>
                  <span><strong>Up to ₹25 Lakhs Seed Grants</strong> via SSIP 2.0 &amp; NIDHI-PRAYAS.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-sm shrink-0">⚙️</span>
                  <span><strong>24/7 MIT FabLab Access</strong> with 3D printers, CNC mills &amp; laser cutters.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-sm shrink-0">🏛️</span>
                  <span><strong>Sec 8 Non-Profit Support</strong> with 0% equity dilution for early grants.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-sm shrink-0">🧠</span>
                  <span><strong>150+ Global Mentors</strong> from top IITs, IISc, VCs &amp; IP Attorneys.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-sm shrink-0">☁️</span>
                  <span><strong>$100,000+ Cloud Credits</strong> from AWS, Google Cloud &amp; Azure.</span>
                </li>
              </ul>
            </div>

            {/* SELECTION TIMELINE */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm font-mono text-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-rose-600">
                Selection Roadmap
              </h3>

              <div className="space-y-4 border-l-2 border-slate-200 pl-4">
                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <div className="font-bold text-slate-900">48 Hours</div>
                  <div className="text-slate-500">Desk Review &amp; Eligibility Check</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <div className="font-bold text-slate-900">Day 7</div>
                  <div className="text-slate-500">Technical Pitch to Screening Panel</div>
                </div>

                <div className="relative">
                  <span className="absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <div className="font-bold text-slate-900">Day 14</div>
                  <div className="text-slate-500">Grant Approval &amp; Office Onboarding</div>
                </div>
              </div>
            </div>

            {/* CONTACT HELPDESK */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3 text-xs">
              <div className="font-bold text-white text-sm">Need Help With Application?</div>
              <p className="text-slate-300 leading-relaxed">
                Contact our Incubation Secretariat for pitch guidance or eligibility queries:
              </p>
              <div className="space-y-1 font-mono text-slate-200 pt-1">
                <div>📞 Call: <a href="tel:02668260350" className="text-rose-400 hover:underline">0266-8260350</a></div>
                <div>✉️ Email: <a href="mailto:pierc@paruluniversity.ac.in" className="text-rose-400 hover:underline">pierc@paruluniversity.ac.in</a></div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
