const wsUri = "wss://echo-ws-service.herokuapp.com";

const infoOutput = document.querySelector(".info_output");
const chatOutput = document.querySelector(".chat");
const input = document.querySelector("input");
const sendBtn = document.querySelector(".btn");
const btn_geo = document.querySelector(".btn_geo");

function pageLoaded() {

    
  let socket = new WebSocket(wsUri);
    
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
    
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
    
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
    
  sendBtn.addEventListener("click", sendMessage);
    
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
    
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
  
  
  const error = () => {
    infoOutput.textContent = 'Невозможно получить ваше местоположение';
  }

  const success = (position) => {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    let geoLink = `<div class = "geoLink"><a href ='https://www.openstreetmap.org/#map=18/${latitude}/${longitude} target='_blank'> 
    Ваша гео-локация</a><div/>`;
    chatOutput.innerHTML += geoLink;
    infoOutput.innerText = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  };


  btn_geo.addEventListener('click', () => {
    infoOutput.href = '';
    infoOutput.textContent = '';
  
  if (!navigator.geolocation) {
    infoOutput.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    infoOutput.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
  });


}
  
  

document.addEventListener("DOMContentLoaded", pageLoaded);
