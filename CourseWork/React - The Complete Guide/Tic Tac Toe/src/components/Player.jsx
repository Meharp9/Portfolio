import { useState } from "react";

const Player = ({initialName, symbol, isActive, updateName}) => {
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    const editHandler = () => {
        setIsEditing((editing) => (!editing));
        if (isEditing) {
            updateName(symbol, playerName);
        } 
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    let playerNameSection = <span className="player-name">{playerName}</span>;
    let btnCaption = "Edit";

    if (isEditing) {
        playerNameSection = <input type="text" required value={playerName} onChange={handleChange}/>;
        btnCaption="Save";
    }

    return <li className={isActive ? "active" : undefined}>
        <span className="player">
            {playerNameSection}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={editHandler}>{btnCaption}</button>
    </li>
};

export default Player;