"use client";

import { useState } from "react";
import { submitBakerApplication } from "@/lib/dataService";

type JoinBakerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function JoinBakerModal({
  isOpen,
  onClose,
}: JoinBakerModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    brandName: "",
    instagram: "",
    location: "Bandra West",
    specialty: "Celebration Cakes",
    message: "",
  });

  if (!isOpen) return null;

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    setSubmitError(null);

    const result = await submitBakerApplication(formData);

    setIsLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(
        result.error ||
        "Something went wrong. Please try again."
      );
    }
  }

  function handleClose() {
    if (isLoading) return;

    setSubmitted(false);
    setSubmitError(null);
    onClose();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-baker-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#2b2118]/70 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#faf7f2] rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(43,33,24,0.35)] ring-1 ring-[#2b2118]/10 text-[#2b2118]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2b2118] shadow-md ring-1 ring-[#2b2118]/10 transition-all hover:scale-110 hover:bg-white cursor-pointer"
        >
          ✕
        </button>

        {submitted ? (
          <div className="px-6 sm:px-12 py-16 sm:py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#b3874b]/15 text-[#6b4a32] ring-1 ring-[#b3874b]/30">
              <span className="text-3xl font-serif">
                ✓
              </span>
            </div>

            <p className="mt-7 uppercase tracking-[0.3em] text-[10px] font-semibold text-[#8d7045]">
              The Baker&apos;s Edit • Curation Atelier
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl mt-3 text-[#2b2118]">
              Application Received
            </h2>

            <p className="max-w-md mx-auto mt-4 text-sm sm:text-base text-[#2b2118]/70 leading-relaxed">
              Thank you for sharing your craft with us. Our editorial team
              reviews every portfolio, ingredient ethos, and Instagram showcase
              before featuring bakers on the platform.
            </p>

            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-xs text-[#2b2118]/70 ring-1 ring-[#2b2118]/8 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#b3874b] animate-pulse" />
              <span>Status: Under review (typically 2-3 business days)</span>
            </div>

            <div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-8 rounded-full bg-[#2b2118] px-9 py-3.5 text-xs uppercase tracking-wider font-semibold text-[#faf7f2] transition-all hover:bg-[#3e2f23] hover:scale-[1.02] shadow-md cursor-pointer"
              >
                Return to Directory
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-[#2b2118]/8">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#b3874b]" />
                <p className="uppercase tracking-[0.28em] text-[10px] font-semibold text-[#8d7045]">
                  Atelier Invitation
                </p>
              </div>

              <h2
                id="join-baker-title"
                className="font-serif text-2xl sm:text-4xl mt-2.5 text-[#2b2118]"
              >
                Join The Baker&apos;s Edit
              </h2>

              <p className="max-w-xl text-xs sm:text-sm text-[#2b2118]/65 mt-2 leading-relaxed">
                We celebrate Mumbai&apos;s finest independent home kitchens.
                Fill in your details below to submit your atelier for editorial review.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2 mt-4.5">
                <span className="rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-wider font-medium text-[#2b2118]/70 ring-1 ring-[#2b2118]/8 shadow-xs">
                  ✦ Curated Platform
                </span>

                <span className="rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-wider font-medium text-[#2b2118]/70 ring-1 ring-[#2b2118]/8 shadow-xs">
                  ✦ Direct Inquiries
                </span>

                <span className="rounded-full bg-white px-3 py-1 text-[10px] uppercase tracking-wider font-medium text-[#2b2118]/70 ring-1 ring-[#2b2118]/8 shadow-xs">
                  ✦ Zero Commission Fees
                </span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-6 sm:px-10 py-7 sm:py-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118]/60 mb-2">
                    Your Name
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. Aanya Kapoor"
                    value={formData.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    className="w-full rounded-xl sm:rounded-2xl bg-white px-4 py-3 text-sm border border-[#2b2118]/12 text-[#2b2118] placeholder:text-[#2b2118]/35 focus:outline-none focus:border-[#6b4a32] focus:ring-2 focus:ring-[#6b4a32]/20 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118]/60 mb-2">
                    Bakery / Atelier Brand
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. The Flour Studio"
                    value={formData.brandName}
                    onChange={(e) =>
                      updateField(
                        "brandName",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl sm:rounded-2xl bg-white px-4 py-3 text-sm border border-[#2b2118]/12 text-[#2b2118] placeholder:text-[#2b2118]/35 focus:outline-none focus:border-[#6b4a32] focus:ring-2 focus:ring-[#6b4a32]/20 transition-all shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118]/60 mb-2">
                  Instagram Handle / Profile
                </label>

                <input
                  type="text"
                  required
                  placeholder="@yourbakery or instagram.com/yourbakery"
                  value={formData.instagram}
                  onChange={(e) =>
                    updateField(
                      "instagram",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl sm:rounded-2xl bg-white px-4 py-3 text-sm border border-[#2b2118]/12 text-[#2b2118] placeholder:text-[#2b2118]/35 focus:outline-none focus:border-[#6b4a32] focus:ring-2 focus:ring-[#6b4a32]/20 transition-all shadow-xs"
                />

                <p className="text-[11px] text-[#2b2118]/45 mt-1.5">
                  Used by our team to review your creations, photography, and cake aesthetic.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118]/60 mb-2">
                    Kitchen Location (Mumbai)
                  </label>

                  <input
                    type="text"
                    required
                    list="mumbai-areas"
                    placeholder="e.g. Bandra West, Juhu, Powai"
                    value={formData.location}
                    onChange={(e) =>
                      updateField("location", e.target.value)
                    }
                    className="w-full rounded-xl sm:rounded-2xl bg-white px-4 py-3 text-sm border border-[#2b2118]/12 text-[#2b2118] placeholder:text-[#2b2118]/35 focus:outline-none focus:border-[#6b4a32] focus:ring-2 focus:ring-[#6b4a32]/20 transition-all shadow-xs"
                  />

                  <datalist id="mumbai-areas">
                    <option value="Andheri East" />
                    <option value="Andheri West" />
                    <option value="Bandra East" />
                    <option value="Bandra West" />
                    <option value="Borivali" />
                    <option value="Bhandup" />
                    <option value="Byculla" />
                    <option value="Chembur" />
                    <option value="Colaba" />
                    <option value="Dadar" />
                    <option value="Ghatkopar" />
                    <option value="Goregaon" />
                    <option value="Juhu" />
                    <option value="Kandivali" />
                    <option value="Khar" />
                    <option value="Kurla" />
                    <option value="Lower Parel" />
                    <option value="Malad" />
                    <option value="Matunga" />
                    <option value="Mulund" />
                    <option value="Powai" />
                    <option value="Santacruz" />
                    <option value="Sion" />
                    <option value="Thane" />
                    <option value="Vikhroli" />
                    <option value="Vile Parle" />
                    <option value="Wadala" />
                    <option value="Worli" />
                  </datalist>

                  <p className="text-[11px] text-[#2b2118]/45 mt-1.5">
                    Your kitchen locality or primary delivery hub.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118]/60 mb-2">
                    Primary Specialty
                  </label>

                  <select
                    value={formData.specialty}
                    onChange={(e) =>
                      updateField(
                        "specialty",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl sm:rounded-2xl bg-white px-4 py-3 text-sm border border-[#2b2118]/12 text-[#2b2118] focus:outline-none focus:border-[#6b4a32] transition-all shadow-xs cursor-pointer"
                  >
                    <option>Celebration Cakes</option>
                    <option>Custom Cakes</option>
                    <option>Birthday Cakes</option>
                    <option>Wedding Cakes</option>
                    <option>Cupcakes</option>
                    <option>Brownies</option>
                    <option>Cookies</option>
                    <option>Cheesecakes</option>
                    <option>Pastries</option>
                    <option>Dessert Boxes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2b2118]/60 mb-2">
                  Tell us about your craft & ingredients
                </label>

                <textarea
                  rows={4}
                  placeholder="What makes your baking special? (e.g. French Valrhona chocolate, organic Madagascar vanilla, 100% eggless menu, bespoke hand-piped florals...)"
                  value={formData.message}
                  onChange={(e) =>
                    updateField(
                      "message",
                      e.target.value
                    )
                  }
                  className="w-full resize-none rounded-xl sm:rounded-2xl bg-white px-4 py-3 text-sm border border-[#2b2118]/12 text-[#2b2118] placeholder:text-[#2b2118]/35 focus:outline-none focus:border-[#6b4a32] focus:ring-2 focus:ring-[#6b4a32]/20 transition-all shadow-xs"
                />
              </div>

              {submitError && (
                <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 shadow-xs">
                  <p className="text-xs sm:text-sm text-red-700">
                    {submitError}
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#2b2118] px-6 py-4 text-xs uppercase tracking-wider font-semibold text-[#faf7f2] transition-all hover:bg-[#3e2f23] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 shadow-md cursor-pointer"
                >
                  {isLoading
                    ? "Submitting application…"
                    : "Submit Application for Review →"}
                </button>

                <p className="text-center text-[11px] text-[#2b2118]/50 mt-3">
                  Verified independent bakers only • No listing charges
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}