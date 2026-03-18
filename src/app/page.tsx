"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import type { ExpenseCategories, CalculationResult, TabId } from "@/types";
import { CATEGORY_LABELS } from "@/lib/constants";
import { calculatePortfolio, calculateBudgetComparison, calculateInvestmentAllocations } from "@/lib/calculations";
import ExpenseForm from "@/components/ExpenseForm";
import TabNavigation from "@/components/TabNavigation";
import OverviewChart from "@/components/OverviewChart";
import BudgetComparison from "@/components/BudgetComparison";
import InvestmentRecommendations from "@/components/InvestmentRecommendations";
import SavingsGoalTracker from "@/components/SavingsGoalTracker";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const INITIAL_EXPENSES: Record<string, string> = Object.fromEntries(
  Object.keys(CATEGORY_LABELS).map((k) => [k, "0"])
);

export default function Home() {
  const [salary, setSalary] = useState("");
  const [expenses, setExpenses] = useState<Record<string, string>>(INITIAL_EXPENSES);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [error, setError] = useState("");

  function handleCalculate() {
    setError("");
    const salaryNum = parseFloat(salary);
    if (!salaryNum || salaryNum <= 0) {
      setError("Please enter a valid salary");
      return;
    }

    const parsed: ExpenseCategories = {
      emi: parseFloat(expenses.emi) || 0,
      rent: parseFloat(expenses.rent) || 0,
      groceries: parseFloat(expenses.groceries) || 0,
      utilities: parseFloat(expenses.utilities) || 0,
      transport: parseFloat(expenses.transport) || 0,
      entertainment: parseFloat(expenses.entertainment) || 0,
      other: parseFloat(expenses.other) || 0,
    };

    if (Object.values(parsed).some((v) => v < 0)) {
      setError("Expense values cannot be negative");
      return;
    }

    setResult(calculatePortfolio(salaryNum, parsed));
    setActiveTab("overview");
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-center text-3xl font-bold text-[#2c3e50] mb-6">
        Investment Portfolio Calculator
      </h1>

      <ExpenseForm
        salary={salary}
        setSalary={setSalary}
        expenses={expenses}
        setExpenses={setExpenses}
        onCalculate={handleCalculate}
        error={error}
      />

      {result && (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === "overview" && <OverviewChart result={result} />}

          {activeTab === "budget" && (
            <BudgetComparison
              comparison={calculateBudgetComparison(result.salary, result.expenses)}
            />
          )}

          {activeTab === "investments" && (
            <InvestmentRecommendations
              allocations={calculateInvestmentAllocations(result.savings)}
              monthlySavings={result.savings}
            />
          )}

          {activeTab === "goals" && (
            <SavingsGoalTracker
              goalName={goalName}
              setGoalName={setGoalName}
              goalTarget={goalTarget}
              setGoalTarget={setGoalTarget}
              monthlySavings={result.savings}
            />
          )}
        </div>
      )}
    </div>
  );
}
