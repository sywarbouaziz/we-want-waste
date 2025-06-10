import { ThemeProvider } from "./context/ThemeContext";
import SkipSelectorPage from "./pages/SkipSelectorPage/SkipSelectorPage";
import "./styles/theme.css";

function App() {
  const location = { postcode: "NR32", town: "Lowestoft" }; 
  return (
    <ThemeProvider>
      <SkipSelectorPage initialLocation={location} />
    </ThemeProvider>
  );
}

export default App;
