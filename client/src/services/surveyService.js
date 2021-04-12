export const getSecurityMeasureCollection = () => [
  { id: 0, label: 'Inventory of authorized and unauthorized devices' },
  { id: 1, label: 'Inventory of authorized and unauthorized software' },
  {
    id: 2,
    label:
      'Secure configurations for hardware and software on mobile devices, laptops, workstations, and servers'
  },
  { id: 3, label: 'Continuous vulnerability assessment and remediation' },
  { id: 4, label: 'Malware defenses' },
  { id: 5, label: 'Application software security' },
  { id: 6, label: 'Wireless access control' },
  { id: 7, label: 'Data recovery capability' },
  {
    id: 8,
    label: 'Security skills assessment and appropriate training to fill gaps'
  },
  {
    id: 9,
    label:
      'Secure configurations for network devices such as firewalls, routers, and switches'
  },
  {
    id: 10,
    label: 'Limitation and control of network ports, protocols, and services'
  },
  { id: 11, label: 'Controlled use of administrative privileges' },
  { id: 12, label: 'Boundary defense' },
  { id: 13, label: 'Maintenance, monitoring, and analysis of audit logs' },
  { id: 14, label: 'Controlled access based on the need to know' },
  { id: 15, label: 'Account monitoring and control' },
  { id: 16, label: 'Data protection' },
  { id: 17, label: 'Incident response and management' },
  { id: 18, label: 'Secure network engineering' },
  { id: 19, label: 'Penetration tests and red team exercises' }
];

export const getSecurityMeasureFromId = (id) => {
  return getSecurityMeasureCollection().find((o) => o.id === id).id;
};

export const getSecurityMeasureLabel = (id) => {
  return getSecurityMeasureCollection().find((o) => o.id === id).label;
};
