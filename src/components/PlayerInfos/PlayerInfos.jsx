import "./PlayerInfos.css";
import { useState } from "react";
import PropTypes from "prop-types";

export default function PlayerInfos({
  defaultName,
  playerSymbol,
  isActive,
  changeName,
  setPlayers,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(defaultName);

  const toggleIsEditing = () => {
    setIsEditing((editing) => !editing);
    isEditing && changeName(playerSymbol, userName, setPlayers);
  };
  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            name="username"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? toggleIsEditing() : null)}
            required
          />
        ) : (
          <span className="player-name">{userName}</span>
        )}
        <span className="player-symbol">{playerSymbol}</span>
      </span>
      <button onClick={toggleIsEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
PlayerInfos.propTypes = {
  defaultName: PropTypes.string.isRequired,
  playerSymbol: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
