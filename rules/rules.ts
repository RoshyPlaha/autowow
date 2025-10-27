import { CORE_RULES } from './core-rules';
import { MILEAGE_RULES } from './mileage-rules';
import { PRICING_RULES } from './pricing-rules';
import { COLOR_RULES } from './color-rules';

export const PROMPT_RULES = () => {
  return {
    rules: `
${CORE_RULES}

${MILEAGE_RULES}

${PRICING_RULES}

${COLOR_RULES}
`,
  };
};