# 괴식닷컴 MERN(MongoDB + Express + React + NodsJS)
C9(Ubuntu 16.04 기준) - C9.io 에서 blank project를 생성한 후에 시작하자

## 기본설명 - 먼스택이 먼가요?
먼스택이란! 웹애플리케이션을 빠르게 구축할 수 있는 프레임워크 스택을 말한다. 빠르게 찾고 빠르게 삽입 할 수 있는 장점을 가진 오픈소스 NoSQL 데이터베이스인 몽고디비와 가장 빠르게 구성이 가능한 API서버 NodeJS + Express과 
가상DOM을 사용해서 자동 리프레싱을 쉽게 구현할 수 있는 ReactJS로 구성 되어 있다. 스택 구성은 아래처럼 사용한다.
- frontend : ReactJS
- backend(server) : NodeJS + Express
- database : MongoDB

사용하려는 기술에 대한 기본설명(+설치방법)이 적혀 있고, 설치방법이 적혀있는데 <span style="background-color:red;font-weight:bold;color:white">아래쪽에 이것만 하면 된다가 있으니, 맨아래로 이동하자</span>


### 0. git : repository 버젼관리 시스템
    github은 온라인상의 스토리지를 통해 개발코드 버젼관리를 쉽게 도와준다. 
    각 부분에 맞춰서 commit 을 할경우에 해당 개발 상황까지의 상태가 등록이 되고
    commit 메시지로 찾기를 할 수가 있어, 이전에는 되다가 후에 안되는 기능이 있을 때
    이전상태로 되돌릴 수도 있다. 
    그리고 다른 사람이 쓴 코드와 안겹치게 작동하고, 한번에 merge를 하면서 협업이
    더욱 쉽도록 도와준다.
    
### 1. mongoDB 사용환경 설정
    확장가능성이 좋고(Scalable) , 사용이 간단하며 (NoSQL), 오픈소스인 데이터베이스
    사용법을 금방 익히고 쉽게 사용할 수 있다. 그리고 빠르다.
    
    # 몽고디비서버 실행
    $ sudo mongod --bind_ip=$IP --dbpath={저장경로} --nojournal
    # 몽고디비 접속
    $ mongo 
    # 몽고디비 커맨드 명령어(몽고디비서버 실행 후에)
    >show dbs # database 목록 보기
    >use monster # monster database로 이동
    >db.{model 이름}.find()  # 찾기 메소드
    >db.{model 이름}.save({contents: "newData"}) # contents: "newData" 를 가진 데이터 생성
    >db.{model 이름}.update(조건문, {바꿀정보json}) # 수정
    >db.{model 이름}.delete(조건문) # 삭제
    
    # nodeJS 라이브러리 mongoose 를 이용해서 사용!
    
    
### 2. nodeJS 설치(c9은 원래 설치되어 있음 버젼업만 하자)
    개발언어다. v8엔진을 기반이라고 하는데, 잘은 모르겠는데, cross-env 에 강력하다고 한다.
    이 말은 어디에서든지 개발이 가능하고, 어디에서든지 실행이 가능하다는 말이다.
    어떤 플랫폼 상이든 개발이 편하고 빠르게 된다. 퍼포먼스는 다른 언어에 비해 떨어진다고 하는데,
    실시간 채팅이거나 스트리밍 기능이 필요할 때 제외하고는 상관 없을 거라고 생각한다.
    
### 3. Express 설치하기(NodeJS 프레임워크)
    NodeJS에서 서버구현 쓰는 프레임워크이다. 그냥 루비와 레일즈 느낌으로 이해하면 된다.

### 4. ReactJS 설치하기
    우리가 쓰려는 발암물질 webpack을 사용한다. webpack이 환경변수 설정을 자동화 해주는데, 
    발암이 틀림없다. 온전한 정신건강을 위해 심호흡 5번씩 하고 사용하도록하자
    
## 여기부터 진짜
    0. 이것만 따라하면 된다.
    
    # node 버젼업(일반 서버)
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    
    # c9 에서는 node 버젼업이 다름
    nvm install 6
    nvm alias default 6
    
    # npm 버젼업
    sudo npm i -g npm
    
    # 필요파일 다운로드
    git clone https://github.com/geusan/monstereating.git
    cd monstereating # 클론된 폴더로 이동 
    #내부의 파일들을 상위폴더로 이동시켜도 된다. 그땐 mv monstereating/* . 요렇게 입력
    
    # package.json을 사용한 개발환경 설치
    sudo npm install
    
    # package.json 파일 안에 있지만, global install 이 필요하고, 버젼문제로 한번 더 설치
    sudo npm install -g webpack webpack-dev-server
    sudo npm install -g babel-cli nodemon cross-env
    sudo npm install --save express body-parser morgan
    
    # 몽고디비 설치
    sudo apt-get install -y mongodb-org
    sudo npm install --save mongoose
    
    # mongodb 서버 실행(다른 터미널에서 실행)
    mkdir data # 데이터베이스 저장 경로 생성 (최초 1회만 실행)
    sudo mongod --bind_ip=$IP --dbpath=data --nojournal 
    # 가끔 재시작할 때 에러가 있는데, 안끄고 나가서 그런거다 data 폴더의 mongodb.lock 를 지워주자
    
    # build 하기
    npm run build ( server build 와 webpack build 동시에 된다)
    
    
    
    # start 하기
    npm run start 
    
    # 실행된 내 사이트로 들어가기
    http://{프로젝트 이름}-{아이디}.c9users.io
    # 중간에 들어가는 '-'을 잘 쓰자(이름에 언더바'_'가 들어가면 자동으로 '-' 으로 변한다)
    
    1. 기본적인 거
    package.json 파일로 dependencies 를 관리한다.
    webpack.config.js 는 디플로이 서버 환경
    webpack.dev.config.js 는 개발 서버 환경
    
    2. src/ 폴더의 components, containers, reducers 폴더에는 index.js 가 꼭 필요하다. 
      그래야 폴더 자체를 임포트 할 수 있다.
    
    3. 현재 CRUD의 간단한 기능만을 가지고 있다. 맘에드는 기능으로 커스텀하여 사용하면 된다.
    
    4. 각각의 폴더 내부에도 README.md 가 있으니 설명을 천천히 읽어보자. 사실 이해하기 넘나 힘들다
    

    
    
참조 [velopert 블로그](http://velopert.com "velopert")

[README.md : server] (https://github.com/geusan/monstereating/tree/master/server/README.md)

[README.md : react] (https://github.com/geusan/monstereating/tree/master/src/README.md)

[README.md : public] (https://github.com/geusan/monstereating/tree/master/public/README.md)

