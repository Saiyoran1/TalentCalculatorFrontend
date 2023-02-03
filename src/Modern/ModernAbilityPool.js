import {useState} from 'react';
import { fetchDataForSpec } from '../Generic/FrontEndDataFetching';
import SpecSelectButton from '../Generic/SpecSelectButton';
import ModernActionSlot from './ModernActionSlot';
import styles from '../styles/ModernCalculator.module.css';

function ModernAbilityPool({specs, selectedAbilities, selectAbility}) {
    const [selectedSpec, setSelectedSpec] = useState(specs[0]);

    const handleSpecUpdate = (newSpec) => {
        if (selectedSpec && selectedSpec.id === newSpec.id) {
            return;
        }
        fetchDataForSpec(newSpec.id, (abilityData) => {
            setSelectedSpec({...newSpec, abilities: abilityData.abilities});
        });
    }

    const abilityIDs = selectedAbilities.map(ability => ability.id);

    return (
        <div className={styles["ability-pool-box"]}>
            <div className={styles["spec-select-column"]}>
                {specs && specs.map(spec => <SpecSelectButton key={spec.id} spec={spec} onClick={handleSpecUpdate} selected={selectedSpec && selectedSpec.id === spec.id}/>)}
            </div>
            <div>
            {/*Need to filter abilities, but I think the lockedToSpec property is not correctly being evaluated as a bool.*/}
                {selectedSpec && selectedSpec.abilities && 
                selectedSpec.abilities.filter(ability => ability.lockedToSpec === "FALSE")
                .map(ability => <ModernActionSlot selected={abilityIDs.includes(ability.id)} ability={ability} key={ability.id} onClick={() => selectAbility(ability)}/>)}
            </div>
        </div>
    )
}

export default ModernAbilityPool;