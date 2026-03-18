import { Bar } from 'react-chartjs-2';
import type { BudgetComparison as BudgetComparisonType } from '@/types';
import { BUDGET_COLORS } from '@/lib/constants';

interface BudgetComparisonProps {
  comparison: BudgetComparisonType;
}

export default function BudgetComparison({ comparison }: BudgetComparisonProps) {
  const chartData = {
    labels: ['Needs (50%)', 'Wants (30%)', 'Savings (20%)'],
    datasets: [
      {
        label: 'Actual',
        data: [comparison.actual.needs, comparison.actual.wants, comparison.actual.savings],
        backgroundColor: BUDGET_COLORS.actual,
      },
      {
        label: 'Recommended (50/30/20)',
        data: [comparison.recommended.needs, comparison.recommended.wants, comparison.recommended.savings],
        backgroundColor: BUDGET_COLORS.recommended,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      datalabels: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => `₹${Number(value).toLocaleString('en-IN')}`,
        },
      },
    },
  };

  const { actual: a, recommended: r } = comparison;

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">50/30/20 Budget Rule</h3>
      <Bar data={chartData} options={options} />
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="bg-blue-50 rounded p-3">
          <div className="font-medium text-blue-800">Needs</div>
          <div>Actual: ₹{a.needs.toLocaleString('en-IN')}</div>
          <div>Target: ₹{r.needs.toLocaleString('en-IN')}</div>
          <div className={a.needs > r.needs ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
            {a.needs > r.needs ? `₹${(a.needs - r.needs).toLocaleString('en-IN')} over` : 'On track'}
          </div>
        </div>
        <div className="bg-purple-50 rounded p-3">
          <div className="font-medium text-purple-800">Wants</div>
          <div>Actual: ₹{a.wants.toLocaleString('en-IN')}</div>
          <div>Target: ₹{r.wants.toLocaleString('en-IN')}</div>
          <div className={a.wants > r.wants ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
            {a.wants > r.wants ? `₹${(a.wants - r.wants).toLocaleString('en-IN')} over` : 'On track'}
          </div>
        </div>
        <div className="bg-green-50 rounded p-3">
          <div className="font-medium text-green-800">Savings</div>
          <div>Actual: ₹{a.savings.toLocaleString('en-IN')}</div>
          <div>Target: ₹{r.savings.toLocaleString('en-IN')}</div>
          <div className={a.savings < r.savings ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
            {a.savings < r.savings ? `₹${(r.savings - a.savings).toLocaleString('en-IN')} short` : 'On track'}
          </div>
        </div>
      </div>
    </div>
  );
}
