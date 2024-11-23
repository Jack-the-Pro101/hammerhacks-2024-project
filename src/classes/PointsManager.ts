import { Accessor, createSignal, Setter } from "solid-js";

class PointsManager {
  points: Accessor<number>;
  setPoints: Setter<number>;

  constructor() {
    const signal = createSignal(localStorage.getItem("points") != null ? Number(localStorage.getItem("points")) : 0);
    this.points = signal[0];
    this.setPoints = signal[1];

    if (localStorage.getItem("points") == null) {
      this.save();
    }
  }

  save() {
    localStorage.setItem("points", this.points().toString());
  }
}

export default new PointsManager();
