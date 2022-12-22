import SpecSelectRow from './SpecSelectRow';
import styles from '../styles/SpecSelection.module.css';

const SpecSelection = ({specs, selectSpec, selectedSpec, passives}) => {
    return (
        <div className={styles["spec-selection-box"]}>
            <SpecSelectRow specs={specs} selectSpec={selectSpec} selectedSpecID={selectedSpec ? selectedSpec.id : -1}/>
            <div className={styles["spec-description-box"]}>
                <p>{selectedSpec && selectedSpec.description}</p>
            </div>
            <div className={styles["spec-passive-container"]}>
                {passives.length > 0 && "Spec Passives:"}
                <ul>
                    {selectedSpec && passives.map(passive => <li key={passive.id} className={styles["spec-passive"]}>{passive.name}: {passive.description}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default SpecSelection;