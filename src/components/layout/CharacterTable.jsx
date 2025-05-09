import styles from "../layout/CharacterTable.module.css";

const CharacterTable = ({ answers, columns }) => {
  const columnConfig = {
    imagem: "Imagem",
    nome: "Nome",
    genero: "Gênero",
    casa: "Casa",
    ocupacao: "Ocupação",
    especie: "Espécie",
    patrono: "Patrono",
    primeira_aparicao: "Primeira Aparição",
  };

  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <table className={styles.personagens}>
      <tbody>
        {answers.length > 0 && (
          <tr>
            {columns.map((col) => (
              <th key={col}>{columnConfig[col]}</th>
            ))}
          </tr>
        )}
        {answers.length > 0 &&
          answers.map((char) => (
            <tr key={char.id}>
              {columns.includes("imagem") && (
                <td>
                  <img
                    src={char.imagem}
                    alt={char.nome}
                    style={{ backgroundColor: char.colors.imagem }}
                  />
                </td>
              )}
              {columns.includes("nome") && (
                <td style={{ backgroundColor: char.colors.nome }}>
                  {capitalizeName(char.nome)}
                </td>
              )}
              {columns.includes("genero") && (
                <td style={{ backgroundColor: char.colors.genero }}>
                  {char.genero}
                </td>
              )}
              {columns.includes("casa") && (
                <td style={{ backgroundColor: char.colors.casa }}>
                  {char.casa}
                </td>
              )}
              {columns.includes("ocupacao") && (
                <td style={{ backgroundColor: char.colors.ocupacao }}>
                  {Array.isArray(char.ocupacao)
                    ? char.ocupacao.join(" / ")
                    : char.ocupacao}
                </td>
              )}
              {columns.includes("especie") && (
                <td style={{ backgroundColor: char.colors.especie }}>
                  {char.especie}
                </td>
              )}
              {columns.includes("patrono") && (
                <td style={{ backgroundColor: char.colors.patrono }}>
                  {char.patrono}
                </td>
              )}
              {columns.includes("primeira_aparicao") && (
                <td style={{ backgroundColor: char.colors.primeira_aparicao }}>
                  {Array.isArray(char.primeira_aparicao)
                    ? char.primeira_aparicao.join(" / ")
                    : char.primeira_aparicao}
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CharacterTable;
