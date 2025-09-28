export function Logo({ className="" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Logótipo"
      className={`mx-auto object-contain ${className}`}
      style={{ maxHeight: 60 }}
    />
  );
}