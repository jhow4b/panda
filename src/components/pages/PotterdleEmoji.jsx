import { Link } from "react-router";

import SearchBar from "../layout/SearchBar";
import CharacterTable from "../layout/CharacterTable";
import CustomButton from "../layout/CustomButton";

import styles from "./PotterdleClassico.module.css";
import usePotterdle from "../hooks/usePotterdle";

const PotterdleEmoji = () => {
  const { chooseChar, answers, message, gameOver, handleCharacterSelect, restartGame, revealedEmojis } =
    usePotterdle();

  return (
    <main className={styles.container}>
      <section>
        {chooseChar && (
          <div className={styles.emojiContainer}>
            <h1>{revealedEmojis.map((emoji, index) => (
              <span key={index}>{emoji}</span>
            ))}</h1>
          </div>
        )}
        <div>
          <h2>Adivinhe qual é o personagem! </h2>
          {gameOver ? (
            <div className={styles.gameOver}>
              <p>{message}</p>
              <CustomButton text={"Novo Jogo"} onClick={restartGame} />
              <Link to="/potterdle_frase">
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

export default PotterdleEmoji;
