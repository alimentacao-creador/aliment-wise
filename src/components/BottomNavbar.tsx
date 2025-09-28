"use client";

import { Link, useLocation } from "react-router-dom";
import { Home, Utensils, Dumbbell, BarChart3, User, CreditCard } from "lucide-react";
import { isDemo } from "@/lib/demo";
import { useEffect, useState } from "react";

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isDemo());
  }, []);

  if (!show) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/95 backdrop-blur z-50">
      <ul className="flex justify-around items-center py-2">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link to={href} className="flex flex-col items-center text-xs">
                <Icon className={`h-5 w-5 mb-1 ${active ? "text-blue-600" : "text-gray-500"}`} />
                <span className={`${active ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}