import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const salary = parseFloat(data.salary ?? 0);
    const emi = parseFloat(data.emi ?? 0);
    const otherExpenses = parseFloat(data.other_expenses ?? 0);

    if ([salary, emi, otherExpenses].some(isNaN)) {
      return NextResponse.json(
        { error: "Invalid numeric values" },
        { status: 400 }
      );
    }

    if ([salary, emi, otherExpenses].some((x) => x < 0)) {
      return NextResponse.json(
        { error: "Negative values are not allowed" },
        { status: 400 }
      );
    }

    const totalExpenses = emi + otherExpenses;
    const savings = Math.max(0, salary - totalExpenses);

    return NextResponse.json({
      expenses: Math.round(totalExpenses * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      expense_ratio:
        salary > 0
          ? Math.round((totalExpenses / salary) * 100 * 100) / 100
          : 0,
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
