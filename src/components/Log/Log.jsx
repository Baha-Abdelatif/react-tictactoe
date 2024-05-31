import "./Log.css";
import React from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export default function Log({ moves }) {
  return (
    <ol id="log">
      {moves.length > 0 &&
        moves.map((move) => {
          return (
            <li key={uuid()}>
              {move.player} played row {move.square.row + 1} - column{" "}
              {move.square.cell + 1}.
            </li>
          );
        })}
    </ol>
  );
}
Log.propTypes = {
  moves: PropTypes.any,
};
