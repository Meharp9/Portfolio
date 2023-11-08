const Log = ({ gameTurns }) => {
    return <ol id="log">
        {gameTurns.map(turn => <li key={`${turn.square[0]}${turn.square[1]}`}>
            {turn.player} selected {turn.square[0]}, {turn.square[1]}
        </li>)};
    </ol>
};

export default Log;