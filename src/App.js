import Analyzer from './Analyzer/Analyzer.js';
import AncientCalculator from './Ancient/AncientCalculator.js';
import ModernCalculator from './Modern/ModernCalculator.js';
import styles from './styles/App.module.css';
import { useEffect, useState } from 'react';
import { fetchSpecs } from './Ancient/FrontEndDataFetching.js';

function App() {

  const [modernBuild, setModernBuild] = useState({
    spec: {},
    weapon: {},
    abilities: {
      locked: [],
      free: []
    },
    passives: []
  });
  const [ancientBuild, setAncientBuild] = useState({
    spec: {},
    talentRows: [],
    passives: []
  });
  const [specs, setSpecs] = useState([]);

  useEffect(() => {
    fetchSpecs(setSpecs);
  }, []);

  return (
    <div className={styles.app}>
      <AncientCalculator specs={specs.filter(spec => spec.plane === "Ancient")} build={ancientBuild} setBuild={setAncientBuild} />
      <ModernCalculator specs={specs.filter(spec => spec.plane === "Modern")} build={modernBuild} setBuild={setModernBuild} />
      <Analyzer modernBuild={modernBuild} ancientBuild={ancientBuild} />
    </div>
  );
}

export default App;


/*
Ancient Build Shape
{
  spec: specObject,
  talentRows: [{ 
    base: abilityObject,
    talents: [abilityObject],
    selection: number
  }],
  passives: [passiveObject]
  }
}

Modern Build Shape
{
  spec: specObject,
  weapon: abilityObject,
  abilities: { 
    locked: [abilityObject], 
    free: [abilityObject]
  },
  passives: [passiveObject]
}

Spec Object
{
  id: number,
  name: string,
  description: string,
  color: string
}

Ability Object
{
  id: number,
  baseId: number,
  specId: number,
  name: string,
  description: string,
  lockedToSpec: bool,
  attributes: [attributeObject]
  //Unused stuff such as dungeon unlock info, detailed cast/cd info, etc.
}

Passive Object
{
  id: number,
  specId: number,
  description: string,
  attributes: [attributeObject]
}

Attribute Object
{
  name: string,
  value: number
}
*/