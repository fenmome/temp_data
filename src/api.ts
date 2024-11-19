import axios from 'axios';

interface TemperatureData {
  timestamp: string;
  temperature: number;
}

export async function fetchData(startDate?: string, endDate?: string): Promise<TemperatureData[]> {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    const response = await axios.get<TemperatureData[]>('http://localhost:5000/temperatures', {
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}