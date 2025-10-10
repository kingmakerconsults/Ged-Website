import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';

function ChartDisplay({ chartData }) {
    const chartRef = useRef(null);
    useEffect(() => {
        if (chartRef.current && chartData) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'bar',
                data: { labels: chartData.labels, datasets: chartData.datasets },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0 // This line disables all animations
                    }
                }
            });
            return () => chartInstance.destroy();
        }
    }, [chartData]);
    return (
        <div className="relative h-[400px]">
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default ChartDisplay;
