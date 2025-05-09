import sytles from "./CustomButton.module.css";

const CustomButton = ({text, onClick}) => {
  return <button className={sytles.customButton} onClick={onClick}>{text}</button>;
};

export default CustomButton;
