import Head from "next/head";
import Image from "next/image";
import { useUser } from "../customHooks/userContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { loadingUser, user } = useUser();

  return (
    <>
    <div>LOADING: {JSON.stringify(loadingUser)}</div>
      {!loadingUser ? (
        <div>User: {JSON.stringify(user)}</div>
      ) : (
        <div>LOADING...</div>
      )}
    </>
  );
}
