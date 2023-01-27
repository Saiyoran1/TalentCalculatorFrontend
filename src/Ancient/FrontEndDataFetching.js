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
