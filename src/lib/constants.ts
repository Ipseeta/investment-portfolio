export const CATEGORY_COLORS: Record<string, string> = {
  emi: '#FF6384',
  rent: '#FF9F40',
  groceries: '#FFCD56',
  utilities: '#4BC0C0',
  transport: '#36A2EB',
  entertainment: '#9966FF',
  other: '#C9CBCF',
  savings: '#2ECC71',
};

export const CATEGORY_LABELS: Record<string, string> = {
  emi: 'EMI',
  rent: 'Rent',
  groceries: 'Groceries',
  utilities: 'Utilities',
  transport: 'Transport',
  entertainment: 'Entertainment',
  other: 'Other',
};

export const NEEDS_CATEGORIES = ['emi', 'rent', 'groceries', 'utilities', 'transport'] as const;
export const WANTS_CATEGORIES = ['entertainment', 'other'] as const;

export const BUDGET_COLORS = {
  actual: '#36A2EB',
  recommended: '#FF6384',
};

export const INVESTMENT_COLORS = [
  '#FF6384', '#36A2EB', '#FFCD56', '#4BC0C0', '#9966FF',
];
