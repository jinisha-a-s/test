import React from "react";
import "../styles/Components/Spinner.css"; // ✅ we'll add basic styling

export default function Spinner() {
  return (
    <div className="spinner" role="status" data-testid="loading-spinner">
      <div className="spinner-circle"></div>
      <span className="sr-only">Loading...</span> {/* accessibility */}
    </div>
  );
}
