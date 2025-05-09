import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const usePotterdle = () => {
  const [chooseChar, setChooseChar] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const [blur, setBlur] = useState(10);
  const [enableBlur, setEnableBlur] = useState(true);

  const [grayScale, setGrayScale] = useState(100);
  const [enableGrayScale, setEnableGrayScale] = useState(false);

  const [emojis, setEmojis] = useState([])
  const [revealedEmojis, setRevealedEmojis] = useState([])


  const normalizeToArray = (field) => {
    if(Array.isArray(field)) return field
    if(typeof field === "string") {
      return field.split("/").map((s) => s.trim())
    }
    return []
  }

  const fetchRandomCharacter = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "personagens"));
      const charactersData = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          ocupacao: normalizeToArray(data.ocupacao),
          primeira_aparicao: normalizeToArray(data.primeira_aparicao),
        }
      });

      const randomChar =
        charactersData[Math.floor(Math.random() * charactersData.length)];

      setChooseChar(randomChar);
      setEmojis(randomChar.emoji ? [...randomChar.emoji] : [])
      setRevealedEmojis(randomChar.emoji ? [randomChar.emoji[0], ...Array(randomChar.emoji.length - 1).fill("❔")] : [])
    } catch (err) {
      console.error("Erro ao buscar personagens:", err);
    }
  };

  useEffect(() => {
    fetchRandomCharacter();
  }, []);

  useEffect(() => {
    if (!enableBlur) {
      setBlur(10);
    } else {
      setBlur(blur - answers.length);
    }
  }, [enableBlur]);

  const getColor = (inputValue, correctValue, key) => {
    if (!inputValue || !correctValue) return "red";

    if (key === "ocupacao" || key === "primeira_aparicao") {
      const inputArray = Array.isArray(inputValue) ? inputValue : [inputValue]
      const correctArray = Array.isArray(correctValue) ? correctValue : [correctValue]
      
      const normalize = (arr) => arr.map((val) => val.toLowerCase().trim())

      const normInput = normalize(inputArray)
      const normCorrect = normalize(correctArray)

      const allMatch = normInput.every((val) => normCorrect.includes(val))
      const someMatch = normInput.some((val) => normCorrect.includes(val))

      if (allMatch) return "green"
      if (someMatch) return "orange"
      return "red"
    }

    const normInput = String(inputValue).toLowerCase().trim()
    const normCorrect = String(correctValue).toLowerCase().trim()

    if (normInput === normCorrect) return "green";

    if (
      normInput.includes(normCorrect) ||
      normCorrect.includes(normInput)
    ) {
      return "orange";
    }

    return "red";
  };

  const handleCharacterSelect = (character) => {
    if (!chooseChar || gameOver) return;

    const normalizedCharacter = {
      ...character,
      ocupacao: normalizeToArray(character.ocupacao),
      primeira_aparicao: normalizeToArray(character.primeira_aparicao),
    }

    const normalizedChooseCharacter = {
      ...chooseChar,
      ocupacao: normalizeToArray(chooseChar.ocupacao),
      primeira_aparicao: normalizeToArray(chooseChar.primeira_aparicao),
    }

    const newCharacter = {
      ...normalizedCharacter,
      colors: {
        imagem: getColor(normalizedCharacter.imagem, normalizedChooseCharacter.imagem),
        nome: getColor(normalizedCharacter.nome, normalizedChooseCharacter.nome),
        genero: getColor(normalizedCharacter.genero, normalizedChooseCharacter.genero),
        casa: getColor(normalizedCharacter.casa, normalizedChooseCharacter.casa),
        ocupacao: getColor(normalizedCharacter.ocupacao, normalizedChooseCharacter.ocupacao, "ocupacao"),
        especie: getColor(normalizedCharacter.especie, normalizedChooseCharacter.especie),
        patrono: getColor(normalizedCharacter.patrono, normalizedChooseCharacter.patrono),
        primeira_aparicao: getColor(normalizedCharacter.primeira_aparicao, normalizedChooseCharacter.primeira_aparicao, "primeira_aparicao"),
        frase: (normalizedCharacter.frase, normalizedChooseCharacter.frase),
        emoji: (normalizedCharacter.frase, normalizedChooseCharacter.frase),
      },
    };

    if (
      chooseChar &&
      character.nome.toLowerCase() === chooseChar.nome.toLowerCase()
    ) {
      setMessage("Parabéns, voce acertou! 🎉");
      setGameOver(true);

      setBlur(0);

      setGrayScale(0);
      setRevealedEmojis(chooseChar.emoji)
    } else {
      setMessage("Tente novamente...");
      if (enableBlur) {
        setBlur((prev) => Math.max(prev - 1));
      }
    }
    setAnswers((prevAnswers) => [...prevAnswers, newCharacter]);
    setRevealedEmojis((prev) => {
      const nextIndex = prev.findIndex((emoji) => emoji === "❔")
      if (nextIndex === -1) return prev
      const newRevealed = [...prev]
      newRevealed[nextIndex] = emojis[nextIndex]
      return newRevealed
    })
  };

  const restartGame = async () => {
    setAnswers([]);
    setMessage("");
    setGameOver(false);
    fetchRandomCharacter();

    setBlur(10);
    setEnableBlur(true);

    setGrayScale(100);
    setEnableGrayScale(false);
  };

  return {
    chooseChar,
    answers,
    message,
    gameOver,
    handleCharacterSelect,
    restartGame,

    blur,
    setBlur,
    enableBlur,
    setEnableBlur,

    grayScale,
    setGrayScale,
    enableGrayScale,
    setEnableGrayScale,
    revealedEmojis,

  };
};

export default usePotterdle;
