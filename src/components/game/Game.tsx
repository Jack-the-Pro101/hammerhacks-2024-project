import { A, useNavigate, useParams } from "@solidjs/router";

import GameQuestion from "../game_question/GameQuestion";
import { createStore } from "solid-js/store";
import { createEffect, Show } from "solid-js";
import { levelToFunctions, stepbystep } from "../../math/math";

import styles from "./Game.module.css";
import PointsManager from "../../classes/PointsManager";
import { QUESTIONS } from "../../Constants";

interface GameParams {
  [key: string]: any;
  level: number;
}

export interface GameState {
  questionIndex: number;
  attempt: number;
  problem: string;
  answer: string;
  answer2?: string;
  validity: boolean | null;
}

export default function Game() {
  const { level } = useParams<GameParams>();
  const navigate = useNavigate();

  const [state, setState] = createStore<GameState>({
    questionIndex: 1,
    attempt: 1,
    problem: "null",
    answer: "null",
    validity: null,
  });

  createEffect(() => {
    state.questionIndex;

    const { answer, answer2, question } = levelToFunctions[level - 1]();

    console.log(answer, question);

    setState("answer", answer);
    setState("answer2", answer2);
    setState("problem", question);
  });

  let answerInput: HTMLInputElement;

  function submitAnswer(event: SubmitEvent) {
    event.preventDefault();

    if (state.validity) {
      setState("questionIndex", (index) => index + 1);
      setState("validity", null);
      answerInput.value = "";

      if (state.questionIndex >= QUESTIONS) {
        navigate("/play");
      }

      return;
    }

    if (answerInput.value == state.answer || (state.answer2 != null && answerInput.value == state.answer2)) {
      correct();
    } else {
      incorrect();
      // TODO: show answer after 3 tries
    }
  }

  function correct() {
    setState("validity", true);
    PointsManager.setPoints((points) => (points += level * 100));
    PointsManager.save();
  }

  function incorrect() {
    setState("validity", false);
    setState("attempt", (attempt) => attempt + 1);
  }

  return (
    <main>
      <A href="/">Exit (loses progress)</A>

      <div class={styles.questionTitle}>
        <h2>Level {level}</h2>
      </div>

      <div class={styles.question}>
        <GameQuestion data={state} />
      </div>

      <div class={styles.submission}>
        <form action="#" onSubmit={submitAnswer}>
          <label for="answer">Input your answer: </label>
          <Show when={level == 5}>
            <p>
              Enter the solution, if two solutions enter them from lowest to highest, <br /> if 1 enter them twice with a space separating them. eg:solution1
              solution2
            </p>
          </Show>
          <div class={styles.s}>
            <input type="text" name="answer" id="answer" autocomplete="off" disabled={state.validity == true} ref={(ref) => (answerInput = ref)} />

            <button type="submit">{state.validity ? "Next" : "Submit"}</button>
          </div>
        </form>

        <p style={styles.status} data-valid={!!state.validity}>
          {state.validity != null ? (state.validity ? "Correct!" : "Try again") : " "}
        </p>

        <Show when={level <= 3 && state.validity == false}>
          <pre>{stepbystep(state.problem).join("\n")}</pre>
        </Show>
      </div>
    </main>
  );
}
