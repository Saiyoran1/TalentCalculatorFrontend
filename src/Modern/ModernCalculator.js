import {useEffect, useState} from 'react';
import calculatorStyles from '../styles/Calculator.module.css';
import SpecSelection from '../Generic/SpecSelectRow';
import { fetchModernSpecs } from '../Ancient/AncientDataFetching';

function ModernCalculator({setAttributes}) {

    const [specs, setSpecs] = useState([]);
    const [build, setBuild] = useState(null);

    useEffect(() => {
        fetchModernSpecs((newSpecs) => setSpecs(newSpecs));
    }, []);

    const handleUpdateSpec = (newSpec) => {
        /*if (build && build.spec.id === newSpec.id) {
            return;
        }
        fetchDataForSpec(newSpec.id, (abilityData) => changeSpec(newSpec, abilityData));*/
    }

    const changeSpec = (spec, abilityData) => {
        /*if (!spec || !abilityData) {
            setBuild(null);
            return;
        }
        const newBuild = {
            spec: {...spec},
            talentRows: getTalentRows(abilityData.abilities),
            passives: [...abilityData.passives]
        };
        setBuild(newBuild);*/
    };

    return (
        <div className={calculatorStyles.calculator}>
            <h2 className={calculatorStyles["calculator-header"]}>Select a Modern Specialization:</h2>
            <SpecSelection specs={specs} selectSpec={handleUpdateSpec} selectedSpec={build ? build.spec : null} passives={build ? build.passives : []}/>
        </div>
    )
}

export default ModernCalculator;