import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Utensils, Dumbbell, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "navigation.home", path: "/dashboard", icon: Home },
  { name: "navigation.meal", path: "/meal", icon: Utensils },
  { name: "navigation.workouts", path: "/workouts", icon: Dumbbell },
  { name: "navigation.stats", path: "/stats", icon: BarChart3 },
  { name: "navigation.profile", path: "/profile", icon: User },
];

export const BottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-card">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-wellness min-w-[60px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{t(item.name)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};