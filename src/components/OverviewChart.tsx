import { Pie } from 'react-chartjs-2';
import type { CalculationResult } from '@/types';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/constants';

interface OverviewChartProps {
  result: CalculationResult;
}

export default function OverviewChart({ result }: OverviewChartProps) {
  const expenseKeys = Object.keys(result.expenses) as (keyof typeof result.expenses)[];
  const labels = [...expenseKeys.map((k) => CATEGORY_LABELS[k]), 'Savings'];
  const data = [...expenseKeys.map((k) => result.expenses[k]), result.savings];
  const colors = [...expenseKeys.map((k) => CATEGORY_COLORS[k]), CATEGORY_COLORS.savings];

  const chartData = {
    labels,
    datasets: [{ data, backgroundColor: colors }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      datalabels: {
        formatter: (value: number) => {
          const total = data.reduce((a, b) => a + b, 0);
          if (total === 0) return '0%';
          const pct = ((value / total) * 100).toFixed(1);
          return value > 0 ? `${pct}%` : '';
        },
        color: '#fff',
        font: { weight: 'bold' as const, size: 11 },
      },
    },
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Expense Breakdown</h3>
      <Pie data={chartData} options={options} />
      <div className="mt-4 text-sm text-gray-600 text-center">
        Total Expenses: ₹{result.totalExpenses.toLocaleString('en-IN')} | Savings: ₹{result.savings.toLocaleString('en-IN')} | Expense Ratio: {result.expenseRatio}%
      </div>
    </div>
  );
}
