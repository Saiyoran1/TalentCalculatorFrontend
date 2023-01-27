import AttributeDisplay from './AttributeDisplay.js';
import './Analyzer.css';

function Analyzer({ modernBuild, ancientBuild }) {

    //Gets all attributes and sums them from ancient talent rows, modern locked and free abilities, weapon, and passives from both builds.
    let rawAttributes = [];
    ancientBuild.talentRows.forEach(talentRow => {
        const ability = talentRow.selection === -1 ? talentRow.base : talentRow.talents[talentRow.selection];
        if (ability && ability.attributes) {
            rawAttributes = rawAttributes.concat(ability.attributes);
        }
    });
    ancientBuild.passives.forEach(passive => {
        if (passive.attributes) {
            rawAttributes = rawAttributes.concat(passive.attributes);
        }
    });
    if (modernBuild.weapon && modernBuild.weapon.attributes) {
        rawAttributes = rawAttributes.concat(modernBuild.weapon.attributes);
    }
    modernBuild.abilities.locked.forEach(ability => {
        if (ability.attributes) {
            rawAttributes = rawAttributes.concat(ability.attributes);
        }
    });
    modernBuild.abilities.free.forEach(ability => {
        if (ability.attributes) {
            rawAttributes = rawAttributes.concat(ability.attributes);
        }
    });
    modernBuild.passives.forEach(passive => {
        if (passive.attributes) {
            rawAttributes = rawAttributes.concat(passive.attributes);
        }
    });
    const attributes = {};
    rawAttributes.forEach(attribute => {
        if (attribute.value !== 0) {
            if (attributes[attribute.name]) {
                attributes[attribute.name] += attribute.value;
            } else {
                attributes[attribute.name] = attribute.value;
            }
        }
    });

    return (
        <div className="analyzer">
            {Object.keys(attributes).map(attribute => {
                return <AttributeDisplay key={attribute} name={attribute} value={attributes[attribute]} />
            })}
        </div>
    )
}

export default Analyzer;