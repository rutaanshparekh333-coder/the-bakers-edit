
"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

type Application = {
    id: string;
    name: string;
    brand_name: string;
    instagram: string;
    location: string;
    specialty: string;
    message: string | null;
    status: string;
    created_at?: string;
};

export default function AdminPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadApplications() {
        const supabase = getSupabaseClient();

        if (!supabase) {
            setError("Supabase is not available.");
            setLoading(false);
            return;
        }

        const client = supabase as any;

        const { data, error } = await client
            .from("baker_applications")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Application fetch error:", error);
            setError(error.message);
        } else {
            setApplications(data || []);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadApplications();
    }, []);

    async function updateStatus(
        id: string,
        status: "approved" | "rejected"
    ) {
        const supabase = getSupabaseClient();

        if (!supabase) {
            alert("Supabase is not available.");
            return;
        }

        const client = supabase as any;

        const application = applications.find(
            (item) => item.id === id
        );

        if (!application) {
            alert("Application not found.");
            return;
        }

        const { error } = await client
            .from("baker_applications")
            .update({ status })
            .eq("id", id);

        if (error) {
            alert(error.message);
            return;
        }

        if (status === "approved") {
            const slug = String(application.brand_name ?? "")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");

            const { data: existingBaker } = await client
                .from("bakers")
                .select("id")
                .eq("slug", slug)
                .maybeSingle();

            if (!existingBaker) {
                const { error: bakerError } = await client
                    .from("bakers")
                    .insert({
                        name: application.brand_name,
                        slug,
                        bio: application.message || "",
                        short_description: application.specialty,
                        profile_image: "",
                        cover_image: null,
                        location_id: null,
                        area: application.location,
                        specialties: application.specialty,
                        specialty_tags: [application.specialty],
                        price_range: "₹₹",
                        price_min: 0,
                        price_max: 10000,
                        instagram: application.instagram,
                        instagram_handle: application.instagram,
                        website: null,
                        phone: null,
                        lead_time: "24-48 hours notice",
                        dietary_options: [],
                        verified: true,
                        is_featured: false,
                        features: {}
                    });

                if (bakerError) {
                    alert(
                        "Application approved, but baker could not be added: " +
                        bakerError.message
                    );
                    return;
                }
            }
        }

        setApplications((current) =>
            current.map((application) =>
                application.id === id
                    ? { ...application, status }
                    : application
            )
        );
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf7f2] flex items-center justify-center text-[#2b2118]">
                <div className="flex flex-col items-center gap-3">
                    <span className="w-6 h-6 rounded-full border-2 border-[#6b4a32] border-t-transparent animate-spin" />
                    <p className="text-sm text-[#2b2118]/60">
                        Loading applications...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#faf7f2] text-[#2b2118]">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#2b2118]/8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-px w-6 bg-[#b3874b]" />
                            <p className="uppercase tracking-[0.28em] text-[10px] sm:text-xs text-[#8d7045] font-semibold">
                                The Baker&apos;s Edit • Curator Portal
                            </p>
                        </div>

                        <h1 className="font-serif text-3xl sm:text-5xl text-[#2b2118]">
                            Baker Applications
                        </h1>

                        <p className="mt-2 text-xs sm:text-sm text-[#2b2118]/65">
                            Review and approve independent baker ateliers before featuring them in Mumbai discovery.
                        </p>
                    </div>

                    <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full border border-[#2b2118]/20 bg-white px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-[#2b2118] hover:bg-[#2b2118] hover:text-[#faf7f2] transition-all shadow-xs w-fit"
                    >
                        <span>← Back to Platform</span>
                    </a>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700 shadow-xs">
                        {error}
                    </div>
                )}

                {applications.length === 0 ? (
                    <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-[#2b2118]/8 shadow-xs">
                        <div className="mx-auto w-12 h-12 rounded-full bg-[#f4eee3] flex items-center justify-center text-xl mb-3">
                            📋
                        </div>
                        <h2 className="font-serif text-2xl text-[#2b2118]">
                            No applications pending
                        </h2>

                        <p className="mt-2 text-xs sm:text-sm text-[#2b2118]/50 max-w-sm mx-auto">
                            New home baker submissions from the &ldquo;Join as a Baker&rdquo; modal will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {applications.map((application) => (
                            <div
                                key={application.id}
                                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs ring-1 ring-[#2b2118]/8 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                                    <div className="flex-1">

                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="font-serif text-2xl text-[#2b2118]">
                                                {application.brand_name}
                                            </h2>

                                            <span
                                                className={`text-[10px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full ${application.status === "pending"
                                                    ? "bg-[#f4eee3] text-[#8d7045]"
                                                    : application.status === "approved"
                                                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                                        : "bg-red-50 text-red-700 ring-1 ring-red-200"
                                                    }`}
                                            >
                                                {application.status}
                                            </span>
                                        </div>

                                        <p className="mt-1.5 text-xs sm:text-sm text-[#2b2118]/60 font-medium">
                                            Baker: {application.name}
                                        </p>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                                            <div className="p-3 bg-[#faf7f2] rounded-xl">
                                                <p className="text-[10px] uppercase tracking-[0.16em] text-[#2b2118]/45 font-medium">
                                                    Instagram
                                                </p>

                                                <p className="mt-1 text-xs font-semibold text-[#2b2118] truncate">
                                                    {application.instagram}
                                                </p>
                                            </div>

                                            <div className="p-3 bg-[#faf7f2] rounded-xl">
                                                <p className="text-[10px] uppercase tracking-[0.16em] text-[#2b2118]/45 font-medium">
                                                    Kitchen Location
                                                </p>

                                                <p className="mt-1 text-xs font-semibold text-[#2b2118] truncate">
                                                    📍 {application.location}
                                                </p>
                                            </div>

                                            <div className="p-3 bg-[#faf7f2] rounded-xl">
                                                <p className="text-[10px] uppercase tracking-[0.16em] text-[#2b2118]/45 font-medium">
                                                    Specialty
                                                </p>

                                                <p className="mt-1 text-xs font-semibold text-[#2b2118] truncate">
                                                    🍰 {application.specialty}
                                                </p>
                                            </div>

                                            {application.created_at && (
                                                <div className="p-3 bg-[#faf7f2] rounded-xl">
                                                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#2b2118]/45 font-medium">
                                                        Applied Date
                                                    </p>

                                                    <p className="mt-1 text-xs font-semibold text-[#2b2118]">
                                                        {new Date(
                                                            application.created_at
                                                        ).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </p>
                                                </div>
                                            )}

                                        </div>

                                        {application.message && (
                                            <div className="mt-5 rounded-2xl bg-[#faf7f2] p-4 ring-1 ring-[#2b2118]/6">

                                                <p className="text-[10px] uppercase tracking-[0.16em] text-[#2b2118]/45 font-semibold">
                                                    Craft & Ethos Statement
                                                </p>

                                                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#2b2118]/75 italic">
                                                    &ldquo;{application.message}&rdquo;
                                                </p>

                                            </div>
                                        )}

                                    </div>

                                    <div className="flex lg:flex-col gap-2.5 shrink-0">

                                        {application.status !== "approved" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateStatus(
                                                        application.id,
                                                        "approved"
                                                    )
                                                }
                                                className="flex-1 lg:w-32 rounded-full bg-[#2b2118] text-[#faf7f2] px-5 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-[#3e2f23] transition shadow-xs cursor-pointer"
                                            >
                                                Approve
                                            </button>
                                        )}

                                        {application.status !== "rejected" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateStatus(
                                                        application.id,
                                                        "rejected"
                                                    )
                                                }
                                                className="flex-1 lg:w-32 rounded-full border border-red-200 text-red-600 px-5 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-red-50 transition cursor-pointer"
                                            >
                                                Reject
                                            </button>
                                        )}

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}

