export const DEMO_FLAG = "demo";
export const keys = {
  profile: "ai_demo_profile",
  workouts: "ai_demo_workouts",
  meals: "ai_demo_meals",
  messages: "ai_demo_messages",
  stats: "ai_demo_stats",
  subscription: "ai_demo_subscription"
};
export const isDemo = () => typeof window !== "undefined" && localStorage.getItem(DEMO_FLAG) === "true";
export const enterDemo = () => { if (typeof window !== "undefined") localStorage.setItem(DEMO_FLAG, "true"); };
export const exitDemo = () => { if (typeof window !== "undefined") localStorage.removeItem(DEMO_FLAG); };