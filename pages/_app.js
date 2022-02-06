import "../styles/globals.css";
import UserProvider from "../customHooks/userContext";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
