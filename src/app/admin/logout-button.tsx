"use client";

import { LogOut, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-semibold text-sm mt-auto"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin shrink-0" />
      ) : (
        <LogOut size={18} className="shrink-0" />
      )}
      <span>{loading ? "Déconnexion..." : "Déconnexion"}</span>
    </button>
  );
}
