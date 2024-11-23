import { QUESTIONS } from "../../Constants";
import { GameState } from "../game/Game";
import styles from "./GameQuestion.module.css";

export default function GameQuestion({ data }: { data: GameState }) {
  return (
    <div>
      <h3 class={styles.questionTitle}>
        Question {data.questionIndex}/{QUESTIONS}
      </h3>

      <p class={styles.question}>{data.problem}</p>
    </div>
  );
}
