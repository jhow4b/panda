import { Link } from "react-router";

import SearchBar from "../layout/SearchBar";
import CharacterTable from "../layout/CharacterTable";
import CustomButton from "../layout/CustomButton";

import styles from "./PotterdleClassico.module.css";
import usePotterdle from "../hooks/usePotterdle";

const PotterdleFrase = () => {
  const {
    chooseChar,
    answers,
    message,
    gameOver,
    handleCharacterSelect,
    restartGame,
  } = usePotterdle();

  return (
    <main className={styles.container}>
      <section>
        <div>
          {chooseChar && (
            <div className={styles.fraseContainer}>
              <p>{chooseChar.frase}</p>
            </div>
          )}
          <h2>Adivinhe qual é o personagem! </h2>
          {gameOver ? (
            <div className={styles.gameOver}>
              <p>{message}</p>
              <CustomButton text={"Novo Jogo"} onClick={restartGame} />
              <Link to="/pomo_de_ouro">
                <CustomButton text={"Próximo Jogo"}></CustomButton>
              </Link>
            </div>
          ) : (
            <SearchBar onCharacterSelect={handleCharacterSelect} answers={answers} />
          )}
          <CharacterTable answers={answers} columns={["imagem", "nome"]} />
        </div>
      </section>
    </main>
  );
};

export default PotterdleFrase;
