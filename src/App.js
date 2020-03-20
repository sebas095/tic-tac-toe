import React from "react";
import { Game } from "./components/Game/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Game className="App" />
    </div>
  );
}

export default App;
