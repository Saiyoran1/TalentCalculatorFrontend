import styles from '../styles/SpecSelection.module.css';

const SpecSelectButton = ({spec, onClick, selected}) => {
    return (
        <button onClick={() => onClick(spec)} className={`${styles["spec-button"]} ${selected ? styles.selected : ""}`}>
            {spec.name}
        </button>
    )
}

export default SpecSelectButton;