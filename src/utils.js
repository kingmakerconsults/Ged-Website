export function unescapeHtml(safe) {
    if (!safe) return '';
    return safe.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
}

export function cleanRepeatedText(text) {
    if (!text || typeof text !== 'string') return text;
    const half = Math.floor(text.length / 2);
    if (text.length % 2 === 0) {
        const firstHalf = text.substring(0, half);
        const secondHalf = text.substring(half);
        if (firstHalf === secondHalf) {
            return firstHalf;
        }
    }
    return text;
}

export function parseHtmlTable(htmlString) {
    if (typeof DOMParser === 'undefined') return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const table = doc.querySelector('table');
    if (!table) return null;
    const headers = [...table.querySelectorAll('th')].map(th => th.innerText);
    const rows = [...table.querySelectorAll('tbody tr')];
    const labels = rows.map(row => row.querySelector('td')?.innerText || '');
    const datasets = [];
    for (let i = 1; i < headers.length; i++) {
        datasets.push({
            label: headers[i],
            data: rows.map(row => parseFloat(row.querySelectorAll('td')[i]?.innerText.replace(/[^0-9.-]+/g,"")) || 0),
            backgroundColor: `rgba(59, 130, 246, 0.6)`,
        });
    }
    return { labels, datasets };
}

export const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
        return [];
    }
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
