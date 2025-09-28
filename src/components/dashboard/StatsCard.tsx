import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning";
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  unit, 
  icon,
  variant = "default" 
}: StatsCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className={cn(
      "shadow-card transition-wellness hover:shadow-wellness",
      variant === "success" && "border-success/20 bg-success/5",
      variant === "warning" && "border-warning/20 bg-warning/5"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === "default" && "bg-primary/10 text-primary",
            variant === "success" && "bg-success/10 text-success",
            variant === "warning" && "bg-warning/10 text-warning"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className="text-2xl font-bold">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
          </div>
          {change !== undefined && (
            <div className={cn(
              "flex items-center text-xs font-medium",
              isPositive && "text-success",
              isNegative && "text-destructive",
              change === 0 && "text-muted-foreground"
            )}>
              {isPositive && <TrendingUp className="h-3 w-3 mr-1" />}
              {isNegative && <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};