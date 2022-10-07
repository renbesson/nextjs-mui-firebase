import "../styles/globals.css";
import UserProvider from "../customHooks/userContext";
import NavBar from "../components/NavBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <NavBar />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
