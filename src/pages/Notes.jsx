import { useState, useEffect, useRef } from "react";
import {
  HiOutlineBookOpen,
  HiChevronDown,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import notesList from "../data/notes-list.json";
import subjects from "../data/subjects.json";

function Notes() {
  const DEFAULT_SUBJECT = "computer";
  const STORAGE_KEY = "selectedSubject";
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [activeSubject, setActiveSubject] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || DEFAULT_SUBJECT;
  });
  const [activeComponent, setActiveComponent] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredNotes = activeSubject
    ? notesList[activeSubject].notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (activeComponent === "all" || note.component === activeComponent),
      )
    : [];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeSubject);
  }, [activeSubject]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubjectSelect = (key) => {
    setActiveSubject(key);
    setIsDropdownOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleNoteClick = (note) => {
    if (isMobile) {
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = note.pdfUrl;
      link.download = note.title + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      navigate("/pdf-viewer", {
        state: {
          pdfUrl: note.pdfUrl,
          type: "notes",
          subject: activeSubject,
        },
      });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Circle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl" />
        </div>
      </div>

      {/* Mobile Subject Dropdown */}
      <div className="md:hidden w-full px-6 pt-6 z-50">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-blue-100 dark:border-gray-700"
        >
          <span className="text-gray-700 dark:text-gray-300">
            {activeSubject
              ? notesList[activeSubject].subject
              : "Select Subject"}
          </span>
          <HiChevronDown
            className={`w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform ${
              isDropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-20 left-6 right-6 z-50 py-2 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-blue-100 dark:border-gray-700">
            {Object.entries(notesList).map(([key, subject]) => (
              <button
                key={key}
                onClick={() => handleSubjectSelect(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200
                         ${
                           activeSubject === key
                             ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400"
                             : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"
                         }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    activeSubject === key
                      ? "text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={subjects[key]?.icon}
                  />
                </svg>
                <span className="font-medium">{subject.subject}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="h-full flex">
        {/* Sidebar */}
        <div className="w-80 fixed inset-y-0 left-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-r border-blue-100 dark:border-gray-700 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-600 mb-8">
                Notes
              </h2>
              <nav className="space-y-2">
                {Object.entries(notesList).map(([key, subject]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSubject(key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all duration-200
                             ${
                               activeSubject === key
                                 ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 shadow-md"
                                 : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"
                             }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        activeSubject === key
                          ? "text-blue-600 dark:text-blue-400"
                          : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={subjects[key]?.icon}
                      />
                    </svg>
                    <span className="font-medium">{subject.subject}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-80">
          <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-6">
              {activeSubject ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    {/* Filter buttons on left */}
                    <div className="flex gap-3">
                      {["all", "AS", "A2"].map((component) => (
                        <button
                          key={component}
                          onClick={() => setActiveComponent(component)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
                            ${
                              activeComponent === component
                                ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 shadow-md"
                                : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"
                            }`}
                        >
                          {component === "all" ? "All" : component}
                        </button>
                      ))}
                    </div>

                    {/* Search on right */}
                    <div
                      ref={searchContainerRef}
                      className="hidden md:flex items-center relative"
                    >
                      <div
                        className={`absolute right-12 transition-all duration-300 ${
                          isSearchVisible
                            ? "w-48 opacity-100 visible"
                            : "w-0 opacity-0 invisible"
                        }`}
                      >
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search notes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl text-gray-700 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={toggleSearch}
                        className={`p-2 rounded-lg transition-all duration-200 ml-3
                          ${
                            isSearchVisible
                              ? "bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400"
                              : "text-gray-700 dark:text-gray-300 hover:bg-blue-500/5 dark:hover:bg-blue-400/5"
                          }`}
                      >
                        <HiMagnifyingGlass className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile Search Input */}
                    <div className="md:hidden w-full">
                      <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl text-gray-700 dark:text-gray-300 focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20 dark:focus:ring-blue-500/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => handleNoteClick(note)}
                        className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-blue-100 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-800/80 cursor-pointer transition-all duration-200 transform hover:scale-105"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {note.title}
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                          {note.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center mx-auto transform-gpu hover:scale-110 transition-transform duration-300">
                      <HiOutlineBookOpen className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      Select a subject to view notes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notes;
