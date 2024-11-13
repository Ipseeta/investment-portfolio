function submitForm() {
    const salary = parseFloat(document.getElementById("salary").value);
    const emi = parseFloat(document.getElementById("emi").value) || 0;
    const other_expenses = parseFloat(document.getElementById("other_expenses").value) || 0;

    fetch("/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ salary, emi, other_expenses })
    })
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById("chart").getContext("2d");
        if (window.myChart) window.myChart.destroy();

        window.myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["Expenses", "Savings"],
                datasets: [{
                    data: [data.expenses, data.savings],
                    backgroundColor: ["#FF6384", "#36A2EB"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    datalabels: {
                        formatter: (value, context) => {
                            const data = context.chart.data.datasets[0].data;
                            const total = data.reduce((acc, val) => acc + val, 0);
                            if (total === 0) {
                                return '0%';
                            } else {
                                const percentage = (value / total * 100).toFixed(2) + '%';
                                return percentage;
                            }
                        },
                        color: '#fff',
                        font: {
                            weight: 'bold'
                        }
                    },
                },
            },
            plugins: [ChartDataLabels]
        });
    })
    .catch(error => console.error("Error:", error));
}
