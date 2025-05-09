import styles from "./Home.module.css";

function Home() {
  return (
    <main className={styles.container}>
        <section>
          <h1>Bem vindo!</h1>
          <div>
            <h2>Introdução</h2>
            <p>Este site foi criado para estudos e também como um presente para alguém muito especial para mim.</p>
            <p>Um site de diversos tipos de jogos.</p>
          </div>
          <div>
            <h2>Tecnologias</h2>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>React Router Dom</li>
              <li>JSON</li>
              <li>Firebase</li>
            </ul>
          </div>
        </section>
    </main>
  );
}

export default Home;
