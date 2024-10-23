import * as React from "react";

function SpacerImage(props) {
  //This component returns a transparent image.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="empty-circle_svg__bi"
      viewBox="0 0 16 16"
      {...props}
    >
      {/* No visible content */}
    </svg>
  );
}

export default SpacerImage;

