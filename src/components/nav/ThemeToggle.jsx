import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transform-gpu hover:scale-105 transition-all duration-300"
    >
      {isDark ? (
        <HiOutlineSun className="w-6 h-6 text-gray-700 dark:text-white" />
      ) : (
        <HiOutlineMoon className="w-6 h-6 text-gray-700 dark:text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
