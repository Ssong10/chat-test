# Chatting Service

* Express 를 이용한 Nodejs 서버

* Socket.io 를 이용한 실시간 양방향 통신

```node
  $ npm insall
  $ npm run start
```
## 사용 기술
  * 기본적인 구현은 Vanilla JS 를 통하여 구현하였습니다.
  * 라이브러리의 사용을 줄이고 Momentjs 를 도입할까 고민을 하다가 간단히 구현하였습니다. (server.js / time)
    "express": "^4.17.1",
    "socket.io": "^3.1.0"

## 상황
  * InputCheck 를 사용하여 빈 입력값일 경우 통신하지 않도록 하였습니다.
  * 채팅을 한 사람과 시간(분)이 같을 경우 중복으로 나타나지 않게 설정하였습니다.
  * 비디오 공유에 대한 기능을 구현하였으나 localhost에서는 작동이 되지만 ip 주소를 이용하여 접속하면 권한에 대한 접근 제어가 있는 상황이라 중단되었습니다.

## 예시
  ![chat](/chat.png)