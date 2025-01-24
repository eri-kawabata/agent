const agents = [
  {
    id: 1,
    name: '株式会社A不動産',
    area: '東京都港区',
    tel: '03-1234-5678',
    lat: 35.658581,
    lng: 139.745433,
    image: 'https://example.com/agent1.jpg', // ダミー画像URL
    description: '港区専門の不動産会社です。',
    email: 'info@agent1.co.jp'
  },
  {
    id: 2,
    name: 'B不動産株式会社',
    area: '東京都渋谷区',
    tel: '03-9876-5432',
    lat: 35.659108,
    lng: 139.703728,
    image: 'https://example.com/agent2.jpg', // ダミー画像URL
    description: '渋谷区専門の不動産会社です。',
    email: 'info@agent2.co.jp'
  },
  // ... 他のエージェントデータ
];

export const getAgent = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const agent = agents.find((agent) => agent.id === id);
      if (agent) {
        resolve(agent);
      } else {
        reject(new Error(`Agent with ID ${id} not found.`));
      }
    }, 500);
  });
};

export const getAgents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(agents);
    }, 500);
  });
};