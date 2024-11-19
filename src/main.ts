import './style.css';
import { initChart } from './chart';
import { fetchData } from './api';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="min-h-screen">
    <header class="bg-black bg-opacity-90 text-white py-6 fixed w-full top-0 z-50">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-medium">Temperature Monitor</h1>
      </div>
    </header>
    
    <main class="container mx-auto px-4 pt-24 pb-12">
      <div class="bg-white rounded-2xl shadow-lg p-6 mt-8">
        <div class="flex flex-wrap gap-4 mb-6">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input type="datetime-local" id="startDate" 
                   class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="datetime-local" id="endDate"
                   class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="flex items-end">
            <button id="filterBtn" 
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Filter
            </button>
          </div>
        </div>
        <div id="chart" class="w-full h-[600px]"></div>
      </div>
    </main>
  </div>
`;

// Initialize chart
const chart = initChart();

// Add event listener for filter button
document.getElementById('filterBtn')?.addEventListener('click', async () => {
  const startDate = (document.getElementById('startDate') as HTMLInputElement).value;
  const endDate = (document.getElementById('endDate') as HTMLInputElement).value;
  
  if (!startDate || !endDate) {
    alert('Please select both start and end dates');
    return;
  }

  const data = await fetchData(startDate, endDate);
  chart.setOption({
    series: [{
      data: data.map(item => [item.timestamp, item.temperature])
    }]
  });
});