import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import UserDetails from "../Components/UserDetails";
import styles from "../styles/Home.module.css";
import { settingsUpdateLang } from "../store/actions/user/settings";
import { userUpdate, userReset } from "../store/actions/user";

export default function Home() {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.settings);
  const { id, fullName } = useSelector((state) => state.user);
  const isLoggedIn = id !== null;

  const handleSwitchLang = () => {
    const newLang = language === "pt-br" ? "en" : "pt-br";
    dispatch(settingsUpdateLang(newLang));
  };

  const handleLogin = () => {
    const firstNames = ["John", "Mary", "Natalie", "Max", "Ammy"];
    const lastNames = ["Doe", "Poppins", "Romanoff", "Steel", "Winehouse"];
    dispatch(
      userUpdate({
        id: Math.floor(Math.random() * 31),
        firstName: firstNames[Math.floor(Math.random() * 5)],
        lastName: lastNames[Math.floor(Math.random() * 5)],
      })
    );
  };

  const handleLogout = () => {
    dispatch(userReset());
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Project: NextJs + Redux + Saga</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Project: NextJs + Redux + Saga</h1>

        <p className={styles.description}>
          <a href="https://bit.ly/35e8aN3" target="_blank">
            Click here to check the tutorial
          </a>
        </p>

        <section className={styles.userDetails}>
          <UserDetails
            id={id}
            language={language}
            name={fullName}
            isLoggedIn={isLoggedIn}
            onSwitchLanguage={handleSwitchLang}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </section>

        <section className={styles.grid}>
          <article className={styles.card}>
            <h3>Post title 1</h3>
            <p>Description here</p>
          </article>

          <article className={styles.card}>
            <h3>Post title 2</h3>
            <p>Description here</p>
          </article>

          <article className={styles.card}>
            <h3>Post title 3</h3>
            <p>Description here</p>
          </article>

          <article className={styles.card}>
            <h3>Post title 4</h3>
            <p>Description here</p>
          </article>
        </section>
      </main>

      <footer className={styles.footer}>
        <a href="https://bit.ly/3o4zbLq" target="_blank">
          Created by
          <img src="/logo.png" alt="Jullymac Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
