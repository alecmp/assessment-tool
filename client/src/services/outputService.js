import { attacksBySecControls, attacksBySecMeasures } from './attackMatches';
import { NO_CONTROL } from '../components/assessment-rank/secControl/SecControl';


export const getAttackCollection = () => [
  { id: 0, label: 'XSS' },
  { id: 1, label: 'Phishing' },
  { id: 2, label: 'Man in the middle' },
  { id: 3, label: 'DNS hijacking' },
  { id: 4, label: 'DoS/DDoS' },
  { id: 5, label: 'XST' },
  { id: 6, label: 'Spam' },
  { id: 7, label: 'Drive-by-download' },
  { id: 8, label: 'Code Injection' },
  { id: 9, label: 'Spearphishing Attachment' },
  { id: 10, label: 'Command-Line Interface' },
  { id: 11, label: 'PowerShell' },
  { id: 12, label: 'Scripting' },
  { id: 13, label: 'Connection Proxy' },
  { id: 14, label: 'Brute Force' },
  { id: 15, label: 'Process Discovery' },
  { id: 16, label: 'Remote File Copy' },
  { id: 17, label: 'User Execution' },
  { id: 18, label: 'Standard Application Layer Protocol' },
  { id: 19, label: 'File and Directory Discovery' },
  { id: 20, label: 'Drive-by Compromise' },
  { id: 21, label: 'Exploitation for Client Execution' },
  { id: 22, label: 'Data Encrypted' },
  { id: 23, label: 'Credential Dumping' },
  { id: 24, label: 'Valid Accounts' },
  { id: 25, label: 'Data Compressed' }
];

export const IDEAL_VALUE = 500;

export const getAttackLabel = (id) => {
  return getAttackCollection().find((o) => o.id === id).label;
};

export const getMatches = (records) => {
  const output = [];

  records.forEach(function (item) {
    const obj = {};
    obj['id'] = item.id;
    const attackValues = [];
    for (var i = 0; i < getAttackCollection().length; i++) {
      attackValues[i] = 5;
    }

    if (item.upguard === NO_CONTROL || item.sucuri === NO_CONTROL) {
      const attacksRecord = attacksBySecControls[item.id];
      for (var i = 0; i < getAttackCollection().length; i++) {
        for (var j = 0; j < attacksRecord.attacks.length; j++) {
          if (i === attacksRecord.attacks[j]) {
            attackValues[i] = 0;
          }
        }
      }
    }
    obj.attackValues = attackValues;
    output.push(obj);
  });

  return output;
};

export const getSurveyMatches = (records) => {
  const output = [];

  records.forEach(function (item) {
    const obj = {};
    obj['id'] = item.id;
    const attackValues = [];
    for (var i = 0; i < getAttackCollection().length; i++) {
      attackValues[i] = 5;
    }
    const attacksRecord = attacksBySecMeasures[item.id];
    for (var i = 0; i < getAttackCollection().length; i++) {
      for (var j = 0; j < attacksRecord.attacks.length; j++) {
        if (i === attacksRecord.attacks[j]) {
          if (item.value === null) attackValues[i] = 0;
          else attackValues[i] = item.value;
        }
      }
    }
    obj.attackValues = attackValues;
    output.push(obj);
  });

  return output;
};

export const getCSIRTMatches = (records) => {
  const output = [];

  records.forEach(function (item) {
    const obj = {};
    obj['id'] = item.id;
    const attackValues = [];
    for (var i = 0; i < getAttackCollection().length; i++) {
      attackValues[i] = item.value;
    }
    obj.attackValues = attackValues;
    output.push(obj);
  });

  return output;
};

export const getRealValues = (records, attackImpactMatrix) => {
  const realValues = [];

  for (var i = 0; i < getAttackCollection().length; i++) {
    var allValuesByAttack = [];
    var sum = 0;

    for (var j = 0; j < records.length; j++) {
      allValuesByAttack.push(records[j].attackValues[i]);
    }

    const allImpactsByAttack = attackImpactMatrix[i];

    for (var j = 0; j < attackImpactMatrix[i].length; j++) {
      sum = sum + allValuesByAttack[j] * allImpactsByAttack[j];
    }

    realValues.push(sum);
  }

  return realValues;
};


export const getRealValuesOfArea = (records, attackImpactMatrix, sectorAttacks = [], riskOfArea = 1) => {
  const realValues = [];

  for (var i = 0; i < getAttackCollection().length; i++) {
    var allValuesByAttack = [];
    var sum = 0;

    for (var j = 0; j < records.length; j++) {
      allValuesByAttack.push(records[j].attackValues[i]);
    }

    const allImpactsByAttack = attackImpactMatrix[i];

    for (var j = 0; j < attackImpactMatrix[i].length; j++) {
      sum = sum + allValuesByAttack[j] * allImpactsByAttack[j];
    }

    if (sectorAttacks.includes(getAttackCollection()[i].id)) {
      sum = Math.round((sum / riskOfArea) * 100) / 100;
    }

    realValues.push(sum);
  }

  return realValues;
};
