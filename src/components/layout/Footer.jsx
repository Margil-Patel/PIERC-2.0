import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onOpenIncubationModal, onOpenMentorModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-graphite-deep text-canvas-light transition-colors border-t border-graphite-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-graphite-border/60">
          
          {/* Main Info Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
                  <img
                    alt="PIERC Official Brand Mark"
                    className="h-7 w-auto object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1UbvtsGiSYqRYgryRgeI3-qIBfqxqSA2VQCauLRbtoKc2aZdFtjJbMq8Rb9Sn-4dlWB8kn_iACGfUPukOQpyEoVCBuJK0y_B5rLKlDHjdDlZ0hafmM5A-vFXiBTK-40HHWDk1xqaiC1w0CW-XKOIuxylkaWxcTpAY8ZMzLiv6Jj8xbvZip5F8xFf8uFeUh5n7wqPtlOCfzeMLR_N4MyYXyKBD_PEc_axvdewfE-WnqjOInRBRMKeCNTBfI"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-canvas-light font-bold tracking-tight leading-tight">
                    PIERC
                  </span>
                  <span className="font-label-caps text-[10px] text-outline-variant tracking-wider uppercase">
                    Parul University
                  </span>
                </div>
              </Link>
              
              <p className="font-body-sm text-body-sm text-outline-variant max-w-sm leading-relaxed">
                Parul Innovation &amp; Entrepreneurship Research Centre is Gujarat's premier university-anchored deep-tech incubator and startup catalyst, translating pioneering collegiate intellectual property into venture-scale market leaders.
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-graphite-surface text-electric-glow font-label-code text-xs border border-graphite-border">
                <span>Sec 8 Compliant</span>
                <span>•</span>
                <span>DST &amp; BIRAC Supported</span>
              </div>
            </div>

            <div className="space-y-2 font-body-sm text-body-sm text-outline-variant">
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-electric-glow shrink-0 mt-0.5">location_on</span>
                <span>BBA Building, Parul University Campus, Limda, Waghodia, Vadodara, Gujarat 391760</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-electric-glow shrink-0">call</span>
                <a className="hover:text-canvas-light transition-colors font-label-code" href="tel:02668260350">
                  0266-8260350
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-electric-glow shrink-0">mail</span>
                <a className="hover:text-canvas-light transition-colors font-label-code" href="mailto:pierc@paruluniversity.ac.in">
                  pierc@paruluniversity.ac.in
                </a>
              </p>
            </div>
          </div>

          {/* Incubation Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-canvas-light font-semibold block">
              Incubation
            </span>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-outline-variant">
              <li><button onClick={() => onOpenIncubationModal('pre-incubation')} className="hover:text-canvas-light transition-colors text-left">Pre-Incubation Track</button></li>
              <li><button onClick={() => onOpenIncubationModal('growthpad')} className="hover:text-canvas-light transition-colors text-left">Growthpad Accelerator</button></li>
              <li><Link to="/programs" className="hover:text-canvas-light transition-colors">Startup Nivesh 3.0</Link></li>
              <li><Link to="/programs" className="hover:text-canvas-light transition-colors">HealthTech Accelerator</Link></li>
              <li><Link to="/fablab" className="hover:text-canvas-light transition-colors">FabLab Prototyping</Link></li>
              <li><Link to="/programs" className="hover:text-canvas-light transition-colors">BioNEST Bio-Incubator</Link></li>
            </ul>
          </div>

          {/* Initiatives Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-canvas-light font-semibold block">
              Initiatives
            </span>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-outline-variant">
              <li><Link to="/flagships" className="hover:text-canvas-light transition-colors">Vadodara Startup Festival</Link></li>
              <li><Link to="/flagships" className="hover:text-canvas-light transition-colors">Vadodara Hackathon</Link></li>
              <li><Link to="/studios" className="hover:text-canvas-light transition-colors">Regional Studios</Link></li>
              <li><button onClick={() => onOpenMentorModal()} className="hover:text-canvas-light transition-colors text-left">Global Mentor Network</button></li>
              <li><Link to="/about" className="hover:text-canvas-light transition-colors">IP &amp; Tech Transfer</Link></li>
              <li><a href="https://www.paruluniversity.ac.in/mbaeis_2026_gsn/" target="_blank" rel="noreferrer" className="hover:text-canvas-light transition-colors">MBA EIS Program</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-canvas-light font-semibold block">
              Innovation Intelligence
            </span>
            <p className="font-body-sm text-body-sm text-outline-variant leading-relaxed">
              Receive quarterly research commercialization reports, seed investment alerts, and flagship cohort deadlines straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@startup.io"
                  className="h-10 w-full px-3 rounded-lg bg-graphite-surface border border-graphite-border text-canvas-light font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:border-electric-glow transition-colors"
                />
                <button
                  type="submit"
                  className="h-10 px-5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-semibold transition-all shrink-0 shadow-md"
                >
                  {subscribed ? 'Subscribed ✓' : 'Subscribe'}
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-electric-glow font-medium animate-fadeIn">
                  Thank you for subscribing to PIERC Innovation Dispatch!
                </p>
              )}
              <p className="font-label-code text-[11px] text-outline">
                Strictly zero spam. Institutional &amp; founder confidentiality assured.
              </p>
            </form>

            <div className="pt-2">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-canvas-light font-semibold block mb-2">
                Ecosystem Network
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href="https://www.linkedin.com/company/pierc-parul-university/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-lg bg-graphite-surface border border-graphite-border flex items-center justify-center text-outline-variant hover:text-electric-glow hover:border-electric-glow transition-all"
                  aria-label="LinkedIn"
                >
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                </a>
                <a 
                  href="https://www.facebook.com/edcparuluniversity/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-lg bg-graphite-surface border border-graphite-border flex items-center justify-center text-outline-variant hover:text-electric-glow hover:border-electric-glow transition-all"
                  aria-label="Facebook"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </a>
                <a 
                  href="https://www.instagram.com/pierc_pu/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-9 h-9 rounded-lg bg-graphite-surface border border-graphite-border flex items-center justify-center text-outline-variant hover:text-electric-glow hover:border-electric-glow transition-all"
                  aria-label="Instagram"
                >
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Coordinates */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-outline-variant font-body-sm text-xs">
          <div className="flex items-center gap-4 flex-wrap">
            <p>© 2026 PIERC, Parul University. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <Link to="/leadership" className="hover:text-canvas-light transition-colors">Board of Governors</Link>
            <span className="hidden md:inline">•</span>
            <Link to="/about" className="hover:text-canvas-light transition-colors">Startup Policy &amp; Guidelines</Link>
            <span className="hidden md:inline">•</span>
            <span className="text-outline">Section 8 Reg. No: U80903GJ2015NPL084478</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-electric-glow animate-pulse"></span>
            <span className="font-label-code text-canvas-light">Campus HQ: Vadodara, Gujarat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
