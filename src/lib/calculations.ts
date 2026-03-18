import type { ExpenseCategories, CalculationResult, BudgetComparison, InvestmentAllocation } from '@/types';
import { NEEDS_CATEGORIES, WANTS_CATEGORIES } from './constants';

export function calculatePortfolio(salary: number, expenses: ExpenseCategories): CalculationResult {
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const savings = Math.max(0, salary - totalExpenses);
  const expenseRatio = salary > 0 ? Math.round((totalExpenses / salary) * 100 * 100) / 100 : 0;

  return {
    salary,
    expenses,
    totalExpenses: Math.round(totalExpenses * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    expenseRatio,
  };
}

export function calculateBudgetComparison(salary: number, expenses: ExpenseCategories): BudgetComparison {
  const needsTotal = NEEDS_CATEGORIES.reduce((sum, key) => sum + expenses[key], 0);
  const wantsTotal = WANTS_CATEGORIES.reduce((sum, key) => sum + expenses[key], 0);
  const totalExpenses = needsTotal + wantsTotal;
  const actualSavings = Math.max(0, salary - totalExpenses);

  return {
    actual: {
      needs: Math.round(needsTotal * 100) / 100,
      wants: Math.round(wantsTotal * 100) / 100,
      savings: Math.round(actualSavings * 100) / 100,
    },
    recommended: {
      needs: Math.round(salary * 0.5 * 100) / 100,
      wants: Math.round(salary * 0.3 * 100) / 100,
      savings: Math.round(salary * 0.2 * 100) / 100,
    },
  };
}

export function calculateInvestmentAllocations(monthlySavings: number): InvestmentAllocation[] {
  if (monthlySavings <= 0) return [];

  let tiers: { label: string; percentage: number }[];

  if (monthlySavings < 10000) {
    tiers = [{ label: 'Emergency Fund', percentage: 100 }];
  } else if (monthlySavings < 25000) {
    tiers = [
      { label: 'Emergency Fund', percentage: 40 },
      { label: 'SIP (Mutual Funds)', percentage: 30 },
      { label: 'Fixed Deposit', percentage: 20 },
      { label: 'PPF', percentage: 10 },
    ];
  } else if (monthlySavings < 50000) {
    tiers = [
      { label: 'SIP (Mutual Funds)', percentage: 30 },
      { label: 'Emergency Fund', percentage: 20 },
      { label: 'Stocks', percentage: 20 },
      { label: 'Fixed Deposit', percentage: 15 },
      { label: 'PPF', percentage: 15 },
    ];
  } else {
    tiers = [
      { label: 'SIP (Mutual Funds)', percentage: 30 },
      { label: 'Stocks', percentage: 25 },
      { label: 'PPF', percentage: 20 },
      { label: 'Fixed Deposit', percentage: 15 },
      { label: 'Emergency Fund', percentage: 10 },
    ];
  }

  return tiers.map((t) => ({
    label: t.label,
    percentage: t.percentage,
    amount: Math.round((monthlySavings * t.percentage) / 100),
  }));
}

export function calculateSavingsGoal(targetAmount: number, monthlySavings: number): { monthsToReach: number } {
  if (monthlySavings <= 0) return { monthsToReach: Infinity };
  return { monthsToReach: Math.ceil(targetAmount / monthlySavings) };
}
