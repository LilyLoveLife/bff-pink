const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 设置缓存过期时间为 60 秒

async function fetchData(url1, url2) {
  try {
    const [response1, response2] = await Promise.all([
      axios.get(url1),
      axios.get(url2)
    ]);

    // 数据转换示例
    const data1 = response1.data;
    const data2 = response2.data;

    // 聚合数据
    const aggregatedData = {
      data1,
      data2
    };

    return aggregatedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = { fetchData };