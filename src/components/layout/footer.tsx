import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-[#122614] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Column */}
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="/assets/autowow-logo.png"
              alt="Capsules"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-300 text-white">
          <p className="text-center text-white">
            © {new Date().getFullYear()} Capsules. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
