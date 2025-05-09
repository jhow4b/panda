import { useEffect, useState } from "react";
import styles from "./Termooo.module.css";
import InputPalavras from "../layout/InputPalavras";
import palavras from "../../../public/palavras.json";

import foto from "../../img/Panda_1.png";
import Teclado from "../layout/Teclado";

const Termooo = () => {
  const [palavraCorreta, setPalavraCorreta] = useState("");

  useEffect(() => {
    const palavraSorteada =
      palavras[Math.floor(Math.random() * palavras.length)];
    setPalavraCorreta(palavraSorteada.toUpperCase());
  }, []);

  const [guess, setGuess] = useState(Array(palavras[0].length).fill(""));
  const [attempts, setAttempts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [letraStatus, setLetraStatus] = useState({});

  const handleKeyDown = (event) => {
    if (gameOver) return;

    const key = event.key.toUpperCase();
    if (key.match(/^[A-Z]$/) && guess.includes("")) {
      const newGuess = [...guess];
      const emptyIndex = newGuess.indexOf("");
      newGuess[emptyIndex] = key;
      setGuess(newGuess);
    } else if (key === "BACKSPACE") {
      const newGuess = [...guess];
      const lastFilledIndex = newGuess.findLastIndex((letter) => letter !== "");

      if (lastFilledIndex !== -1) {
        newGuess[lastFilledIndex] = "";
        setGuess(newGuess);
      }
    } else if (attempts.length < 6) {
      if (key === "ENTER" && guess.every((letter) => letter !== "")) {
        const newAttempts = [...attempts, guess];
        setAttempts(newAttempts);

        const newLetraStatus = { ...letraStatus };

        guess.forEach((letra, i) => {
          if (palavraCorreta[i] === letra) {
            newLetraStatus[letra] = "green";
          } else if (
            palavraCorreta.includes(letra) &&
            newLetraStatus[letra] !== "green"
          ) {
            newLetraStatus[letra] = "orange";
          } else if (!palavraCorreta.includes(letra)) {
            newLetraStatus[letra] = "black";
          }
        });

        setLetraStatus(newLetraStatus)

        if (guess.join("") === palavraCorreta) {
          setGameOver(true);
          setGameOverMessage("ACERTOU!");
        } else if (newAttempts.length === 6) {
          setGameOver(true);
          setGameOverMessage(`ERROU! A resposta era ${palavraCorreta}`);
        }

        setGuess(Array(palavraCorreta.length).fill(""));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guess, gameOver]);

  useEffect(() => {
    setLetraStatus((prevStatus) => {
      const newLetraStatus = {...prevStatus}

      attempts.forEach((tentativa) => {
        tentativa.forEach((letra, i) => {
          if (palavraCorreta[i] === letra) {
            newLetraStatus[letra] = "green";
          } else if (
            palavraCorreta.includes(letra) &&
            newLetraStatus[letra] !== "green"
          ) {
            newLetraStatus[letra] = "orange";
          } else if (!palavraCorreta.includes(letra)) {
            newLetraStatus[letra] = "black";
          } 
        })
      })
      return newLetraStatus
    })
  }, [attempts, palavraCorreta])

  return (
    <main className={styles.container}>
      <section>
        <div>
          <img src={foto} />
          <div className={styles.sombra}></div>
          <h1>Termo</h1>
        </div>
        <table>
          <tbody>
            {new Array(6).fill(0).map((_, index) => (
              <InputPalavras
                key={index}
                tentativa={
                  attempts[index] ||
                  (index === attempts.length ? guess : Array(6).fill(""))
                }
                resposta={palavraCorreta}
                isColored={index < attempts.length}
              />
            ))}
          </tbody>
        </table>
          <Teclado letraStatus={letraStatus} onKeyPress={handleKeyDown} />
        {gameOver && (
          <div className={styles.gameOverMessage}>
            <p>{gameOverMessage}</p>
            <button onClick={() => window.location.reload()}>
              Jogar Novamente
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Termooo;
