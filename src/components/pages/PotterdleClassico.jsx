import { Link } from "react-router";

import SearchBar from "../layout/SearchBar";
import CharacterTable from "../layout/CharacterTable";
import CustomButton from "../layout/CustomButton";

import styles from "./PotterdleClassico.module.css";
import usePotterdle from "../hooks/usePotterdle";

const PotterdleClassico = () => {
  const { answers, message, gameOver, handleCharacterSelect, restartGame } =
    usePotterdle();

  return (
    <main className={styles.container}>
      <section>
        <div>
          <h2>Adivinhe qual é o personagem! </h2>
          {gameOver ? (
            <div className={styles.gameOver}>
              <p>{message}</p>
              <CustomButton text={"Novo Jogo"} onClick={restartGame} />
              <Link to="/potterdle_imagem">
                <CustomButton text={"Próximo Jogo"}></CustomButton>
              </Link>
            </div>
          ) : (
            <SearchBar onCharacterSelect={handleCharacterSelect} answers={answers} />
          )}
          <CharacterTable
            answers={answers}
            columns={[
              "imagem",
              "genero",
              "casa",
              "ocupacao",
              "especie",
              "patrono",
              "primeira_aparicao",
            ]}
          />
        </div>
      </section>
    </main>
  );
};

export default PotterdleClassico;
