"use client";

import { useState, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface CalculationResult {
  expenses: number;
  savings: number;
  expense_ratio: number;
}

export default function Home() {
  const [salary, setSalary] = useState("");
  const [emi, setEmi] = useState("0");
  const [otherExpenses, setOtherExpenses] = useState("0");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState("");
  const chartRef = useRef(null);

  async function handleSubmit() {
    setError("");
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salary: parseFloat(salary),
          emi: parseFloat(emi) || 0,
          other_expenses: parseFloat(otherExpenses) || 0,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Calculation failed");
        return;
      }
      setResult(data);
    } catch {
      setError("Error connecting to server");
    }
  }

  const chartData = result
    ? {
        labels: ["Expenses", "Savings"],
        datasets: [
          {
            data: [result.expenses, result.savings],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      datalabels: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (value: number, context: any) => {
          const data = context.chart.data.datasets[0].data as number[];
          const total = data.reduce((acc: number, val: number) => acc + val, 0);
          if (total === 0) return "0%";
          return (value / total * 100).toFixed(2) + "%";
        },
        color: "#fff",
        font: { weight: "bold" as const },
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-center text-3xl font-bold text-[#2c3e50] mb-6">
        Investment Portfolio Calculator
      </h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label htmlFor="salary" className="block mb-1 font-medium">
            Monthly In-Hand Salary
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              &#8377;
            </span>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="emi" className="block mb-1 font-medium">
            Mandatory EMIs
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              &#8377;
            </span>
            <input
              type="number"
              id="emi"
              value={emi}
              onChange={(e) => setEmi(e.target.value)}
              className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="other_expenses" className="block mb-1 font-medium">
            Other Expenses
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              &#8377;
            </span>
            <input
              type="number"
              id="other_expenses"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="flex-1 border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate Portfolio
        </button>
      </div>

      {chartData && (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <Pie ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
