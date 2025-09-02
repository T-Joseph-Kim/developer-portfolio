import React from "react";
import LiquidGlass from 'liquid-glass-react'
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
      className="px-6 py-3 text-lg font-medium text-white"
    style={{
        fontFamily:
          '"Red Hat Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
      onClick={() => {
        // auto-download your resume file
      }}
    >
      <span>Download My Resume</span>
      <Download className="w-4 h-4" />
    </LiquidGlass>
  );
};

export default ResumeButton;
