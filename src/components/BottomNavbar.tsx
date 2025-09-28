"use client";

import { Link, useLocation } from "react-router-dom";
import { Home, Utensils, Dumbbell, BarChart3, User, CreditCard } from "lucide-react";
import { isDemo } from "@/lib/demo";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

const items = [
  { href: "/dashboard", label: "Início", Icon: Home },
  { href: "/meal", label: "Refeições", Icon: Utensils },
  { href: "/workouts", label: "Treino", Icon: Dumbbell },
  { href: "/stats", label: "Estatísticas", Icon: BarChart3 },
  { href: "/profile", label: "Perfil", Icon: User },
  { href: "/subscription", label: "Subscrição", Icon: CreditCard },
];

export default function BottomNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const sb = createClient();
    sb.auth.getSession().then(({ data }) => {
      setShow(Boolean(data.session) || isDemo());
    });
  }, []);

  if (!show) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <ul className="flex justify-around items-center py-2">
        {items.map(({ href, label, Icon }) => (
          <li key={href}>
            <Link to={href} className="flex flex-col items-center text-xs">
              <Icon className={`h-5 w-5 mb-1 ${pathname === href ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`${pathname === href ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}