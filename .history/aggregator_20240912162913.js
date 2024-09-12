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
async function fetchDataWithCache(url1, url2) {
    const cacheKey = `${url1}-${url2}`;
  
    // 从缓存中获取数据
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  
    // 缓存中没有数据，从后端服务获取并存入缓存
    const aggregatedData = await fetchData(url1, url2);
    cache.set(cacheKey, aggregatedData);
  
    return aggregatedData;
  }

  module.exports = { fetchDataWithCache };
// module.exports = { fetchData };