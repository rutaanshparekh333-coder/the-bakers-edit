"use client";

import { useState } from "react";

type JoinBakerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function JoinBakerModal({ isOpen, onClose }: JoinBakerModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    instagram: "",
    location: "Bandra West",
    specialty: "Celebration Cakes",
    message: "",
  });

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2b2118]/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#faf6ef] rounded-[2rem] p-6 sm:p-8 shadow-2xl border border-[#2b2118]/10 text-[#2b2118]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f6f1e8] text-[#2b2118] transition-transform hover:scale-110"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#c4a574]/20 text-2xl text-[#6b4a32]">
              ✓
            </div>
            <h3 className="font-serif text-3xl">Application Received</h3>
            <p className="text-[#2b2118]/70 text-sm max-w-sm mx-auto leading-relaxed">
              Thank you for applying to join The Baker&apos;s Edit! Our curation team will review your Instagram portfolio and contact you within 48 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 rounded-full bg-[#2b2118] px-8 py-3 text-sm text-[#f6f1e8] transition-all hover:bg-[#3a2c22]"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <p className="uppercase tracking-[0.24em] text-xs text-[#c4a574]">
              For Independent Home Bakers
            </p>
            <h2 className="font-serif text-3xl mt-1">Join The Baker&apos;s Edit</h2>
            <p className="text-sm text-[#2b2118]/65 mt-2">
              Apply to join Mumbai&apos;s verified directory of craft home bakers and dessert makers.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#2b2118]/70 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aanya Kapoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl bg-[#f6f1e8] px-4 py-2.5 text-sm border border-[#2b2118]/10 focus:outline-none focus:border-[#6b4a32]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#2b2118]/70 mb-1">
                  Bakery / Brand Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Flour Studio"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full rounded-xl bg-[#f6f1e8] px-4 py-2.5 text-sm border border-[#2b2118]/10 focus:outline-none focus:border-[#6b4a32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#2b2118]/70 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@yourhandle"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    className="w-full rounded-xl bg-[#f6f1e8] px-4 py-2.5 text-sm border border-[#2b2118]/10 focus:outline-none focus:border-[#6b4a32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#2b2118]/70 mb-1">
                    Mumbai Kitchen Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl bg-[#f6f1e8] px-4 py-2.5 text-sm border border-[#2b2118]/10 focus:outline-none focus:border-[#6b4a32]"
                  >
                    <option value="Bandra West">Bandra West</option>
                    <option value="Juhu">Juhu</option>
                    <option value="Andheri West">Andheri West</option>
                    <option value="Powai">Powai</option>
                    <option value="Colaba">Colaba</option>
                    <option value="Lower Parel">Lower Parel</option>
                    <option value="Khar">Khar</option>
                    <option value="Dadar">Dadar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#2b2118]/70 mb-1">
                  Primary Specialty
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full rounded-xl bg-[#f6f1e8] px-4 py-2.5 text-sm border border-[#2b2118]/10 focus:outline-none focus:border-[#6b4a32]"
                >
                  <option value="Custom Cakes">Custom Cakes</option>
                  <option value="Birthday Cakes">Birthday Cakes</option>
                  <option value="Wedding Cakes">Wedding Cakes</option>
                  <option value="Cupcakes">Cupcakes</option>
                  <option value="Brownies">Brownies</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Cheesecakes">Cheesecakes</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Dessert Boxes">Dessert Boxes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#2b2118]/70 mb-1">
                  Tell us about your baking craft
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details on your signature desserts, ingredients, lead times..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl bg-[#f6f1e8] px-4 py-2.5 text-sm border border-[#2b2118]/10 focus:outline-none focus:border-[#6b4a32]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-full bg-[#2b2118] px-6 py-3.5 text-sm font-medium text-[#f6f1e8] transition-all hover:bg-[#3a2c22] hover:scale-[1.01]"
              >
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
