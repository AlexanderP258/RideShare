import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  imageSize?: number;
  textSize?: string;
}

export default function Logo({
  className = "",
  imageSize = 60,
  textSize = "text-xl",
}: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/rideshare-logo.png"
        alt="RideShare Logo"
        width={imageSize}
        height={imageSize}
        className="object-contain"
        priority
      />
      <span className={`font-bold text-green-600 ${textSize}`}>RideShare</span>
    </Link>
  );
}
