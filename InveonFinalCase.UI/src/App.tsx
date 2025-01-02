import "./App.css";
import { ThemeProvider } from "./context/theme-provider";

interface AppProps {
  children: React.ReactNode;
}

function App({children}: AppProps) {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </>
  );
}

export default App;
