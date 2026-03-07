"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push(callbackUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-xs uppercase tracking-widest text-ashGrey mb-2 font-medium">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-brushedAnthracite border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-liquidSilver transition-colors"
                    placeholder="admin@tejnavistudio.com"
                />
            </div>

            <div>
                <label className="block text-xs uppercase tracking-widest text-ashGrey mb-2 font-medium">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-brushedAnthracite border border-white/10 text-whiteChrome px-4 py-3 text-sm focus:outline-none focus:border-liquidSilver transition-colors"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-whiteChrome text-matteCarbon py-3 font-bold uppercase tracking-widest text-sm hover:bg-liquidSilver transition-all duration-300 disabled:opacity-50"
            >
                {loading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    );
}

export default function AdminLogin() {
    return (
        <div className="min-h-screen bg-matteCarbon flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-heading font-bold text-whiteChrome tracking-tighter">
                        TEJNAVI<span className="text-liquidSilver">.</span>
                    </h1>
                    <p className="text-ashGrey text-sm mt-2">Admin Dashboard</p>
                </div>

                <Suspense fallback={<div className="text-center text-ashGrey text-sm py-4">Loading login...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
