export const YEAR_RULES = `
Year extraction rules:
- If year is not mentioned, return null for minYear and maxYear
- If year is mentioned as a minimum or 'newer than' or 'nothing older than' or 'at least' or 'from', return the yearmin integer with the minimum year from the user input
- If year is mentioned as a maximum or 'older than' or 'not newer than' or 'up to' or 'before', return the yearmax integer with the maximum year from the user input
- If a range is mentioned (e.g., 'between 2015 and 2020'), set both yearmin and yearmax
- If exact year is mentioned (e.g., '2020'), set yearmin to that value and yearmax to null
- Common year expressions to recognize:
  * 'newer than 2005' -> yearmin: 2005
  * 'nothing older than 1992' -> yearmin: 1992
  * 'from 2010' -> yearmin: 2010
  * 'at least 2015' -> yearmin: 2015
  * 'older than 2020' -> yearmax: 2020
  * 'not newer than 2018' -> yearmax: 2018
  * 'up to 2022' -> yearmax: 2022
  * 'before 2015' -> yearmax: 2014
  * 'between 2015 and 2020' -> yearmin: 2015, yearmax: 2020
  * '2015-2020' -> yearmin: 2015, yearmax: 2020
  * 'around 2018' -> yearmin: 2017, yearmax: 2019
  * 'recent' or 'new' -> yearmin: 2020 (adjust based on current year)
  * 'old' or 'classic' -> yearmax: 1995
- Year should be a 4-digit number (e.g., 2020, not 20 or 202)
- If unclear whether it's a year or something else, prefer to return null`;
  