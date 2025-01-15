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
      <div>
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
