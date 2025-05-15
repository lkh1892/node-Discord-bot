# 디스코드 CHAT 봇
간단한 디스코드 메시지 응답봇입니다. 이 봇은 채팅에서  `!재생` 명령어를 입력하면 "노래를 재생합니다."라는 메시지로 응답하는 기본 예제입니다.


## 준비 사항
### 필요한 프로그램  
- Node.js(LTS 버전 권장)  
- npm(Node.js와 함께 설치됨)


### 디스코드 봇 생성하기  
1. [Discord Developer Portal][1]에 접속합니다.  
2. **"New Application"** 버튼을 클릭하고 애플리케이션 이름을 입력합니다.  
3. 왼쪽 메뉴에서 **"Bot"**을 클릭하고 **"Add Bot"** 버튼을 클릭합니다.  
4. **"Reset Token"** 버튼을 클릭하여 토큰을 생성하고 복사합니다. 이 토큰은 안전하게 보관하세요!  
5. ***"MESSAGE CONTENT INTENT"**를 활성화하고 **"Save Changes"** 버튼을 클릭합니다.  

[1]: https://discord.com/developers/applications

### 봇 초대하기  

1. 왼쪽 메뉴에서 **"OAuth2"** > **"URL Generator"**를 클릭합니다.
2. **"SCOPES"**에서 **"bot"**을 선택합니다.
3. **"BOT PERMISSIONS"**에서 최소한 **"Send Messages"**와 **"Read Message History"**를 선택합니다.
4. 생성된 **URL**을 복사하여 웹 브라우저에 붙여넣고, 봇을 추가할 서버를 선택합니다.

### 프로젝트 초기화하기  

다음 명령어로 새Node.js 프로젝트를 초기화합니다.  
```bash
npm init -y
```
이 명령어는 `package.json` 파일을 생성합니다. 이 파일은 프로젝트의 정보와 의존성(사용할 패키지)을 관리합니다.

### Discord.js 패키지 설치하기

Discord.js는 Discord API를 쉽게 사용할 수 있게 해주는 라이브러리입니다.  
```bash
npm install discord.js

```

#### 프로젝트 폴더에 `bot.js` (또는 원하는 파일명) 파일을 생성하고 다음 코드를 작성합니다:

```javascript
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
client.login('YOUR_BOT_TOKEN'); // 여기에 봇 토큰을 입력하세요
```

`YOUR_BOT_TOKEN` 부분을 실제 봇 토큰으로 교체합니다.

### 실행 방법
터미널에서 다음 명령어를 실행하여 봇을 시작합니다:  

```bash
node bot.js
```

### 사용 방법
디스코드 서버의 텍스트 채널에서 다음 명령어를 입력하여 봇을 테스트할 수 있습니다:

- `!재생` - 봇이 "노래를 재생합니다." 메시지로 응답합니다.

### 코드 설명

- 클라이언트 생성: 봇의 기본 인스턴스를 생성하고 필요한 권한(인텐트)을 설정합니다.
- 이벤트 핸들러:

    - `ready` 이벤트: 봇이 시작될 때 실행됩니다.  
    - `messageCreate` 이벤트: 새 메시지가 생성될 때마다 실행됩니다.


- 명령어 처리: 메시지 내용이 `!재생`과 일치하면 응답합니다.