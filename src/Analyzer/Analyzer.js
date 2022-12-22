import AttributeDisplay from './AttributeDisplay.js';
import './Analyzer.css';

function Analyzer({attributes}) {

    return (
        <div className="analyzer">
        {Object.keys(attributes).map(attribute => {
            return <AttributeDisplay key={attribute} name={attribute} value={attributes[attribute]}/>
        })}
        </div>
    )
}

export default Analyzer;