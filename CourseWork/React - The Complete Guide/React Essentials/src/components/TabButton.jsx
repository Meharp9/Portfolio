const TabButton = props => {
    return <li>
        <button className={props.isSelected ? "active" : ""} onClick={props.onSelect}>{props.children}</button>
    </li>
} 

export default TabButton;