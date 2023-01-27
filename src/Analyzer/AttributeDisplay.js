import ProgressBar from './ProgressBar.js';
import styles from '../styles/Analyzer.module.css';

function AttributeDisplay(props) {
    const {name, value} = props;
    //Format to add spaces between words and remove attr_ prefix.
    let formattedString = "";
    for (let i = 5; i < name.length; i++) {
        if (name.charAt(i) === name.charAt(i).toUpperCase() && i > 5) {
            formattedString += " ";
            formattedString += name.charAt(i);
        } else {
            formattedString += name.charAt(i);
        }
    }

    return (
        <div className={styles["attribute-display"]}>
            {formattedString}
            <ProgressBar percentage={(value / 60) * 100} />
        </div>
    )
}

export default AttributeDisplay;