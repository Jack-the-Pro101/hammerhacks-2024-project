import { A } from "@solidjs/router";
import { invoke } from "@tauri-apps/api/core";
import { onCleanup, onMount } from "solid-js";

import styles from "./Play.module.css";

export default function Play() {
  onMount(async () => {
    await invoke("play");
  });

  onCleanup(() => {
    // TODO: close game
  });

  return (
    <div class={styles.play}>
      <h1>Enjoy your game</h1>
      <p>
        <A href="/">Back to home</A>
      </p>
    </div>
  );
}
