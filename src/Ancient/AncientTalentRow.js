import AncientTalentButton from './AncientTalentButton.js';
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
            <AncientTalentButton key={row.base.id} talent={row.base} selected={row.selection === -1} onClick={handleSelectTalent}/>
            {row.talents.map((talent, index) => <AncientTalentButton key={talent.id} talent={talent} selected={row.selection === index} onClick={handleSelectTalent}/>)}
        </div>
    )
}

export default AncientTalentRow;