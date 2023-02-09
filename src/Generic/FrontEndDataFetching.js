/*  
    In database, spec data, ability data, and passive data would all be stored in separate tables.
*/

//Cache ability and passive data for specs.
const specData = new Map();

export function fetchSpecs(cb) {
    //This just returns an array of spec objects with the id, name, and descriptions.
    fetch("http://localhost:5000/specs").then(response => response.json()).then(data => cb(data));
}

export function fetchDataForSpec(specID, cb) {
    if (specData.has(specID)) {
        cb(specData.get(specID));
    } else {
        //This should fetch all abilities and passives for a spec. Shape should be { abilities: [], passives: [] }
        fetch(`http://localhost:5000/spec/${specID}`).then(response => response.json()).then(data => {
            specData.set(specID, data);
            cb(data);
        });
    }
}

const isDefaultBuild = (build) => {
    if (!build || Object.keys(build).length === 0) {
        return true;
    }
    if (isNaN(build.spec.id)) {
        return true;
    }
    return false;
}

const saveAncientBuild = (ancientBuild) => {
    return {
        spec: ancientBuild.spec.id,
        talents: ancientBuild.talentRows.map(row => [row.base.id, row.selection === -1 ? row.base.id : row.talents[row.selection].id])
    }
}

const saveModernBuild = (modernBuild) => {
    return {
        spec: modernBuild.spec.id,
        abilities: Array.from(modernBuild.abilities.free.keys()).map(key => modernBuild.abilities.free.get(key).id)
    }
}

export function saveBuild(buildName, buildDescription, ancientBuild, modernBuild) {
    if (!buildName || buildName === "" || !buildDescription || buildDescription === "") {
        return;
    }
    if (isDefaultBuild(ancientBuild) || isDefaultBuild(modernBuild)) {
        return;
    }
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: buildName,
            description: buildDescription,
            ancientBuild: saveAncientBuild(ancientBuild),
            modernBuild: saveModernBuild(modernBuild)
        })
    }
    fetch(`http://localhost:5000/build/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
