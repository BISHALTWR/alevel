import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentCheck,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const isContactPage = location.pathname === "/contact";

  if (location.pathname === "/") {
    return null;
  }

  return (
    <>
      {/* Mobile Nav - Show on all screens for contact page */}
      <nav
        className={`${!isContactPage ? "md:hidden" : ""} fixed inset-x-0 bottom-0 flex justify-center items-end z-50 bg-white dark:bg-gray-800`}
      >
        <div className="relative flex items-center gap-8 px-6 py-3">
          <Link
            to="/contact"
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
          >
            <HiOutlineEnvelope className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
          <Link
            to="/notes"
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
          >
            <HiOutlineBookOpen className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transform-gpu hover:scale-110 transition-all duration-300"
          >
            <HiOutlineHome className="w-8 h-8 text-gray-700 dark:text-white" />
          </Link>
          <Link
            to="/tests"
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
          >
            <HiOutlineClipboardDocumentCheck className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Desktop Nav - Hide on contact page */}
      {!isContactPage && (
        <nav className="hidden md:flex fixed left-0 bottom-0 w-80 h-24 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="relative flex items-center justify-center gap-8 w-full px-6">
            <Link
              to="/notes"
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
            >
              <HiOutlineBookOpen className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transform-gpu hover:scale-110 transition-all duration-300"
            >
              <HiOutlineHome className="w-8 h-8 text-gray-700 dark:text-white" />
            </Link>
            <Link
              to="/tests"
              className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transform-gpu hover:scale-110 transition-all duration-300"
            >
              <HiOutlineClipboardDocumentCheck className="w-6 h-6 text-gray-700 dark:text-white" />
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
