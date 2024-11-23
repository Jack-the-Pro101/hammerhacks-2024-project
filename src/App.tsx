import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import Home from "./components/home/Home";
import Game from "./components/game/Game";
import { RouteDefinition, Router } from "@solidjs/router";
import Navbar from "./components/navbar/Navbar";
import Play from "./components/play/Play";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/game/:level",
    component: Game,
  },
  {
    path: "/play",
    component: Play,
  },
] as RouteDefinition[];

function App() {
  return (
    <>
      <Navbar />
      <Router>{routes}</Router>
    </>
  );
}

export default App;
