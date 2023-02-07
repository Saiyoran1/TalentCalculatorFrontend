import styles from '../styles/SaveBuildForm.module.css';
import {useState} from 'react';

const SaveBuildForm = ({ancientBuild, modernBuild}) => {

    const [buildName, setBuildName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log([ancientBuild, modernBuild, buildName]);
    }
    
    return (
        <form className={styles["save-form"]} onSubmit={handleSubmit}>
            <label htmlFor="buildName">Build Name:</label>
            <input type="text" id="buildName" name="buildName" value={buildName} onChange={e => setBuildName(e.target.value)}/>
            <button type="submit" className={styles["save-button"]}>Save Build</button>
        </form>
    )
}

export default SaveBuildForm;

/*
Saved build shape:
{
    name: string,
    ancientBuild: {
        specId: number,
        talents: Map(number, number) //this maps base id and talent id
    },
    modernBuild: {
        specId: number,
        talents: Map(number, number) //this maps slot index to spell id (0, 1, 2 to actual ids)
    },
    //eventually add account identification?
}
*/