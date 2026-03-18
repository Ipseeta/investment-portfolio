export interface ExpenseCategories {
  emi: number;
  rent: number;
  groceries: number;
  utilities: number;
  transport: number;
  entertainment: number;
  other: number;
}

export interface CalculationResult {
  salary: number;
  expenses: ExpenseCategories;
  totalExpenses: number;
  savings: number;
  expenseRatio: number;
}

export interface BudgetComparison {
  actual: { needs: number; wants: number; savings: number };
  recommended: { needs: number; wants: number; savings: number };
}

export interface InvestmentAllocation {
  label: string;
  percentage: number;
  amount: number;
}

export interface SavingsGoal {
  name: string;
  targetAmount: number;
  monthsToReach: number;
}

export type TabId = 'overview' | 'budget' | 'investments' | 'goals';
