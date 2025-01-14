import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiArrowsPointingOut,
  HiArrowsPointingIn,
} from "react-icons/hi2";
import notesList from "../data/notes-list.json";
import testsList from "../data/tests-list.json";

function PdfViewer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPdf, setCurrentPdf] = useState(null);
  const [sidebarItems, setSidebarItems] = useState([]);
  const [subjectTitle, setSubjectTitle] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const { pdfUrl, type, subject } = location.state || {};

    if (!pdfUrl) {
      navigate("/");
      return;
    }

    setCurrentPdf(pdfUrl);

    const list = type === "notes" ? notesList : testsList;
    const items = list[subject]?.[type] || [];
    setSidebarItems(items);
    setSubjectTitle(list[subject]?.subject || "");
  }, [location, navigate]);

  const toggleFullscreen = () => {
    const pdfViewer = document.getElementById("pdf-viewer");
    if (!document.fullscreenElement) {
      pdfViewer.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="h-full flex">
        {/* Sidebar - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="w-80 h-[calc(100vh-6rem)] bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-6">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6"
              >
                <HiOutlineChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>

              {/* Subject Title */}
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 mb-6">
                {subjectTitle}
              </h2>

              {/* List of PDFs */}
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPdf(item.pdfUrl)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200
        ${
          currentPdf === item.pdfUrl
            ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 shadow-md"
            : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"
        }`}
                    title={item.title}
                  >
                    <span className="font-medium text-left w-full truncate group-hover:text-clip">
                      {item.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* PDF Viewer Section */}
        <div
          className={`flex-1 h-full flex flex-col ${isFullscreen ? "w-screen" : ""}`}
        >
          {/* PDF Content */}
          <div id="pdf-viewer" className="flex-1 relative">
            {currentPdf && (
              <iframe
                src={currentPdf}
                className="w-full h-full border-0"
                title="PDF Viewer"
              />
            )}
            {/* Floating Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="fixed top-16 right-6 p-2 rounded-lg bg-black/50 backdrop-blur-xl shadow-lg transition-all duration-200 text-white hover:bg-black/70 z-50"
              title={
                isFullscreen
                  ? "Exit Fullscreen (F11)"
                  : "Enter Fullscreen (F11)"
              }
            >
              {isFullscreen ? (
                <HiArrowsPointingIn className="w-5 h-5" />
              ) : (
                <HiArrowsPointingOut className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfViewer;
