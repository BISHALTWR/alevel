import {
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentCheck,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import { useNavAnimation } from "../../hooks/useNavAnimation";
import ThemeToggle from "./ThemeToggle";
import "../../styles/NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { navRef, handleMouseLeave, handleMouseEnter } = useNavAnimation();

  return (
    <>
      {/* Mobile Nav */}
      <nav className="md:hidden fixed inset-x-0 bottom-0 flex justify-center items-end z-50">
        <div className="relative flex items-center gap-8 px-6 py-3">
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

      {/* Desktop Nav */}
      <nav
        ref={navRef}
        className="hidden md:block fixed -left-12 top-1/2 -translate-y-1/2 z-50 group"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <svg
          className="fixed left-4 top-1/2 -translate-y-1/2 w-[300px] h-[300px] z-[100] pointer-events-none"
          viewBox="0 0 300 300"
          style={{ fill: "transparent" }}
        >
          <circle
            cx="20"
            cy="150"
            r="144"
            fill="none"
            stroke="#e6f3ff"
            strokeWidth="2"
            className="text-gray-200 dark:text-gray-700"
          />
        </svg>

        <div
          id="homeBtn"
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[200]"
        >
          <Link
            to="/"
            className="flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 rounded-full shadow-lg transform-gpu hover:scale-[1.2] transition-transform duration-300 ease-in-out"
          >
            <HiOutlineHome className="w-8 h-8 text-gray-700 dark:text-white ml-8" />
          </Link>
        </div>

        <div
          id="notesBtn"
          className="fixed left-[calc(16px)] top-[calc(50%)] -translate-y-1/2 nav-btn z-[200]"
        >
          <Link
            to="/notes"
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg transform-gpu hover:scale-[1.2] transition-transform duration-300 ease-in-out"
          >
            <HiOutlineBookOpen className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
        </div>

        <div
          id="testsBtn"
          className="fixed left-0 top-1/2 -translate-y-1/2 nav-btn z-[200]"
        >
          <Link
            to="/tests"
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg transform-gpu hover:scale-[1.2] transition-transform duration-300 ease-in-out"
          >
            <HiOutlineClipboardDocumentCheck className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
        </div>

        <div
          id="contactBtn"
          className="fixed left-[calc(16px)] top-[calc(50%)] -translate-y-1/2 nav-btn z-[200]"
        >
          <Link
            to="/contact"
            className="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg transform-gpu hover:scale-[1.2] transition-transform duration-300 ease-in-out"
          >
            <HiOutlineEnvelope className="w-6 h-6 text-gray-700 dark:text-white" />
          </Link>
        </div>
      </nav>

      {/* Theme Toggle for Desktop */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </>
  );
};

export default NavBar;
