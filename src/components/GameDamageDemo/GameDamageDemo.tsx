import React, { useState } from 'react';
import { getRandomArbitrary } from './util';

const GameDamageDemo: React.FC<any> = (props) => {
  const [damage, setDamage] = useState(0);
  const [damageList, setDamageList] = useState<number[]>([]);

  const baseAttack = 100;
  const criticalRate = 0.5;
  const criticalDamage = 1.5;
  const attackIntensity = 1000;
  const skillDamageAmplify = 2;
  const skillBaseDamage = 300;

  const enemyDefense = 500;
  const enemyCritResist = 0.2;
  const enemyCritDmgResist = 0.5;

  const calculateDamage = () => {
    const isCritical = getRandomArbitrary(0, 1, 2) <= criticalRate - enemyCritResist;
    const criticalAmplify = isCritical ? 1 + criticalDamage - enemyCritDmgResist : 1;
    const damageDelta = getRandomArbitrary(0.8, 1.2, 2);
    const damageOutput =
      (baseAttack * skillDamageAmplify + skillBaseDamage) *
      criticalAmplify *
      damageDelta *
      ((attackIntensity - enemyDefense) / enemyDefense);
    return damageOutput;
  };

  const calculateDamageList = () => {
    const arr: number[] = [];
    for (let i = 0; i < 20; i++) {
      arr.push(calculateDamage());
    }
    return arr;
  };

  const getNewDamageList = () => {
    setDamageList(calculateDamageList());
  };

  return (
    <div style={{ display: 'block', justifyContent: 'center' }}>
      <h2>Damage Calculate Demo</h2>
      <button onClick={getNewDamageList}>Calculate Damage</button>
      <br />
      <br />
      <ul>
        {damageList.map((damage, i) => {
          return <li key={i}>{damage}</li>;
        })}
      </ul>
    </div>
  );
};

export default GameDamageDemo;
