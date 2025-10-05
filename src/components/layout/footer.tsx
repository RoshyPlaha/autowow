import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-[#0a226c] text-white">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Logo Column */}
                    <div className="flex items-center justify-center md:justify-start">
                        <Image
                            src="/assets/capsules-logo-white.png"
                            alt="Capsules"
                            width={150}
                            height={150}
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Product Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Useful Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">More about Capsules</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="hover:text-white">About</Link></li>
                            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Use Cases Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Use Cases</h3>
                        <ul className="space-y-2">
                            <li><Link href="/create/hobby" className="hover:text-white">Hobby</Link></li>
                            <li><Link href="/create/video-diary" className="hover:text-white">Video Diary</Link></li>
                            <li><Link href="/create/sharing" className="hover:text-white">Sharing Time Capsules</Link></li>
                            <li><Link href="/create/reflection" className="hover:text-white">Reflection</Link></li>
                            <li><Link href="/create/goal-setting" className="hover:text-white">Goal Setting</Link></li>
                            <li><Link href="/create/life-story" className="hover:text-white">Life Story</Link></li>
                        </ul>
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

