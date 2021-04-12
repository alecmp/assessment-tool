const getAttacksTotal = (records) => {
  return Object.entries(
    records.reduce(
      (acc, o) => ((acc[o.attackTypeId] = (acc[o.attackTypeId] || 0) + 1), acc),
      {}
    )
  ).map((e) => ({
    id: e[0],
    occ: e[1]
  }));
};

const getAvarage = (records, key, val) => {
  const average = (a, b, i, self) =>
    Math.round((a + b[val] / self.length) * 100) / 100;
  return Object.values(
    records.reduce(
      (acc, elem, i, self) => (
        (acc[elem[key]] = acc[elem[key]] || {
          [key]: elem[key],
          [val]: self.filter((x) => x[key] === elem[key]).reduce(average, 0)
        }),
        acc
      ),
      {}
    )
  );
};

const getProduct = (a, b) => {
  return { assessment: a * b };
};

export const getSeverityCollection = () => [
  { id: '1', title: '1' },
  { id: '2', title: '2' },
  { id: '3', title: '3' },
  { id: '4', title: '4' },
  { id: '5', title: '5' }
];

export const getDataRankCollection = () => [
  { id: 0, title: 0 },
  { id: 1, title: 1 },
  { id: 2, title: 2 },
  { id: 3, title: 3 },
  { id: 4, title: 4 },
  { id: 5, title: 5 }
];

export const getAttackTypeCollection = () => [
  { id: '1', title: 'Data Encrypted' },
  { id: '2', title: 'Spearphishing Attachment' },
  { id: '3', title: 'PowerShell' },
  { id: '4', title: 'Data Compressed' },
  { id: '5', title: 'Scripting' },
  { id: '6', title: 'Command-Line Interface' },
  { id: '7', title: 'Spam' },
  { id: '8', title: 'Connection Proxy' },
  { id: '9', title: 'Remote File Copy' },
  { id: '10', title: 'User Execution' }
];

export const getAttackTypeFromId = (id) => {
  return getAttackTypeCollection().find((o) => o.id === id).title;
};

export const getGroupedRecords = (records) => {
  return getAttacksTotal(records).map((item, i) =>
    Object.assign(
      {},
      item,
      getAvarage(records, 'attackTypeId', 'dataRank')[i],
      getAvarage(records, 'attackTypeId', 'severity')[i],
      getProduct(
        getAvarage(records, 'attackTypeId', 'dataRank')[i].dataRank,
        getAvarage(records, 'attackTypeId', 'severity')[i].severity
      ),
    ),

  );
};
