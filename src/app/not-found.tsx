import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-matteCarbon">
            <div className="text-center">
                <h1 className="text-8xl font-heading font-bold text-whiteChrome mb-4">404</h1>
                <p className="text-xl text-ashGrey mb-8">Page not found</p>
                <Link
                    href="/"
                    className="inline-block bg-whiteChrome text-matteCarbon px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-liquidSilver transition-all duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
