import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./SearchBar.module.css";

const capitalizeName = (name) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SearchBar = ({ onCharacterSelect, answers }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const allCharactersCache = useRef([])

  useEffect(() => {
    const fetchCharacters = async () => {
      if (allCharactersCache.current.length > 0) return

      const charactersRef = collection(db, "personagens");
      const snapshot = await getDocs(charactersRef);
      const characters = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      allCharactersCache.current = characters.map((char) => ({
        ...char,
        nomeLower: char.nome.toLowerCase(),
      }))
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    if (search.length < 1) {
      setResults([])
      return
    }

    const searchLower = search.toLowerCase()

    const filtered = allCharactersCache.current
      .filter((char) => char.nomeLower.includes(searchLower))
      .filter((char) => !answers.some((a) => a.nome.toLowerCase() === char.nomeLower))

    setResults(filtered)
  }, [search, answers])

  const handleClick = (character) => {
    onCharacterSelect(character);
    setSearch("");
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Pesquisar personagem..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={styles.pesquisar}>
        {results.map((char) => (
          <li key={char.id} onClick={() => handleClick(char)}>
            <img src={char.imagem} alt={char.nome} />
            {capitalizeName(char.nome)}
          </li>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
