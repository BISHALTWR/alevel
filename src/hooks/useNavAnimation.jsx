import { useCallback, useRef, useState } from "react";

export const useNavAnimation = () => {
  const navRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!navRef.current) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    ["notesBtn", "testsBtn", "contactBtn"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.setAttribute("data-leaving", "true");
      }
    });

    // Set a timeout to remove the data-leaving attribute
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      ["notesBtn", "testsBtn", "contactBtn"].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn) {
          btn.removeAttribute("data-leaving");
        }
      });
    }, 600); // Match animation duration
  }, []);

  return { navRef, handleMouseEnter, handleMouseLeave, isHovered };
};
