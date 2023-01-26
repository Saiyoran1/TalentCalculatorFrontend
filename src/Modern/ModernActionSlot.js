import styles from '../styles/ModernCalculator.module.css';

function ModernActionSlot ({ability}) {
    return (
    <div className={styles["talent-button"]}>
        {ability ? ability.name : ""}
    </div>);
}

export default ModernActionSlot;