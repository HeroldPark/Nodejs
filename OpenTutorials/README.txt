npm install pm2 -g

// 아래를 실행시켜 놓으면 프로그램이 변경되더라도 node main.js 와 같이
// main.js를 재시작 하지 않아도 된다.
pm2 start main.js --watch

// main.js 상태를 볼 수 있다.
pm2 log

// 실행중인 main.js를 멈춘다.
pm2 stop main.js

// 모든 프로세스를 kill 한다.
pm2 kill

// no-daemon으로 실행한다.
pm2 start main.js --watch --no-deamon

// 리스트를 본다. 잘 안될때도 있다. 그러면 pm2 kill 하라.
pm2 list

// data, sesssions 디렉토리 아래 파일에 변화(생성, 수정, 삭제)가 생기더라도 node.js가 재시작 하지 않게 한다.
pm2 start main.js --watch --ignore-watch="data/* sessions/*" --no-deamon

node.js awesome 으로 검색...