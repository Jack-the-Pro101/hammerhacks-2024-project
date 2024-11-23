import { useNavigate } from "@solidjs/router";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  let select: HTMLSelectElement;

  return (
    <main class={styles.main}>
      <div class={styles.mainTitle}>
        <div class={styles.logoImage}>
          <img src="/src/assets/images/logo.png"></img>
        </div>
        <div>
          <h1>Math Machine</h1>
          <h2>The #1 Math Tutoring Program</h2>
        </div>
      </div>

      <div class={styles.buttonDiv}>
        <button onClick={() => navigate(`/game/${select.value}`)} class={styles.beginButton}>
          Begin
        </button>
        <select name="Levels" id="Levels" ref={(ref) => (select = ref)}>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
          <option value="5">Level 5</option>
        </select>
      </div>
    </main>
  );
}
