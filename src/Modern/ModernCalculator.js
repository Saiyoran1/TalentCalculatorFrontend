import calculatorStyles from '../styles/Calculator.module.css';
import SpecSelection from '../Generic/SpecSelection';
import ActionSlot from '../Generic/ActionSlot';
import styles from '../styles/ModernCalculator.module.css';
import { fetchDataForSpec } from '../Generic/FrontEndDataFetching';
import ModernAbilityPool from './ModernAbilityPool';
import {useState} from "react";

function ModernCalculator({ specs, build, setBuild }) {

    const [selectedSlot, setSelectedSlot] = useState(0);

    const handleUpdateSpec = (newSpec) => {
        if (build && build.spec.id === newSpec.id) {
            return;
        }
        fetchDataForSpec(newSpec.id, (abilityData) => changeSpec(newSpec, abilityData));
    }

    const changeSpec = (spec, abilityData) => {
        if (!spec || !abilityData) {
            setBuild(null);
            return;
        }
        const newBuild = {
            spec: { ...spec },
            weapon: {},
            abilities: {
                locked: abilityData.abilities.filter(ability => ability.lockedToSpec),
                free: new Map()
            },
            passives: [...abilityData.passives]
        }
        setBuild(newBuild);
    };

    const handleSelectAbility = (ability) => {
        if (Array.from(build.abilities.free.values()).map(freeAbility => freeAbility.id).includes(ability.id)) {
            return;
        }
        const newBuild = {...build};
        newBuild.abilities.free.set(selectedSlot, ability);
        setBuild(newBuild);
    }
    
    return (
        <div className={calculatorStyles.calculator}>
            <h2 className={calculatorStyles["calculator-header"]}>Select a Modern Specialization:</h2>
            <SpecSelection specs={specs} selectSpec={handleUpdateSpec} selectedSpec={build ? build.spec : null} passives={build ? build.passives : []} />
            {build && build.spec && build.spec.id && <div className={styles["talent-box"]}>
                <div className={styles["build-box"]}>
                    <ActionSlot ability={build.weapon} />
                    <ActionSlot ability={build.abilities.locked[0]} />
                    <ActionSlot ability={build.abilities.locked[1]} />
                    <ActionSlot selected={selectedSlot === 0} ability={build.abilities.free.get(0)} onClick={() => setSelectedSlot(0)}/>
                    <ActionSlot selected={selectedSlot === 1} ability={build.abilities.free.get(1)} onClick={() => setSelectedSlot(1)}/>
                    <ActionSlot selected={selectedSlot === 2} ability={build.abilities.free.get(2)} onClick={() => setSelectedSlot(2)}/>
                </div>
                <ModernAbilityPool specs={specs} selectedAbilities={Array.from(build.abilities.free.values())} selectAbility={handleSelectAbility}/>
            </div>}
        </div>
    )
}

export default ModernCalculator;