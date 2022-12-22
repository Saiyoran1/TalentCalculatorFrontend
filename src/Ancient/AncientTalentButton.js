import styles from '../styles/AncientCalculator.module.css';
import {useState} from 'react';
import AbilityTooltip from '../Generic/AbilityTooltip';

const AncientTalentButton = ({talent, selected, onClick}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return <button className={`${styles["talent-button"]}${selected ? " " + styles.selected : ""}`} onClick={() => onClick(talent)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {talent.name}
        {isHovered && <AbilityTooltip ability={talent} selected={selected}/>}
    </button>
}

export default AncientTalentButton;