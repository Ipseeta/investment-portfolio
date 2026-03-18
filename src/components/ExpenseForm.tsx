import CurrencyInput from './CurrencyInput';
import type { ExpenseCategories } from '@/types';
import { CATEGORY_LABELS } from '@/lib/constants';

interface ExpenseFormProps {
  salary: string;
  setSalary: (v: string) => void;
  expenses: Record<string, string>;
  setExpenses: (expenses: Record<string, string>) => void;
  onCalculate: () => void;
  error: string;
}

const EXPENSE_KEYS = Object.keys(CATEGORY_LABELS) as (keyof ExpenseCategories)[];

export default function ExpenseForm({ salary, setSalary, expenses, setExpenses, onCalculate, error }: ExpenseFormProps) {
  function updateExpense(key: string, value: string) {
    setExpenses({ ...expenses, [key]: value });
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <CurrencyInput id="salary" label="Monthly In-Hand Salary" value={salary} onChange={setSalary} />

      <h3 className="font-semibold text-sm text-gray-600 mt-4 mb-2 uppercase tracking-wide">Expenses</h3>
      <div className="grid grid-cols-2 gap-x-4">
        {EXPENSE_KEYS.map((key) => (
          <CurrencyInput
            key={key}
            id={key}
            label={CATEGORY_LABELS[key]}
            value={expenses[key] || '0'}
            onChange={(v) => updateExpense(key, v)}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button
        onClick={onCalculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-2"
      >
        Calculate Portfolio
      </button>
    </div>
  );
}
