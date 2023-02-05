import ActionSlot from '../Generic/ActionSlot';
import styles from '../styles/AncientCalculator.module.css';

const AncientTalentRow = ({row, onSelectionChanged}) => {

    const handleSelectTalent = (talent) => {
        if (talent.id === row.base.id) {
            onSelectionChanged(-1);
        } else {
            onSelectionChanged(row.talents.findIndex(rowTalent => rowTalent.id === talent.id));
        }
    }
    
    return (
        <div className={styles["talent-row"]}>
            <ActionSlot key={row.base.id} ability={row.base} selected={row.selection === -1} onClick={handleSelectTalent}/>
            {row.talents.map((talent, index) => <ActionSlot key={talent.id} ability={talent} selected={row.selection === index} onClick={() => handleSelectTalent(talent)}/>)}
        </div>
    )
}

export default AncientTalentRow;