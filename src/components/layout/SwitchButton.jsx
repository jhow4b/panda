import styles from "./SwitchButton.module.css";

const SwitchButton = ({ enableOption, checkOption, spanText }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.switchButton} ${
          enableOption ? styles.ativado : ""
        }`}
        onClick={checkOption}
      >
        <div className={styles.bola}></div>
      </button>
      <span>{spanText}</span>
    </div>
  );
};

export default SwitchButton;
