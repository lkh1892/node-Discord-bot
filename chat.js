// Discord.js 라이브러리 불러오기
const { Client, GatewayIntentBits } = require('discord.js');

// 봇 클라이언트 생성하기
const client = new Client({
  // 봇이 필요로 하는 권한(인텐트) 설정
  intents: [
    GatewayIntentBits.Guilds,           // 서버 정보 접근
    GatewayIntentBits.GuildMessages,    // 서버 메시지 접근
    GatewayIntentBits.MessageContent    // 메시지 내용 읽기
  ]
});

// 봇이 준비되었을 때 실행될 이벤트 핸들러
client.once('ready', () => {
  console.log(`${client.user.tag} 봇이 온라인이 되었습니다!`);
});

// 메시지가 생성될 때 실행될 이벤트 핸들러
client.on('messageCreate', (message) => {
  // 봇이 보낸 메시지는 무시 (무한 루프 방지)
  if (message.author.bot) return;
  
  // 메시지가 '!재생'으로 시작하는지 확인
  if (message.content === '!재생') {
    // '노래를 재생합니다.' 메시지 전송
    message.channel.send('노래를 재생합니다.');
  }
});

// 디스코드 토큰으로 봇 로그인하기
// 아래 'YOUR_BOT_TOKEN'을 위에서 복사한 토큰으로 교체하세요
client.login('');