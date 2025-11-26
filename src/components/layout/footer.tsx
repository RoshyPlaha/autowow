import Image from "next/image";

export const Footer = ({
  brandName,
  primaryColor,
}: {
  brandName: string;
  primaryColor: string;
}) => {
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <footer
      className="text-white relative z-10"
      style={{
        backgroundColor: hexToRgba(primaryColor, 0.5),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src={`/assets/logos/${brandName}.png`}
              alt="logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 text-white">
          <p className="text-center text-white">
            © {new Date().getFullYear()} autoro. All rights reserved. This is a
            dummy website.
          </p>
        </div>
      </div>
    </footer>
  );
};
