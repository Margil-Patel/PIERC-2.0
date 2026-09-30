import React, { useState } from 'react';

export default function FabLabBookingModal({ isOpen, onClose, defaultBay = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    bay: defaultBay || 'Prototyping Bay A (3D Fabrication)',
    name: '',
    email: '',
    projectTitle: '',
    equipment: 'Industrial 3D Printers (SLA/FDM)',
    dateSlot: '',
    timeSlot: 'Morning (09:00 - 13:00)',
    notes: ''
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
            <div className="w-10 h-10 rounded-xl bg-electric-glow/10 border border-electric-glow/30 flex items-center justify-center text-electric-glow">
              <span className="material-symbols-outlined text-[22px]">precision_manufacturing</span>
            </div>
            <div>
              <span className="font-label-caps text-xs text-electric-glow uppercase tracking-wider font-semibold">
                FabLab Reservation Desk
              </span>
              <h3 className="font-headline-sm text-lg font-bold text-canvas-light">
                Book Prototyping Station
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
              <div className="w-16 h-16 rounded-full bg-electric-glow/10 text-electric-glow flex items-center justify-center mx-auto border border-electric-glow/30">
                <span className="material-symbols-outlined text-[32px]">event_available</span>
              </div>
              <h4 className="font-headline-md text-xl font-bold text-on-surface">
                Station Reserved!
              </h4>
              <p className="font-body-sm text-sm text-on-surface-variant max-w-sm mx-auto">
                Your reservation for <strong>{formData.bay}</strong> on <strong>{formData.dateSlot || 'your requested date'}</strong> ({formData.timeSlot}) has been scheduled. Divyansh Thakur (FabLab Engineer) will assist you upon arrival.
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
              <div>
                <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                  Select Prototyping Bay
                </label>
                <select
                  name="bay"
                  value={formData.bay}
                  onChange={handleChange}
                  className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Prototyping Bay A">Prototyping Bay A (Advanced 3D Fabrication Suite)</option>
                  <option value="Prototyping Bay B">Prototyping Bay B (Micro-Electronics &amp; PCB Workstation)</option>
                  <option value="Prototyping Bay C">Prototyping Bay C (5-Axis CNC &amp; Laser Bay)</option>
                  <option value="Prototyping Bay D">Prototyping Bay D (BioNEST Analytical Lab)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Email / Student ID *
                  </label>
                  <input
                    required
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="id@paruluniversity.ac.in"
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Preferred Date *
                  </label>
                  <input
                    required
                    type="date"
                    name="dateSlot"
                    value={formData.dateSlot}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                    Time Window
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Morning (09:00 - 13:00)">Morning (09:00 - 13:00)</option>
                    <option value="Afternoon (14:00 - 18:00)">Afternoon (14:00 - 18:00)</option>
                    <option value="Evening (18:00 - 21:00)">Evening Extended (18:00 - 21:00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-caps text-xs text-on-surface font-semibold uppercase mb-1">
                  Prototyping Specs &amp; Materials (Optional)
                </label>
                <textarea
                  rows={2}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. Carbon Fiber composite filament, SMD reflow test with custom PCB..."
                  className="w-full p-3 rounded-xl border border-hairline-light bg-surface font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
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
                  Confirm Slot →
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
