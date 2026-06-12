import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion | Aylan Group",
  description: "Espace de connexion d'administration Aylan Group.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
