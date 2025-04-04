// script.js
function addInput() {
    const div = document.createElement('div');
    div.classList.add('input-group');
    div.innerHTML = `
      <label>Label:</label> <input type="text" name="label" required>
      <label>Value:</label> <input type="number" name="value" required>`;
    document.getElementById('inputs').appendChild(div);
  }
  
  function toggleMode() {
    document.body.classList.toggle('dark-mode');
    generateChart();
  }
  
  document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateChart();
  });
  
  function generateChart() {
    const formData = new FormData(document.getElementById('dataForm'));
    const labels = formData.getAll('label');
    const values = formData.getAll('value').map(Number);
    const chartType = document.querySelector('input[name="chartType"]:checked').value;
    const isDark = document.body.classList.contains('dark-mode');
    const barColor = isDark ? '#66ccff' : '#3399ff';
    const lineColor = isDark ? '#ffc300' : '#ff5733';
  
    const width = 600, height = 300;
    const spacing = 100;
    const barWidth = 60;
    const maxValue = Math.max(...values);
  
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  
    if (chartType === 'bar') {
      labels.forEach((label, i) => {
        const x = i * spacing + 40;
        const value = values[i];
        const y = height - value;
        svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${value}" fill="${barColor}" />`;
        svg += `<text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" fill="${isDark ? '#f4f4f9' : '#1e1e2f'}">${value}</text>`;
        svg += `<text x="${x + barWidth/2}" y="295" text-anchor="middle" fill="${isDark ? '#f4f4f9' : '#1e1e2f'}">${label}</text>`;
      });
    } else if (chartType === 'line') {
      let points = labels.map((_, i) => `${i * spacing + 70},${height - values[i]}`).join(' ');
      svg += `<polyline points="${points}" fill="none" stroke="${lineColor}" stroke-width="3" />`;
      labels.forEach((label, i) => {
        const cx = i * spacing + 70;
        const cy = height - values[i];
        svg += `<circle cx="${cx}" cy="${cy}" r="5" fill="${lineColor}" />`;
        svg += `<text x="${cx}" y="${cy - 10}" text-anchor="middle" fill="${isDark ? '#f4f4f9' : '#1e1e2f'}">${values[i]}</text>`;
        svg += `<text x="${cx}" y="295" text-anchor="middle" fill="${isDark ? '#f4f4f9' : '#1e1e2f'}">${label}</text>`;
      });
    }
  
    svg += '</svg>';
    document.getElementById('chart').innerHTML = svg;
  }
  