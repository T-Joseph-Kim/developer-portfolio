import React from "react";
import LiquidGlass from "liquid-glass-react";
import { Download } from "lucide-react";

const ResumeButton: React.FC = () => {
  return (
    <LiquidGlass
      displacementScale={64}
      blurAmount={0.1}
      saturation={130}
      aberrationIntensity={2}
      elasticity={0.35}
      cornerRadius={100}
      style={{ display: "inline-block" }} // keep it constrained
    >
      <button
        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white cursor-pointer"
        style={{
          fontFamily:
            '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/resume.pdf"; // put resume.pdf in /public
          link.download = "TJosephKim_Resume.pdf";
          link.click();
        }}
      >
        <span>Resume</span>
        <Download className="w-5 h-5" />
      </button>
    </LiquidGlass>
  );
};

export default ResumeButton;
