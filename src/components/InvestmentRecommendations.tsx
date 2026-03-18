import { Doughnut } from 'react-chartjs-2';
import type { InvestmentAllocation } from '@/types';
import { INVESTMENT_COLORS } from '@/lib/constants';

interface InvestmentRecommendationsProps {
  allocations: InvestmentAllocation[];
  monthlySavings: number;
}

export default function InvestmentRecommendations({ allocations, monthlySavings }: InvestmentRecommendationsProps) {
  if (monthlySavings <= 0) {
    return (
      <div>
        <h3 className="font-semibold text-lg mb-3">Investment Recommendations</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
          No savings available to invest. Try reducing your expenses first.
        </div>
      </div>
    );
  }

  const chartData = {
    labels: allocations.map((a) => a.label),
    datasets: [
      {
        data: allocations.map((a) => a.percentage),
        backgroundColor: INVESTMENT_COLORS.slice(0, allocations.length),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' as const },
      datalabels: {
        formatter: (value: number) => `${value}%`,
        color: '#fff',
        font: { weight: 'bold' as const },
      },
    },
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Investment Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="max-w-[280px] mx-auto">
          <Doughnut data={chartData} options={options} />
        </div>
        <div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Investment</th>
                <th className="text-right py-2">%</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((a) => (
                <tr key={a.label} className="border-b border-gray-100">
                  <td className="py-2">{a.label}</td>
                  <td className="text-right">{a.percentage}%</td>
                  <td className="text-right">₹{a.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 text-xs text-gray-500">
            Based on monthly savings of ₹{monthlySavings.toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}
