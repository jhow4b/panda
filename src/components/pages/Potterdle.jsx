import { Link } from "react-router";
import styles from "./Potterdle.module.css";

import hp from "../../img/hp.png";
import wand from "../../img/wand.png";
import reliquia from "../../img/reliquia.png";
import plataforma from "../../img/plataforma.png";
import hogwarts from "../../img/hogwarts.png";
import pomo from "../../img/pomo.png"

const Potterdle = () => {
  return (
    <main className={styles.container}>
      <section>
        <h1>Harry Potter</h1>
        <h2>Adivinhe os personagens de Harry Potter</h2>
        <ul className={styles.lista}>
          <li>
            <Link to="/potterdle_classico">
              <img src={hp} alt="Clássico" />
              Clássico<span>Consiga pistas a cada tentativa</span>
            </Link>
          </li>
          <li>
            <Link to="/potterdle_imagem">
              <img src={reliquia} alt="Imagem" />
              Imagem<span>Adivinhe com uma imagem</span>
            </Link>
          </li>
          <li>
            <Link to="/potterdle_emoji">
              <img src={plataforma} alt="Emoji" />
              Emoji<span>Adivinhe com emojis</span>
            </Link>
          </li>
          <li>
            <Link to="/potterdle_frase">
              <img src={hogwarts} alt="Frase" />
              Frase<span>Adivinhe com frases famosas</span>
            </Link>
          </li>
          <li>
            <Link to="/pomo_de_ouro">
              <img src={pomo} alt="Pomo" />
              Pomo de Ouro<span>Capture o Pomo de Ouro</span>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Potterdle;
