"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/admin",
      });

      if (authError) {
        setError(authError.message || "Identifiants incorrects. Veuillez réessayer.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-bg-dark min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Decorative Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent/20 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors text-sm"
        >
          &larr; Retour à l'accueil
        </Link>

        {/* Card */}
        <div className="glass-panel p-8 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent"></div>

          {/* Logo / Header */}
          <div className="text-center mb-8">
            <div className="inline-block relative w-16 h-16 rounded-full overflow-hidden border border-white/20 shadow-lg bg-white/5 mb-4">
              <Image
                src="/logo.png"
                alt="Aylan Group Logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Espace <span className="text-gradient-gold">Admin</span>
            </h1>
            <p className="text-text-muted text-sm mt-2">
              Connectez-vous pour gérer le site d'Aylan Group.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl flex items-start gap-3 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aylan-group.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
