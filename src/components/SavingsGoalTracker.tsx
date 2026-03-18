import CurrencyInput from './CurrencyInput';
import { calculateSavingsGoal } from '@/lib/calculations';

interface SavingsGoalTrackerProps {
  goalName: string;
  setGoalName: (v: string) => void;
  goalTarget: string;
  setGoalTarget: (v: string) => void;
  monthlySavings: number;
}

export default function SavingsGoalTracker({ goalName, setGoalName, goalTarget, setGoalTarget, monthlySavings }: SavingsGoalTrackerProps) {
  const target = parseFloat(goalTarget) || 0;
  const { monthsToReach } = calculateSavingsGoal(target, monthlySavings);
  const hasGoal = target > 0 && goalName.trim().length > 0;
  const progressPercent = hasGoal && monthsToReach !== Infinity
    ? Math.min(100, Math.round((monthlySavings / target) * 100))
    : 0;

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Savings Goal Tracker</h3>

      <div className="mb-3">
        <label htmlFor="goalName" className="block mb-1 font-medium text-sm">Goal Name</label>
        <input
          type="text"
          id="goalName"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="e.g., Emergency Fund, Vacation, Car"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <CurrencyInput id="goalTarget" label="Target Amount" value={goalTarget} onChange={setGoalTarget} />

      {monthlySavings <= 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800 text-sm">
          You currently have no monthly savings. Reduce expenses to start saving toward your goal.
        </div>
      )}

      {hasGoal && monthlySavings > 0 && (
        <div className="bg-white border border-gray-200 rounded p-4 mt-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{goalName}</span>
            <span className="text-gray-600">
              {monthsToReach === Infinity
                ? 'N/A'
                : `${monthsToReach} month${monthsToReach !== 1 ? 's' : ''}`}
              {monthsToReach > 12 && monthsToReach !== Infinity && (
                <span className="text-gray-400"> ({(monthsToReach / 12).toFixed(1)} years)</span>
              )}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹{monthlySavings.toLocaleString('en-IN')}/month</span>
            <span>₹{target.toLocaleString('en-IN')} target</span>
          </div>
        </div>
      )}
    </div>
  );
}
