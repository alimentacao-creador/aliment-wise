import "./globals.css";
import BottomNavbar from "@/components/BottomNavbar";

export const metadata = {
  title: "Alimentação Inteligente",
  description: "Demonstração — treino, nutrição e evolução"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen">
        <main className="pb-20">{children}</main>
        <BottomNavbar />
      </body>
    </html>
  );
}