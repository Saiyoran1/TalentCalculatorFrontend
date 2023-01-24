/*  
    In database, spec data, ability data, and passive data would all be stored in separate tables.
*/

//Cache list of all specs here, so we don't have to fetch them multiple times.
let specs = [];
//Cache ability and passive data for specs.
const specData = new Map();

export function fetchSpecs(cb) {
    //This just returns an array of spec objects with the id, name, and descriptions.
    fetch("http://localhost:5000/specs").then(response => response.json()).then(data => {
        specs = data;
        cb();
    });
}

export function fetchAncientSpecs(cb) {
    if (specs.length < 1) {
        fetchSpecs(() => {
            cb(specs.filter(spec => spec.plane === "Ancient"));
        });
    }
    else {
        cb(specs.filter(spec => spec.plane === "Ancient"));
    }
}

export function fetchModernSpecs(cb) {
    if (specs.length < 1) {
        fetchSpecs(() => {
            cb(specs.filter(spec => spec.plane === "Modern"));
        });
    }
    else {
        cb(specs.filter(spec => spec.plane === "Modern"));
    }
}

export function fetchDataForSpec(specID, cb) {
    if (specData.has(specID)) {
        cb(specData.get(specID));
    } else {
        //This should fetch all abilities and passives for a spec. Shape should be { abilities: [], passives: [] }
        fetch(`http://localhost:5000/spec/${specID}`).then(response => response.json()).then(data => {
            console.log(data);
            specData.set(specID, data);
            cb(data);
        });
    }
}
