"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#001430] flex items-center justify-center p-6 text-white font-outfit">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-2">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Oups ! Une erreur est survenue</h1>
          <p className="text-white/60 text-sm">
            {error.message || "Un problème inattendu s'est produit. Notre équipe a été avertie."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full pt-4 border-t border-white/10">
          <button
            onClick={() => reset()}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <RefreshCcw className="w-4 h-4" />
            Réessayer
          </button>
          
          <Link
            href="/"
            className="flex-1 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#001430] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Home className="w-4 h-4" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
