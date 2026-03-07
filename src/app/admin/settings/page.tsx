"use client";

import { useState } from "react";

export default function AdminSettings() {
    const [saved, setSaved] = useState(false);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-whiteChrome">Settings</h1>
                <p className="text-ashGrey text-sm mt-1">Site configuration</p>
            </div>

            <div className="bg-brushedAnthracite border border-white/5 p-8 max-w-2xl">
                <h2 className="text-lg font-heading font-bold text-whiteChrome mb-6">General</h2>
                <div className="space-y-6 text-sm">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1">Site Name</label>
                        <input defaultValue="Tejnavi Studio" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-3 py-2 focus:outline-none focus:border-liquidSilver" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1">Contact Email</label>
                        <input defaultValue="tejnavi.studio@gmail.com" className="w-full bg-matteCarbon border border-white/10 text-whiteChrome px-3 py-2 focus:outline-none focus:border-liquidSilver" />
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-ashGrey mb-1">Social Links</label>
                        <div className="space-y-2">
                            {["Twitter / X", "Instagram", "LinkedIn", "GitHub"].map((platform) => (
                                <div key={platform} className="flex items-center gap-3">
                                    <span className="text-ashGrey w-24">{platform}</span>
                                    <input placeholder={`${platform} URL`} className="flex-1 bg-matteCarbon border border-white/10 text-whiteChrome px-3 py-2 focus:outline-none focus:border-liquidSilver" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                    className="mt-8 bg-whiteChrome text-matteCarbon px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-liquidSilver transition-all"
                >
                    {saved ? "✓ Saved" : "Save Settings"}
                </button>
            </div>
        </div>
    );
}
