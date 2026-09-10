import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Module-level: persists across route changes for this page load, resets on
// a hard refresh. Tracks whether the user has actually navigated inside the
// app yet, so the button doesn't show up with nowhere real to go back to.
let hasNavigatedInApp = false;

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(hasNavigatedInApp);

  useEffect(() => {
    if (hasNavigatedInApp) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- deriving "has real in-app history" from route changes, not a render-time computation
      setCanGoBack(true);
    }
    hasNavigatedInApp = true;
  }, [location]);

  if (location.pathname === "/" || !canGoBack) return null;

  return (
    <button
      onClick={() => navigate(-1)}
      className="back-button"
      aria-label="Go back"
    >
      <i className="fa fa-arrow-left" aria-hidden="true" />
    </button>
  );
};

export default BackButton;
