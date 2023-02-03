import styles from '../styles/ModernCalculator.module.css';

function ModernActionSlot ({ability, onClick, selected}) {
    return (
    <button onClick={onClick} className={`${styles["talent-button"]} ${selected ? styles.selected : ""}`}>
        {ability ? ability.name : ""}
    </button>);
}

export default ModernActionSlot;