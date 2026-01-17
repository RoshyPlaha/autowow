import Image from "next/image";
import Link from "next/link";

const primaryColor = "#09293c";
const COMPANY_NAME = "AR";
const COMPANY_EMAIL = "rosh@autoro.space";

export const Footer = () => {
  return (
    <footer
      className="text-white relative z-10"
      style={{
        backgroundColor: primaryColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src={`/assets/logos/${COMPANY_NAME}.png`}
                alt="logo"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Demo Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Demo</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/demo"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/demo/all_stock"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  All Stock Example
                </Link>
              </li>
              <li>
                <Link
                  href="/demo/valuation"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Example Car Valuation
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Blog</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  All Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  AutoRo Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contact_us"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-white">
          <span className="text-center text-white flex flex-col items-center">
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="hover:opacity-80 transition-opacity"
            >
              {COMPANY_EMAIL}
            </a>
            <p>© {new Date().getFullYear()} autoro. All rights reserved.</p>
          </span>
        </div>
      </div>
    </footer>
  );
};
