import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Student City Hub</h3>
            <p className="text-gray-300">
              Your one-stop resource for navigating city life as a student.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/accommodation" className="text-gray-300 hover:text-white transition">
                  Accommodation
                </Link>
              </li>
              <li>
                <Link href="/city-tips" className="text-gray-300 hover:text-white transition">
                  City Tips
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">
              Have questions or suggestions?
            </p>
            <a
              href="mailto:info@studentcityhub.com"
              className="text-indigo-400 hover:text-indigo-300 transition"
            >
              info@studentcityhub.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Student City Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
