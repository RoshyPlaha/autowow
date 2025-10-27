export const COLOR_RULES = `
Color extraction rules:
- If color is not mentioned, return null for color
- If multiple colors are mentioned, return an array of all colors
- Common color variations to normalize:
  * 'red' -> 'red'
  * 'blue' -> 'blue'
  * 'black' -> 'black'
  * 'white' -> 'white'
  * 'silver' -> 'silver'
  * 'grey' or 'gray' -> 'gray'
  * 'green' -> 'green'
  * 'yellow' -> 'yellow'
  * 'orange' -> 'orange'
  * 'purple' -> 'purple'
  * 'brown' -> 'brown'
- Color combinations (e.g., 'red or blue') should return ['red', 'blue']
- Color preferences (e.g., 'preferably red') should return ['red']
- Avoid colors (e.g., 'not red') should return all other colors except red
`;
