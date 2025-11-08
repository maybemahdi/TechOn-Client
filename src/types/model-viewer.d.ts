import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        "auto-rotate"?: boolean | string;
        "camera-controls"?: boolean | string;
        "rotation-per-second"?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        "environment-image"?: string;
        "shadow-intensity"?: string;
        style?: React.CSSProperties | string;
      };
    }
  }
}
