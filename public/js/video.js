const socket = io();
const message = document.querySelector('.message')
const chattings = document.querySelector('.chattings')
const changeName = document.querySelector('.changeName')
const video = document.querySelector('.video')
const sendBtn = document.querySelector('.send__btn')
let other = ''

socket.on('other',data => {
  if (data !== socket.id){
    console.log('본인 : ', socket.id)
    console.log('상대방 : ' ,data)
    other = data
  }
})

const videoRender = () =>{
  video.innerHTML = `
    <video src="" id="myVideo" style="display:none" autoplay></video>
    <img id="play"></video>
    <canvas style="display:none;" id="preview"></canvas>
  `
  navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;
  var myVideo = document.querySelector('video#myVideo');
  var play = document.querySelector('img#play');
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        myVideo.srcObject = stream;
        setInterval(()=> {
          Draw(myVideo,context);
        },10);
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
  var canvas = document.getElementById("preview");
  var context = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 700;

  context.width = canvas.width;
  context.height = canvas.height;

  const Draw = (video,context) => {
    context.drawImage(video,0,0,context.width,context.height);
    socket.emit('video',{id:other,stream : canvas.toDataURL('image/webp')});
  }

  socket.on('video',(image)=> {
    play.src = image;
  })
}