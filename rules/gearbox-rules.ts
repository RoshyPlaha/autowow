export const GEARBOX_RULES = `
Gearbox extraction rules:
- If gearbox is not mentioned, return null for gearbox
- If gearbox is mentioned, return the gearbox string from the user input
- Common gearbox expressions to recognize:
  * 'manual' -> gearbox: 'manual'
  * 'automatic' -> gearbox: 'automatic'
  * 'semi-automatic' -> gearbox: 'automatic'
  * 'dual-clutch' -> gearbox: 'automatic'
  * 'continuously variable' -> gearbox: 'automatic'
`;