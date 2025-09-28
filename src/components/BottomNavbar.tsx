"use client";
import { Link, useLocation } from "react-router-dom";
import { Home, Utensils, Dumbbell, BarChart3, User, CreditCard } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Início", Icon: Home },
  { href: "/meal", label: "Refeições", Icon: Utensils },
  { href: "/workouts", label: "Treino", Icon: Dumbbell },
  { href: "/stats", label: "Estatísticas", Icon: BarChart3 },
  { href: "/profile", label: "Perfil", Icon: User },
  { href: "/subscription", label: "Subscrição", Icon: CreditCard }
];

export default function BottomNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  
  if (typeof window !== "undefined" && localStorage.getItem("demo") !== "true") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur-md z-50">
      <ul className="grid grid-cols-6">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex flex-col items-center">
              <Link
                to={href}
                className={`flex flex-col items-center py-2 ${
                  active ? "text-primary font-semibold" : "text-gray-500 hover:text-primary"
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${active ? "text-primary" : ""}`} />
                <span className="text-xs">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}