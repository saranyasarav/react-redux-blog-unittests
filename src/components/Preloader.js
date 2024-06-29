import React, { useEffect } from "react";
import "../assets/css/style.css";

const Preloader = () => {
  useEffect(() => {
    const handleLoad = () => {
      console.log("Window loaded");
      setTimeout(() => {
        console.log("Hiding preloader");
        const preloader = document.querySelector(".preloader");
        if (preloader) {
          preloader.style.display = "none";
        }
      }, 800);
    };

    // Check if the document is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup the event listener
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="preloader">
      <div className="rounder"></div>
    </div>
  );
};

export default Preloader;
