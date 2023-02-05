import styles from '../styles/ActionSlot.module.css';
import {useState} from 'react';
import AbilityTooltip from './AbilityTooltip';

function ActionSlot ({ability, onClick, selected}) {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
    <button onClick={onClick} className={`${styles["talent-button"]} ${selected ? styles.selected : ""}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {ability ? ability.name : ""}
        {isHovered && ability && <AbilityTooltip ability={ability} selected={selected}/>}
    </button>);
}

export default ActionSlot;