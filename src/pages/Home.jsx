import { useNavigate } from "react-router-dom";
import {
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentCheck,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import ThemeToggle from "../components/nav/ThemeToggle";

function Home() {
  const navigate = useNavigate();

  const navItems = [
    {
      title: "Study Notes",
      desc: "Access comprehensive study materials covering all major topics",
      cta: "Browse Notes →",
      path: "/notes",
      color: "blue",
      icon: HiOutlineBookOpen,
      hoverBg: "from-blue-500/5 to-blue-500/0",
      hoverBorder: "border-blue-200/50 dark:border-blue-800/50",
      iconBg: "bg-blue-500/10 dark:bg-blue-400/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Practice Tests",
      desc: "Test your knowledge with our practice exams and quizzes",
      cta: "Start Testing →",
      path: "/tests",
      color: "green",
      icon: HiOutlineClipboardDocumentCheck,
      hoverBg: "from-green-500/5 to-green-500/0",
      hoverBorder: "border-green-200/50 dark:border-green-800/50",
      iconBg: "bg-green-500/10 dark:bg-green-400/10",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Get in Touch",
      desc: "Want to contribute or have suggestions? Reach out to me.",
      cta: "Contact →",
      path: "/contact",
      color: "purple",
      icon: HiOutlineEnvelope,
      hoverBg: "from-purple-500/5 to-purple-500/0",
      hoverBorder: "border-purple-200/50 dark:border-purple-800/50",
      iconBg: "bg-purple-500/10 dark:bg-purple-400/10",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Hero Section with Circle Background */}
      <div className="relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600">
              A Level Notes
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let's do this!!
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards in Triangle Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="group relative rounded-2xl p-6 sm:p-8 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Default Background */}
              <div
                className="absolute inset-0 rounded-2xl bg-white dark:bg-gray-800 
                           border border-gray-200 dark:border-gray-700"
              ></div>

              {/* Hover Background */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.hoverBg}
                           border ${item.hoverBorder} opacity-0 group-hover:opacity-100 
                           transition-opacity duration-300`}
              ></div>

              <div className="relative flex flex-col items-center text-center gap-4">
                <div
                  className={`p-4 rounded-xl ${item.iconBg} transform-gpu group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`w-8 h-8 ${item.iconColor}`} />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                  <p
                    className={`mt-4 ${item.iconColor} font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    {item.cta}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
