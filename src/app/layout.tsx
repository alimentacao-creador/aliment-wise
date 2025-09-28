import "./globals.css";
import BottomNavbar from "@/components/BottomNavbar";
import DemoBanner from "@/components/DemoBanner";

export const metadata = {
  title: "Alimentação Inteligente",
  description: "Demonstração — Nutrição, Treino e Evolução"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="min-h-screen pb-16">
        <DemoBanner />
        <main>{children}</main>
        <BottomNavbar />
      </body>
    </html>
  );
}