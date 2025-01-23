const agents = [
  { id: 1, name: '株式会社A不動産', area: '東京都港区', tel: '03-1234-5678' },
  { id: 2, name: 'B不動産株式会社', area: '東京都渋谷区', tel: '03-9876-5432' },
  // ... 他のエージェントデータ
];

export const getAgent = (id) => {
  // 実際にはAPIからデータを取得する処理などを記述
  return new Promise((resolve) => {
    setTimeout(() => {
      const agent = agents.find((agent) => agent.id === parseInt(id));
      resolve(agent);
    }, 500);
  });
};

export const getAgents = () => {  // 追加
  // 実際にはAPIからデータを取得する処理などを記述
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(agents);
    }, 500);
  });
};