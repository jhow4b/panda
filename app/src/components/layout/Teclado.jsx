import React from "react";
import styles from "./Teclado.module.css";

const Teclado = ({ letraStatus, onKeyPress }) => {
  const letras = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
  return (
    <div className={styles.container}>
      {letras.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.teclado}>
          {row.split("").map((key) => {
            const cor = letraStatus[key.toUpperCase()] || "default";
            return (
              <div
                key={key}
                className={`${styles.tecla} ${styles[cor] || styles.default}`}
                onClick={() => onKeyPress({ key: key.toUpperCase() })}
              >
                {key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}

      <div className={styles.teclado}>
        <button className={styles.specialKey} onClick={() => onKeyPress({key: "BACKSPACE"})}>⌫</button>
        <button className={styles.specialKey} onClick={() => onKeyPress({key: "ENTER"})}>⏎</button>
      </div>

    </div>
  );
};

export default Teclado;
