export const getSecurityControlCollection = () => [
  { id: 0, label: 'Apache version updated' },
  { id: 1, label: 'PHP version updated' },
  { id: 2, label: 'Drupal version updated' },
  { id: 3, label: 'TLS recommendations (HTTPS connection)' },
  { id: 4, label: 'Protection recommendations' },
  { id: 5, label: 'Website firewall' },
  { id: 6, label: 'Protection from defacements' },
  { id: 7, label: 'Protection from injected spam' },
  { id: 8, label: 'Header for XSS' },
  { id: 9, label: 'Header for  ClickJacking Protection' },
  { id: 10, label: 'Header X-Content-Type' },
  { id: 11, label: 'Header for  Strict-Transport-Security security' },
  { id: 12, label: 'Content-Security-Policy directive' },
  { id: 13, label: 'Web server default banners' },
  { id: 14, label: 'DMARC policy' },
  { id: 15, label: 'DNSSEC' }
];

export const getSecurityControlFromId = (id) => {
  return getSecurityControlCollection().find((o) => o.id === id).id;
};

export const getSecurityControlLabel = (id) => {
  return getSecurityControlCollection().find((o) => o.id === id).label;
};

export const getControlOutput = () => [
  { id: 0, title: 'None' },
  { id: 1, title: 'Yes' },
  { id: 2, title: 'No' }
];
