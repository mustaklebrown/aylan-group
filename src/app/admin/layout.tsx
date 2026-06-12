import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Globe } from "lucide-react";
import AdminLogoutButton from "./logout-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Console Admin | Aylan Group",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col md:flex-row text-white font-outfit">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#001430] border-b md:border-b-0 md:border-r border-white/10 flex flex-col p-6 shrink-0 justify-between md:min-h-screen">
        <div className="flex flex-col gap-8 w-full">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-md bg-white/5">
              <Image
                src="/logo.png"
                alt="Aylan Group Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-extrabold text-white tracking-tight leading-tight">
                Aylan <span className="text-gradient-gold">Admin</span>
              </span>
              <span className="text-[10px] text-text-muted">Console de gestion</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 font-semibold text-sm transition-all"
            >
              <LayoutDashboard size={18} className="shrink-0" />
              <span>Tableau de bord</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/70 hover:bg-white/5 hover:text-white font-semibold text-sm border border-transparent transition-all"
            >
              <Globe size={18} className="shrink-0" />
              <span>Voir le site public</span>
            </Link>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="flex flex-col gap-4 mt-8 md:mt-0 pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-sm text-white shrink-0">
              {session.user.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-white truncate">
                {session.user.name}
              </span>
              <span className="text-xs text-text-muted truncate">
                {session.user.email}
              </span>
            </div>
          </div>
          <AdminLogoutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}
