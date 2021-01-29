const socket = io();
const message = document.querySelector('.message')
const chattings = document.querySelector('.chattings')
const changeName = document.querySelector('.changeName')

changeName.addEventListener('keydown',(e)=> {
  let new_name = e.target.value;
  socket.acks.name = new_name
})

message.addEventListener('keyup',(e)=>{
  if (e.keyCode=== 13){
    console.log(socket)
    const data = {id:socket.id,data:e.target.value,name:socket.acks.name}
    socket.emit('chat', data)
    e.target.value = ''
  }
})

const checkMsg = (id) => {
  return id === socket.id
}

const render = (data) =>{
  const chat = document.createElement('div')
  chat.classList.add('chat-wrap')
  const isMyMsg = checkMsg(data.id)
  chat.innerHTML = isMyMsg ? 
    `
    <div class="chat sent">
      <span>${data.data}</span>
    </div>` 
  :
  `
  <span class="chat_name">${data.name}</span>
  <div class="chat received">
    <span>${data.data}</span>
  </div>
  `
  chattings.appendChild(chat)
}
socket.on('chat', (data)=>{
    render(data)
  }
)