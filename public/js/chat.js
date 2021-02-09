const socket = io();
const message = document.querySelector('.message')
const chattings = document.querySelector('.chattings')
const nameInput = document.querySelector('.changeName')
const sendBtn = document.querySelector('.send__btn')
const ENTER_CODE = 13
let prevChat = {}

const checkInput = (input,inputValue) => {
  if (!input.value) {
    input.placeholder = `${inputValue}를 입력해주세요`
    setTimeout(()=>{
      input.placeholder = ''
    },1000) 
    return false
  }
  return true
}
const send = () => {
  if (checkInput(nameInput,'이름') && checkInput(message,'메세지')){
    const data = {id:socket.id,data:message.value,name:nameInput.value}
    socket.emit('chat', data)
    message.value = ''
  }
}

const sentMessage = (data) => `
  <div class="sent">
    <span class="time">${data.time}</span>
      <div class="chat">
        <span>${data.data}</span>
      </div>
  </div>
`
const receviedMessage = (data,isEqual) => `
  ${isEqual ? '' : `<span class="chat_name">${data.name}</span>`}
  <div class="received">
    <div class="chat">
    <span>${data.data}</span>
    </div>
    <span class="time">${data.time}</span>
  </div>
`

const render = (data) =>{
  const equalUserTime = (prev,curr) => {
    return prev.time === curr.time && prev.name === curr.name
  }
  const isEqual = equalUserTime(prevChat,data)
  const chat = document.createElement('div')
  chat.classList.add('chat-wrap')
  if (isEqual){
    const beforeTime = chattings.lastChild.querySelector('.time')
    beforeTime.remove()
  }
  chat.innerHTML = data.id === socket.id ? sentMessage(data): receviedMessage(data,isEqual)
  chattings.appendChild(chat)
  prevChat = data
  chattings.scrollTop = chattings.scrollHeight
}

socket.on('chat', (data)=>{
  render(data)
})

message.addEventListener('keyup',(e)=>{
  if (e.keyCode=== ENTER_CODE){
    send()
  }
})

sendBtn.addEventListener('click', send)