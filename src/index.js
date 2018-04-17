import React from "react";
import { render } from "react-dom";
import Game from "./Game";
import "./styles.css";

const App = () => <Game />;

render(<App />, document.getElementById("root"));
