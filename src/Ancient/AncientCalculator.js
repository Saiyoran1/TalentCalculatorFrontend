import {useState, useEffect} from 'react';
import {fetchAncientSpecs, fetchDataForSpec} from './AncientDataFetching.js';
import AncientTalentRow from './AncientTalentRow.js';
import SpecSelection from '../Generic/SpecSelection';
import calculatorStyles from '../styles/Calculator.module.css';
import ancientStyles from '../styles/AncientCalculator.module.css';

/*
    Build shape
    {
        spec: {
            id: number,
            name: string,
            description: string
        },
        talentRows: [
            {
                base: {
                    id: number,
                    name: string,
                    specID: number,
                    attributes: [
                        {
                            name: string,
                            value: number
                        }
                    ]
                },
                talents: [
                    {
                        id: number,
                        name: string,
                        specID: number,
                        baseID: number,
                        attributes: [
                            {
                                name: string,
                                value: number
                            }
                        ]
                    }
                ],
                selection: number
            }
        ],
        passives: [
            {
                id: number,
                specID: number,
                name: string,
                description: string,
                attributes: [
                    name: string,
                    value: number
                ]
            }
        ]
    }
*/

function AncientCalculator({setAttributes}) {

    const [specs, setSpecs] = useState([]);
    const [build, setBuild] = useState(null);

    //On initial render, fetch all spec data for ancient specs.
    useEffect(() => {
        fetchAncientSpecs((ancientSpecs) => {
            setSpecs(ancientSpecs);
        });
    }, []);

    //When build has changed, update attributes for the analyzer.
    useEffect(() => {
        if (!build) {
            setAttributes({});
            return;
        }
        const attributes = {};
        build.talentRows.forEach(talentRow => {
            const ability = talentRow.selection === -1 ? talentRow.base : talentRow.talents[talentRow.selection];
            if (ability && ability.attributes) {
                ability.attributes.forEach(attribute => {
                    if (attributes[attribute.name]) {
                        attributes[attribute.name] += attribute.value;
                    } else {
                        attributes[attribute.name] = attribute.value;
                    }
                });
            }
        });
        build.passives.forEach(passive => {
            if (passive.attributes) {
                passive.attributes.forEach(attribute => {
                    if (attributes[attribute.name]) {
                        attributes[attribute.name] += attribute.value;
                    } else {
                        attributes[attribute.name] = attribute.value;
                    }
                });
            }
        });
        setAttributes(attributes);
    }, [build, setAttributes]);

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