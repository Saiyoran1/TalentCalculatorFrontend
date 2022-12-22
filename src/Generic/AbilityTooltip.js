import styles from '../styles/Tooltip.module.css';

const AbilityTooltip = ({ability, selected}) => {
    return (
        <div className={`${styles.tooltip} ${selected ? styles.selected : ""}`}>
            <h4>{ability.name}</h4>
            <p>{ability.description}</p>
            <a href={`/abilities/${ability.id}`} target="_blank" rel="noopener noreferrer">More Details</a>
        </div>
    );
}

export default AbilityTooltip;