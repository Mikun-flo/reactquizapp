import SVGIcon from "./SVGIcon.jsx";
export default function Header({
  currentSubject,
  view,
  onGoBack,
  theme,
  onThemeToggle,
}) {
  return (
    <header className="app-header">
      {/* Left side: Back Button & Active Subject Badge */}
      <div className="header-left-container" aria-live="polite">
        {view !== "selection" && (
          <button
            onClick={onGoBack}
            className="btn-back"
            aria-label="Go back to subject selection"
            type="button"
          >
            <SVGIcon name="back" className="back-icon" />
            <span>back</span>
          </button>
        )}
        {currentSubject && (
          <div className="active-subject">
            <div className={`icon-badge ${currentSubject.icon}`}>
              <SVGIcon name={currentSubject.icon} />
            </div>
            <span>{currentSubject.title}</span>
          </div>
        )}
      </div>
      {/* Right side: Theme Switcher */}
      <div className="theme-toggle-container">
        <SVGIcon
          name="sun"
          className="theme-icon sun-icon"
          aria-hidden="true"
        />

        <label className="switch" htmlFor="theme-toggle">
          <input
            type="checkbox"
            id="theme-toggle"
            checked={theme === "dark"}
            onChange={onThemeToggle}
            aria-label="Toggle dark theme"
          />
          <span className="slider round"></span>
        </label>
        <SVGIcon
          name="moon"
          className="theme-icon moon-icon"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
