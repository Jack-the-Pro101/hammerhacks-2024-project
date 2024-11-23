import PointsManager from "../../classes/PointsManager";

import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav class={styles.navbar}>
      <ul>
        <li>Points: {PointsManager.points()}</li>
      </ul>
    </nav>
  );
}
