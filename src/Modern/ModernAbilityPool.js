import {useState} from 'react';
import { fetchDataForSpec } from '../Ancient/AncientDataFetching';
import SpecSelectButton from '../Generic/SpecSelectButton';
import ModernActionSlot from './ModernActionSlot';
import styles from '../styles/ModernCalculator.module.css';

function ModernAbilityPool({specs, selected}) {
    const [selectedSpec, setSelectedSpec] = useState(specs[0]);

    const handleSpecUpdate = (newSpec) => {
        if (selectedSpec && selectedSpec.id === newSpec.id) {
            return;
        }
        fetchDataForSpec(newSpec.id, (abilityData) => {
            console.log(abilityData);
            setSelectedSpec({...newSpec, abilities: abilityData.abilities});
        });
    }

    return (
        <div className={styles["ability-pool-box"]}>
            <div className={styles["spec-select-column"]}>
                {specs && specs.map(spec => <SpecSelectButton spec={spec} onClick={handleSpecUpdate} selected={selectedSpec && selectedSpec.id === spec.id}/>)}
            </div>
            <div>
            {/*Need to filter abilities, but I think the lockedToSpec property is not correctly being evaluated as a bool.*/}
                {selectedSpec && selectedSpec.abilities && selectedSpec.abilities.map(ability => <ModernActionSlot ability={ability}/>)}
            </div>
        </div>
    )
}

export default ModernAbilityPool;