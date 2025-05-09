import { Link } from "react-router";
import logo from "../../img/icon.png";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src={logo} />
      </Link>
      <ul>
        <li>
          <Link to="/">Term.ooo</Link>
        </li>
        <li>
          <Link to="/potterdle">Potterdle</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
