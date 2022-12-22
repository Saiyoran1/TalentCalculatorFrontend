import SpecSelectButton from "./SpecSelectButton"
import styles from "../styles/SpecSelection.module.css";

const SpecSelectRow = ({specs, selectSpec, selectedSpecID}) => {
    return (
        <div className={styles["spec-selection-row"]}>
            {specs.map(spec => <SpecSelectButton key={spec.id} spec={spec} onClick={selectSpec} selected={spec.id === selectedSpecID}/>)}
        </div>
    )
}

export default SpecSelectRow;