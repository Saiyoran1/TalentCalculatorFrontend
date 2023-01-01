/*  
    In database, spec data, ability data, passive data, and attribute data would all be stored in separate tables.
*/

export function fetchAncientSpecs(cb) {
    fetch("http://localhost:5000/specs?plane=ancient").then(response => response.json()).then(data => {
        //This just returns an array of spec objects with the id, name, and descriptions.
        cb(data);
    });
}

export function fetchModernSpecs(cb) {
    fetch("http://localhost:5000/specs?plane=modern").then(response => response.json()).then(data => {
        //This just returns an array of spec objects with the id, name, and description.
        cb(data);
    })
}

export function fetchDataForSpec(specID, cb) {
    fetch(`http://localhost:5000/specs?specID=${specID}`).then(response => response.json()).then(data => {
        //This should fetch all abilities and passives for a spec.
        //Shape should be { abilities: [], passives: [] }
        cb(data);
    })
}
