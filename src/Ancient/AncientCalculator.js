import AncientTalentRow from './AncientTalentRow.js';
import SpecSelection from '../Generic/SpecSelection';
import calculatorStyles from '../styles/Calculator.module.css';
import ancientStyles from '../styles/AncientCalculator.module.css';
import {fetchDataForSpec} from './FrontEndDataFetching';

function AncientCalculator({specs, build, setBuild}) {

    //Change specs when clicking new spec button.
    const handleUpdateSpec = (newSpec) => {
        if (build && newSpec.id === build.spec.id) {
            return;
        }
        fetchDataForSpec(newSpec.id, (abilityData) => changeSpec(newSpec, abilityData));
    }

    //Callback from fetching ability/passive data for a spec we are swapping to.
    const changeSpec = (spec, abilityData) => {
        if (!spec || !abilityData) {
            setBuild(null);
            return;
        }
        const newBuild = {
            spec: {...spec},
            talentRows: getTalentRows(abilityData.abilities),
            passives: [...abilityData.passives]
        };
        setBuild(newBuild);
    };

    //Helper function to parse ability list into talent rows.
    const getTalentRows = (abilities) => {
        const talentRows = [];
        const baseAbilities = abilities.filter(ability => !ability.baseID);
        baseAbilities.forEach(ability => {
            talentRows.push({base: {...ability}, talents: [], selection: -1});
        });
        abilities.forEach(ability => {
            if (ability.baseID) {
                const baseAbility = talentRows.find(row => row.base.id === ability.baseID);
                if (baseAbility) {
                    baseAbility.talents.push({...ability});
                }
            }
        })
        return talentRows;
    }

    //Update build after selecting a new talent.
    const handleTalentUpdate = (baseID, selection) => {
        const newBuild = {...build};
        const changedRow = newBuild.talentRows.find(row => row.base.id === baseID);
        if (!changedRow) {
            return;
        }
        if (selection < 0 || selection > changedRow.talents.length - 1) {
            changedRow.selection = -1;
        } else {
            changedRow.selection = selection;
        }
        setBuild(newBuild);
    }

    return (
        <div className={calculatorStyles.calculator}>
            <h2 className={calculatorStyles["calculator-header"]}>Select an Ancient Specialization:</h2>
            <SpecSelection specs={specs} selectSpec={handleUpdateSpec} selectedSpec={build ? build.spec : null} passives={build ? build.passives : []}/>
            <div className={ancientStyles["talent-box"]}>
                {build && build.talentRows.map(row => <AncientTalentRow key={row.base.id} row={row} onSelectionChanged={(selection) => handleTalentUpdate(row.base.id, selection)}/>)}
            </div>
        </div>
    )
}

export default AncientCalculator;