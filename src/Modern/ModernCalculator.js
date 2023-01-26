import {useEffect, useState} from 'react';
import calculatorStyles from '../styles/Calculator.module.css';
import SpecSelection from '../Generic/SpecSelection';
import ModernActionSlot from './ModernActionSlot';
import styles from '../styles/ModernCalculator.module.css';
import { fetchModernSpecs, fetchDataForSpec } from '../Ancient/AncientDataFetching';
import ModernAbilityPool from './ModernAbilityPool';

function ModernCalculator({setAttributes}) {

    const [specs, setSpecs] = useState([]);
    const [build, setBuild] = useState(null);

    useEffect(() => {
        fetchModernSpecs((newSpecs) => setSpecs(newSpecs));
    }, []);

    const handleUpdateSpec = (newSpec) => {
        if (build && build.spec.id === newSpec.id) {
            return;
        }
        fetchDataForSpec(newSpec.id, (abilityData) => changeSpec(newSpec, abilityData));
    }

    const changeSpec = (spec, abilityData) => {
        console.log(abilityData);
        if (!spec || !abilityData) {
            setBuild(null);
            return;
        }
        const newBuild = {
            spec: {...spec},
            abilities: {
                locked: abilityData.abilities.filter(ability => ability.lockedToSpec),
                free: []
            },
            passives: [...abilityData.passives]
        }
        setBuild(newBuild);
    };

    return (
        <div className={calculatorStyles.calculator}>
            <h2 className={calculatorStyles["calculator-header"]}>Select a Modern Specialization:</h2>
            <SpecSelection specs={specs} selectSpec={handleUpdateSpec} selectedSpec={build ? build.spec : null} passives={build ? build.passives : []}/>
            {build && <div className={styles["talent-box"]}>
                <div className={styles["talent-row"]}>
                    <ModernActionSlot ability={build.weapon}/>
                    <ModernActionSlot ability={build.abilities.locked[0]}/>
                    <ModernActionSlot ability={build.abilities.locked[1]}/>
                </div>
                <div className={styles["talent-row"]}>
                    <ModernActionSlot ability={build.abilities.free[0]}/>
                    <ModernActionSlot ability={build.abilities.free[1]}/>
                    <ModernActionSlot ability={build.abilities.free[2]}/>
                </div>
            </div>}
            {build && <ModernAbilityPool specs={specs}/>}
        </div>
    )
}

export default ModernCalculator;