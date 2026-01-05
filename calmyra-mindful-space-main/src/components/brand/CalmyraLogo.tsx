import calmyraLogo from "@/assets/calmyra-logo.png";

interface CalmyraLogoProps {
  className?: string;
  size?: number;
}

export const CalmyraLogo = ({ className = "", size = 32 }: CalmyraLogoProps) => {
  return (
    <img
      src={calmyraLogo}
      alt="Calmyra Logo"
      width={size}
      height={size}
      className={className}
    />
  );
};
