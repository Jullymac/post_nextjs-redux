import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
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
          <p>
            <strong>ID:</strong> Id here
          </p>
          <p>
            <strong>Name:</strong> Name here
          </p>
          <p>
            <strong>Lang:</strong> Lang here
          </p>
          <button type="button">Login</button>
          <button type="button">Logout</button>
          <button type="button">Switch lang</button>
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
