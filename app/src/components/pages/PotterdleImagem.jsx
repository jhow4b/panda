import SearchBar from "../layout/SearchBar";
import usePotterdle from "../hooks/usePotterdle";
import CharacterTable from "../layout/CharacterTable";
import CustomButton from "../layout/CustomButton";
import styles from "./PotterdleClassico.module.css";
import { Link } from "react-router";
import SwitchButton from "../layout/SwitchButton";

const PotterdleImagem = () => {
  const {
    chooseChar,
    answers,
    message,
    gameOver,
    handleCharacterSelect,
    restartGame,

    blur,
    enableBlur,
    setEnableBlur,

    grayScale,
    setGrayScale,
    enableGrayScale,
    setEnableGrayScale,
  } = usePotterdle();

  const grayScaleSettings = () => {
    if (!enableGrayScale) {
      setEnableGrayScale(true);
      setGrayScale(0);
    } else {
      setEnableGrayScale(false);
      setGrayScale(100);
    }
  };

  return (
    <div>
      <main className={styles.container}>
        <section>
          <div>
            {chooseChar && (
              <div className={styles.guessImg}>
                <img
                  src={chooseChar.imagem}
                  alt={chooseChar.nome}
                  style={{
                    filter: `blur(${blur}px) grayscale(${grayScale}%)`,
                    transition: "filter .3s ease-in-out",
                  }}
                />
              </div>
            )}
            <div className={styles.switchButtonContainer}>
              <SwitchButton
                enableOption={enableBlur}
                checkOption={() => setEnableBlur(!enableBlur)}
                spanText={"Cada tentativa desfoca um pouco a imagem"}
              />
              <SwitchButton
                enableOption={enableGrayScale}
                checkOption={grayScaleSettings}
                spanText={"Habilitar cores"}
              />
            </div>
            <h2>Adivinhe qual é o personagem! </h2>
            {gameOver ? (
              <div className={styles.gameOver}>
                <p>{message}</p>
                <CustomButton text={"Novo Jogo"} onClick={restartGame} />
                <Link to="/potterdle_emoji">
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
    </div>
  );
};

export default PotterdleImagem;
