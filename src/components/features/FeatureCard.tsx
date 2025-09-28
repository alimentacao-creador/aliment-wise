import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  onAction?: () => void;
  variant?: "default" | "premium" | "coming-soon";
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  action,
  onAction,
  variant = "default" 
}: FeatureCardProps) => {
  return (
    <Card className="group shadow-card hover:shadow-wellness transition-wellness transform hover:scale-105">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-wellness">
            {icon}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {variant === "premium" && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gradient-hero text-white rounded-full">
                Premium
              </span>
            )}
            {variant === "coming-soon" && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-warning/20 text-warning rounded-full">
                Em breve
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {action && onAction && (
          <Button 
            variant={variant === "premium" ? "premium" : "default"} 
            size="sm" 
            onClick={onAction}
            className="w-full group-hover:shadow-glow"
          >
            {action}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};