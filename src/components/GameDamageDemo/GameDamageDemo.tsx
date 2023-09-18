import React, { useEffect, useRef, useState } from 'react';
import { getRandomArbitrary } from './util';

const MAX_HP = 5000;

type DamageObj = {
  damage: number;
  isCritical: boolean;
};

const GameDamageDemo: React.FC<any> = (props) => {
  const [damageList, setDamageList] = useState<DamageObj[]>([]);
  const [damageListEnemy, setDamageListEnemy] = useState<DamageObj[]>([]);
  const [HP, setHP] = useState(MAX_HP);
  const [enemyHP, setEnemyHP] = useState(MAX_HP);
  const defeated = useRef(false);
  const enemyDefeated = useRef(false);

  useEffect(() => {
    if (HP < 0 && !defeated.current) {
      defeated.current = true;
    }
    if (enemyHP < 0 && !enemyDefeated.current) {
      enemyDefeated.current = true;
    }
  }, [HP, enemyHP, defeated, enemyDefeated]);

  const baseAttack = 100;
  const criticalRate = 0.5;
  const criticalDamage = 1.5;
  const attackIntensity = 1000;
  const skillDamageAmplify = 2;
  const skillBaseDamage = 300;
  const accuracy = 1;

  const enemyDefense = 500;
  const enemyCritResist = 0.2;
  const enemyCritDmgResist = 0.5;
  const enemyEvasion = 0.3;

  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const calculateDamageObj = () => {
    const isCritical = getRandomArbitrary(0, 1, 2) <= criticalRate - enemyCritResist;
    const criticalAmplify = isCritical ? 1 + criticalDamage - enemyCritDmgResist : 1;
    const damageDelta = getRandomArbitrary(0.8, 1.2, 2);
    const isHit = getRandomArbitrary(0, 1, 2) <= accuracy - enemyEvasion;
    const damageOutput = isHit
      ? (baseAttack * skillDamageAmplify + skillBaseDamage) *
        criticalAmplify *
        damageDelta *
        ((attackIntensity - enemyDefense) / enemyDefense)
      : 0;
    return { damage: damageOutput, isCritical };
  };

  const calculateDamageList = async () => {
    const arr: any[] = [];
    for (let i = 0; i < 20; i++) {
      if (defeated.current || enemyDefeated.current) {
        return arr;
      }
      console.log(i);
      await timeout(300);
      const damageObj = calculateDamageObj();
      arr.push(damageObj);
      setDamageList([...arr]);
      setEnemyHP((enemyHP) => enemyHP - damageObj.damage);
      if (HP < 0 && !defeated) {
      }
    }
    return arr;
  };

  const calculateDamageListEnemy = async () => {
    const arr: any[] = [];
    for (let i = 0; i < 20; i++) {
      if (defeated.current || enemyDefeated.current) {
        return arr;
      }
      await timeout(300);
      const damageObj = calculateDamageObj();
      arr.push(damageObj);
      setDamageListEnemy([...arr]);
      setHP((HP) => HP - damageObj.damage);
    }
    return arr;
  };

  const startFight = async () => {
    calculateDamageList();
    calculateDamageListEnemy();
  };

  const resetFight = () => {
    setDamageList([]);
    setDamageListEnemy([]);
    setHP(MAX_HP);
    setEnemyHP(MAX_HP);
    defeated.current = false;
    enemyDefeated.current = false;
  };

  return (
    <div style={{ display: 'block', justifyContent: 'center' }}>
      <h2>Damage Calculate Demo</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px' }}>
        <button onClick={startFight}>Start Fight</button>
        <button onClick={resetFight}>Reset Fight</button>
      </div>

      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px' }}>
        <h3>HP: {HP}</h3>
        <h3>Enemy HP: {enemyHP}</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px' }}>
        <div>
          <ul>
            {damageList.map((item, i) => {
              const { damage, isCritical } = item;
              return (
                <li key={i} style={{ color: isCritical ? 'red' : 'black' }}>
                  {damage}
                </li>
              );
            })}
          </ul>
          <div>{defeated.current ? 'Defeated' : 'Alive'}</div>
        </div>
        <div>
          <ul>
            {damageListEnemy.map((item, i) => {
              const { damage, isCritical } = item;
              return (
                <li key={i} style={{ color: isCritical ? 'red' : 'black' }}>
                  {damage}
                </li>
              );
            })}
          </ul>
          <div>{enemyDefeated.current ? 'Enemy Defeated' : 'Enemy Alive'}</div>
        </div>
      </div>
    </div>
  );
};

export default GameDamageDemo;
