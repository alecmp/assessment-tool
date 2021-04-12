export const getServiceAreaCollection = () => [
  { id: 0, label: 'Information security event management' },
  { id: 1, label: 'Information security incident management' },
  { id: 2, label: 'Vulnerability management' },
  { id: 3, label: 'Situational awareness' },
  { id: 4, label: 'Knowledge transfer' }
];

export const getServiceCollection = () => [
  { id: 0, areaId: 0, label: 'Monitoring and detection' },
  { id: 1, areaId: 0, label: 'Event analysis' },
  {
    id: 2,
    areaId: 1,
    label: 'Information security incident report acceptance'
  },
  { id: 3, areaId: 1, label: 'Information security incident analysis' },
  { id: 4, areaId: 1, label: 'Artifact and forensic evidence analysis' },
  { id: 5, areaId: 1, label: 'Mitigation and recovery' },
  { id: 6, areaId: 1, label: 'Information security incident coordination' },
  { id: 7, areaId: 1, label: 'Crisis management support' },
  { id: 8, areaId: 2, label: 'Vulnerability discovery / research' },
  { id: 9, areaId: 2, label: 'Vulnerability report intake' },
  { id: 10, areaId: 2, label: 'Vulnerability analysis' },
  { id: 11, areaId: 2, label: 'Vulnerability coordination' },
  { id: 12, areaId: 2, label: 'Vulnerability disclosure' },
  { id: 13, areaId: 2, label: 'Vulnerability response' },
  { id: 14, areaId: 3, label: 'Data acquisition' },
  { id: 15, areaId: 3, label: 'Analysis and synthesis' },
  { id: 16, areaId: 3, label: 'Communication' },
  { id: 17, areaId: 4, label: 'Awareness building' },
  { id: 18, areaId: 4, label: 'Training and education' },
  { id: 19, areaId: 4, label: 'Exercises' },
  { id: 20, areaId: 4, label: 'Technical and policy advisory' }
];

export const getServiceAreaFromId = (id) => {
  return getServiceAreaCollection().find((o) => o.id === id).id;
};

export const getServiceFromId = (id) => {
  return getServiceCollection().find((o) => o.id === id).id;
};

export const getServiceAreaFromService = (id) => {
  return getServiceCollection().find((o) => o.id === id).areaId;
};

export const getServicesByServiceArea = (id) => {
  return getServiceCollection().filter((o) => o.areaId === id);
};

export const getServicesNumberByServiceArea = (id) => {
  return getServicesByServiceArea(id).length;
};

export const getServiceAreaLabel = (id) => {
  return getServiceAreaCollection().find((o) => o.id === id).label;
};

export const getServiceLabel = (id) => {
  return getServiceCollection().find((o) => o.id === id).label;
};
