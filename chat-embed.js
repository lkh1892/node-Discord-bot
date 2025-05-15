// Discord.js 라이브러리 불러오기
const { Client, GatewayIntentBits, EmbedBuilder, Colors, ActivityType } = require('discord.js');

// 봇 클라이언트 생성하기
const client = new Client({
  // 봇이 필요로 하는 권한(인텐트) 설정
  intents: [
    GatewayIntentBits.Guilds,           // 서버 정보 접근
    GatewayIntentBits.GuildMessages,    // 서버 메시지 접근
    GatewayIntentBits.MessageContent    // 메시지 내용 읽기
  ]
});

// 명령어 접두사 설정
const prefix = '!';

// 봇이 준비되었을 때 실행될 이벤트 핸들러
client.once('ready', () => {
    console.log(`${client.user.tag} 봇이 온라인이 되었습니다!`);
    // 봇 상태 메시지 설정
    client.user.setActivity(`${prefix}도움말`, { type: ActivityType.Playing });
  });

  // 메시지가 생성될 때 실행될 이벤트 핸들러
client.on('messageCreate', async (message) => {
    // 봇이 보낸 메시지는 무시 (무한 루프 방지)
    if (message.author.bot) return;

    // 명령어가 아닌 메시지는 무시
    if (!message.content.startsWith(prefix)) return;

    // 명령어와 인자 분리
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // switch 문을 사용한 명령어 처리 - 코드를 더 깔끔하게 관리
    switch (command) {
        case '도움말' :
            sendHelpEmbed(message);
            break;
        case '재생' :
            play(message);
            break;
        case '스킵' :
            skip(message);
            break;
        case '색상' :
            if (args.length > 0) {
                changeColorEmbed(message, args[0].toLowerCase());
            } else {
                message.reply('색상을 지정해주세요! 예: !색상 빨강');
            }
            break;
        default:
            message.reply(`알 수 없는 명령어입니다. \`${prefix}도움말\`을 입력하여 사용 가능한 명령어를 확인하세요.`);
            break;
    }

});


// 도움말 임베드 메시지 전송
function sendHelpEmbed(message) {
    const helpEmbed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle('🔍 도움말 - 사용 가능한 명령어')
        .setDescription('이 봇에서 사용 가능한 명령어 목록입니다.')
        .addFields(
            { name: `${prefix}도움말` , value: '사용 가능한 명령어 목록을 보여줍니다.' },
            { name: `${prefix}재생` , value: '재생 문자 출력' },
            { name: `${prefix}스킵` , value: '스킵 문자 출력' },
            { name: `${prefix}색상` , value: '지정한 색상의 임베드 메시지를 보여줍니다. (빨강, 파랑, 초록, 노랑, 보라)' }
        )
        .setFooter({ text: '임베드 메시지 예제', iconURL: client.user.displayAvatarURL()})
        .setTimestamp();

    message.channel.send({ embeds: [helpEmbed] });
}

// 봇 정보 임베드 메시지 전송
function sendInfoEmbed(message) {
    const infoEmbed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle('ℹ️ 봇 정보')
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: '봇 이름', value: client.user.username, inline: true },
            { name: '생성일', value: `<t:${Math.floor(client.user.createdAt.getTime() / 1000)}:F>`, inline: true },
            { name: '서버 수', value: `${client.guilds.cache.size}개`, inline: true },
            { name: '지연 시간', value: `${client.ws.ping}ms`, inline: true },
            { name: '노드 버전', value: process.version, inline: true },
            { name: 'Discord.js 버전', value: require('discord.js').version, inline: true }
        )
        .setDescription('다중 명령어와 임베드 메시지 예제 봇입니다.')
        .setFooter({ text: '임베드 메시지 예제', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();
    
    message.channel.send({ embeds: [infoEmbed] });
  }


  // 색상 변경 임베드 메시지
function changeColorEmbed(message, colorName) {
    const colorMap = {
      '빨강': Colors.Red,
      '파랑': Colors.Blue,
      '초록': Colors.Green,
      '노랑': Colors.Yellow,
      '보라': Colors.Purple
    };

if (!colorMap[colorName]) {
    message.reply('사용 가능한 색상: 빨강. 파랑, 초록, 노랑, 보라');
    return;
}

const colorEmbed = new EmbedBuilder()
    .setColor(colorMap[colorName])
    .setTitle(`🎨 ${colorName} 색상`)
    .setDescription(`이것은 **${colorName}** 색상의 임베드 메시지입니다!`)
    .addFields(
      { name: '선택한 색상', value: colorName, inline: true },
      { name: '요청한 사용자', value: message.author.toString(), inline: true }
    )
    .setFooter({ text: '임베드 메시지 예제', iconURL: client.user.displayAvatarURL() })
    .setTimestamp();
  
  message.channel.send({ embeds: [colorEmbed] });
}

function play(message) {
    const playEmbed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle('🎵 음악 재생')  // 제목 수정
        .setDescription(`${message.author.toString()}님의 요청으로 노래를 재생합니다.`)  // 설명 수정
        .addFields(
            { name: '재생 기능', value: '음악 재생 기능 예시입니다', inline: true },
            { name: '요청자', value: message.author.toString(), inline: true }
        )  // 필드 추가
        .setFooter({ text: '임베드 메시지 예제', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    message.channel.send({ embeds: [playEmbed] });  // 올바른 임베드 사용
}


// 스킵 명령어 처리 함수
function skip(message) {
    const skipEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle('⏭️ 음악 스킵')  // 제목 수정
        .setDescription(`${message.author.toString()}님의 요청으로 다음 노래로 넘어갑니다.`)  // 설명 수정
        .addFields(
            { name: '스킵 기능', value: '현재 재생 중인 노래를 건너뛰는 기능입니다', inline: true },
            { name: '요청자', value: message.author.toString(), inline: true }
        )  // 필드 추가
        .setFooter({ text: '임베드 메시지 예제', iconURL: client.user.displayAvatarURL() })
        .setTimestamp();

    message.channel.send({ embeds: [skipEmbed] });  // 올바른 임베드 사용
}

client.login('');