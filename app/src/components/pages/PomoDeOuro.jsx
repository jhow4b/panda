import React, { useRef, useState } from "react";
import pomo from "../../img/Pomo_de_Ouro.png";
import styles from "./PomoDeOuro.module.css";

const PomoDeOuro = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const sectionRef = useRef(null)
  
  const handleMouseEnter = () => {
    if (sectionRef.current) {
      const section = sectionRef.current.getBoundingClientRect()
      
      const maxTop = section.height - 70
      const maxLeft = section.width - 70
      
      let randomTop = Math.random() * maxTop 
      let randomLeft = Math.random() * maxLeft 

      randomTop = Math.max(0, Math.min(randomTop, maxTop))
      randomLeft = Math.max(0, Math.min(randomLeft, maxLeft))
      
      setPosition({ top: randomTop, left: randomLeft });
    }
  };

  const handleClick = () => {
    window.alert("Você venceu!");
    setPosition({top: 0, left: 0})
  };

  return (
    <main className={styles.container}>
      <h1>Pegue o Pomo de Ouro</h1>
      <span>Se for capaz...</span>
      <section ref={sectionRef}>
        <img
          src={pomo}
          alt="Pomo"
          onDragStart={(e) => e.preventDefault()}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
            transition: "top 1s ease, left 1s ease",
            userSelect: "none",
            pointerEvents: "auto",
          }}
        />
      </section>
    </main>
  );
};

export default PomoDeOuro;
