import Analyzer from './Analyzer/Analyzer.js';
import AncientCalculator from './Ancient/AncientCalculator.js';
import ModernCalculator from './Modern/ModernCalculator.js';
import styles from './styles/App.module.css';
import {useState} from 'react';

function App() {

  const [ancientAttributes, setAncientAttributes] = useState({});
  const [modernAttributes, setModernAttributes] = useState({});

  const getTotalAttributes = () => {
    const attributes = {...ancientAttributes};
    Object.keys(modernAttributes).forEach(attrKey => {
      if (attributes[attrKey]) {
        attributes[attrKey] += modernAttributes[attrKey];
      } else {
        attributes[attrKey] = modernAttributes[attrKey];
      }
    });
    return attributes;
  }

  return (
    <div className={styles.app}>
        <AncientCalculator setAttributes={setAncientAttributes}/>
        <ModernCalculator setAttributes={setModernAttributes}/>
        <Analyzer attributes={getTotalAttributes()}/>
    </div>
  );
}

export default App;
