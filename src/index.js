import React from "react";
import { render } from "react-dom";
import ReactGA from 'react-ga';
import "./styles.css";
import Game from "./Game";
import { GA_KEY } from './config';

ReactGA.initialize(GA_KEY); //, {debug : true});

render(<Game />, document.getElementById("root"));
