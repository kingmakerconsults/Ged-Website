import Chart from 'chart.js/auto';

function parseHtmlTable(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const table = doc.querySelector('table');
  if (!table) return null;
  const headers = [...table.querySelectorAll('th')].map((th) => th.innerText);
  const rows = [...table.querySelectorAll('tbody tr')];
  const labels = rows.map((row) => row.querySelector('td')?.innerText || '');
  const datasets = [];
  for (let i = 1; i < headers.length; i++) {
    datasets.push({
      label: headers[i],
      data: rows.map(
        (row) =>
          parseFloat(
            row.querySelectorAll('td')[i]?.innerText.replace(/[^0-9.-]+/g, '')
          ) || 0
      ),
      backgroundColor: `rgba(59, 130, 246, 0.6)`,
    });
  }
  return { labels, datasets };
}

function ChartDisplay({ chartData, html }) {
  if (typeof html === 'string' && html.includes('<table')) return null;
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return (
      <div style={{ color: 'red' }}>No or invalid graph data provided.</div>
    );
  }

  const chartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  React.useEffect(() => {
    if (!chartRef.current || !chartData) return;
    if (chartInstanceRef.current) {
      try {
        chartInstanceRef.current.destroy();
      } catch (e) {}
      chartInstanceRef.current = null;
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'bar',
      data: { labels: chartData.labels, datasets: chartData.datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
        } catch (e) {}
        chartInstanceRef.current = null;
      }
    };
  }, [chartData]);

  return <canvas ref={chartRef} />;
}

export { parseHtmlTable }; // If external use is needed
export default ChartDisplay;

if (typeof window !== 'undefined') {
  window.Components = window.Components || {};
  window.Components.ChartDisplay = ChartDisplay;
}
