import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HiOutlineChevronLeft,
  HiArrowsPointingOut,
  HiArrowsPointingIn,
  HiChevronDown,
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
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

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

  const toggleFullscreen = async () => {
    const pdfViewer = document.getElementById("pdf-viewer");
    
    try {
      // Check if already fullscreen
      if (!document.fullscreenElement && 
          !document.webkitFullscreenElement && 
          !document.mozFullScreenElement) {
        // Request fullscreen with vendor prefixes
        if (pdfViewer.requestFullscreen) {
          await pdfViewer.requestFullscreen();
        } else if (pdfViewer.webkitRequestFullscreen) { // iOS Safari
          await pdfViewer.webkitRequestFullscreen();
        } else if (pdfViewer.mozRequestFullScreen) { // Firefox
          await pdfViewer.mozRequestFullScreen();
        }
      } else {
        // Exit fullscreen with vendor prefixes
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        }
      }
    } catch (err) {
      console.log('Fullscreen not supported:', err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || 
           document.webkitFullscreenElement || 
           document.mozFullScreenElement)
      );
    };
  
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="h-full flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className="p-4 flex items-center justify-between">
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
  >
    <HiOutlineChevronLeft className="w-5 h-5" />
    <span>Back</span>
  </button>
  
  {/* Fullscreen button for mobile */}
<button
  onClick={toggleFullscreen}
  className="fixed top-32 right-6 p-2 rounded-lg bg-black/50 backdrop-blur-xl shadow-lg transition-all duration-200 text-white hover:bg-black/70 z-50"
>
  {isFullscreen ? (
    <HiArrowsPointingIn className="w-5 h-5" />
  ) : (
    <HiArrowsPointingOut className="w-5 h-5" />
  )}
</button>

  <button
    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
    className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
  >
    <span className="font-medium">{subjectTitle}</span>
    <HiChevronDown 
      className={`w-5 h-5 transition-transform duration-300 ${
        isMobileDropdownOpen ? 'rotate-180' : ''
      }`}
    />
  </button>
</div>

          {/* Mobile Dropdown Menu */}
          {isMobileDropdownOpen && (
            <div className="absolute w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-700">
              <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPdf(item.pdfUrl);
                      setIsMobileDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${currentPdf === item.pdfUrl
                        ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 shadow-md"
                        : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"}`}
                  >
                    <span className="font-medium text-left w-full truncate">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex mt-16 md:mt-0">
          {/* Desktop Sidebar */}
          {!isFullscreen && (
            <div className="hidden md:block w-80 h-screen bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              <div className="p-6">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6"
                >
                  <HiOutlineChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>

                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 mb-6">
                  {subjectTitle}
                </h2>

                <nav className="space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPdf(item.pdfUrl)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200
                        ${currentPdf === item.pdfUrl
                          ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"}`}
                    >
                      <span className="font-medium text-left w-full truncate">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 ${isFullscreen ? "w-screen" : ""}`}>
            {/* PDF Viewer */}
            <div id="pdf-viewer" className="h-full relative">
              {currentPdf && (
                <iframe
                  src={currentPdf}
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                />
              )}
              
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="hidden md:block fixed top-16 right-6 p-2 rounded-lg bg-black/50 backdrop-blur-xl shadow-lg transition-all duration-200 text-white hover:bg-black/70 z-50"
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
    </div>
  );
}

export default PdfViewer;