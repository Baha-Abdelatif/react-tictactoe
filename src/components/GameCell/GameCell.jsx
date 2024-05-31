import React from "react";
import PropTypes from "prop-types";

export default function GameCell({ content, ...props }) {
  return (
    <li>
      <button {...props}>{content}</button>
    </li>
  );
}
GameCell.propTypes = {
  content: PropTypes.string,
};
