// // src/utils/echarts-worker.js
// self.addEventListener('message', (e) => {
//     const { rawData, chartType } = e.data;
    
//     // 在 Worker 中执行耗时数据处理（示例：处理 10 万条数据）
//     const processedData = heavyDataProcessing(rawData); 
    
//     // 生成最终 options（注意：不能包含函数等不可序列化内容）
//     const options = {
//       xAxis: { type: 'category', data: processedData.x },
//       yAxis: { type: 'value' },
//       series: [{
//         type: chartType,
//         data: processedData.y,
//         // 大数据量必须开启 large 模式
//         large: true,
//         largeThreshold: 2000 
//       }]
//     };
  
//     self.postMessage({ options });
//   });
  
//   function heavyDataProcessing(rawData) {
//     // 模拟复杂计算（排序/过滤/聚合等）
//     return {
//       x: rawData.map(item => item.date),
//       y: rawData.map(item => item.value)
//     };
//   }