// Discord.js 라이브러리 불러오기
const { Client, GatewayIntentBits, EmbedBuilder, Colors } = require('discord.js');

// 봇 클라이언트 생성하기
const client = new Client({
  // 봇이 필요로 하는 권한(인텐트) 설정
  intents: [
    GatewayIntentBits.Guilds,           // 서버 정보 접근
    GatewayIntentBits.GuildMessages,    // 서버 메시지 접근
    GatewayIntentBits.MessageContent    // 메시지 내용 읽기
  ]
});


const prefix = '!';

// 봇이 준비되었을 때 실행될 이벤트 핸들러
client.once('ready', () => {
  console.log(`${client.user.tag} 봇이 온라인이 되었습니다!`);
});