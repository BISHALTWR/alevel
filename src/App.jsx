import { ThemeProvider } from "./context/ThemeContext";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Tests from "./pages/Tests";
import Contact from "./pages/Contact";
import PdfViewer from "./pages/PdfViewer";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import "./styles/App.css";

function App() {
  return (
    <ThemeProvider>
      {/* Minimum Width Warning Overlay */}
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-[9999] xs:hidden">
        <div className="text-center px-6">
          <HiOutlineDevicePhoneMobile className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Screen Too Small
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please use a device with a larger screen (min-width: 480px).
          </p>
        </div>
      </div>

      {/* Main App Content */}
      <div className="hidden xs:block">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pdf-viewer" element={<PdfViewer />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
