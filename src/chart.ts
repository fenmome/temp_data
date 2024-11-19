import * as echarts from 'echarts';

export function initChart() {
  const chartDom = document.getElementById('chart')!;
  const chart = echarts.init(chartDom);
  
  const option = {
    title: {
      text: 'Temperature Trends',
      left: 'center',
      top: 0,
      textStyle: {
        fontSize: 24,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        const date = new Date(params[0].value[0]);
        return `${date.toLocaleString()}<br/>
                Temperature: ${params[0].value[1]}°C`;
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: '{MM}-{dd} {HH}:{mm}'
      }
    },
    yAxis: {
      type: 'value',
      name: 'Temperature (°C)',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: 'Temperature',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      sampling: 'lttb',
      itemStyle: {
        color: '#0066cc'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(0,102,204,0.3)'
          },
          {
            offset: 1,
            color: 'rgba(0,102,204,0.1)'
          }
        ])
      },
      data: []
    }]
  };

  chart.setOption(option);
  
  window.addEventListener('resize', () => {
    chart.resize();
  });

  return chart;
}