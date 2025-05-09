import React from "react";
//@ts-ignore
import styles from "../pages/Termooo.module.css";

const InputPalavras = ({ tentativa = "", resposta = "", isColored = false }) => {
  return (
    <tr>
      {new Array(5).fill(0).map((_, i) => {
        let bgColor = "";
        if (isColored) {
          if (tentativa[i] === resposta[i]) {
            bgColor = styles.letraCorreta;
          } else if (resposta.includes(tentativa[i])) {
            bgColor = styles.temLetra;
          }
        else {
          bgColor = styles.black
        }
        }

        return (
          <td key={i} className={bgColor}>
            {tentativa[i]}
          </td>
        );
      })}
    </tr>
  );
};

export default InputPalavras;
