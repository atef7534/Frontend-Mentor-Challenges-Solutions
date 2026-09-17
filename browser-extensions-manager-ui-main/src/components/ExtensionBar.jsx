import darkLogo from "../assets/images/logo.svg";
import lightLogo from "../assets/images/logo-2.svg";

export default function ExtensionBar({ mode, setMode }) {
  function handleMode() {
    setMode((prevValue) => {
      return prevValue === "dark" ? "light" : "dark";
    });
  }

  return (
    <nav
      className={`d-flex-between-center ${
        mode === "dark" ? "light-mode" : "dark-mode"
      }`}
    >
      <img src={mode === "dark" ? lightLogo : darkLogo} alt="Extensions logo" />

      <button
        className={`mode ${mode}`}
        onClick={handleMode}
        aria-label="Toggle color mode"
      ></button>
    </nav>
  );
}
