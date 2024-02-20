const form = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatbox = document.getElementById('chatbox');
const hiddenButtons = document.getElementById("hiddenButtons");
let botBusy = false;

function sendMessageFromButton(buttonText) {
    if (botBusy) return;
    botBusy = true;
    displayUserMessage(buttonText);
    displayBotMessage(`${buttonText}에 대한 질문을 주셨군요!`, () => {
        setTimeout(() => {
            displayBotMessage('모르겠습니다!', () => {
                botBusy = false;
            });
        }, 1500);
    });
}

function sendQuestion(buttonText) {
    userInput.value = buttonText;
    sendMessageFromButton(buttonText);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const message = userInput.value.trim(); 
    if (message !== '') {
        if (!botBusy) { 
            displayUserMessage(message);
            botBusy = true; 
            displayBotMessage('저는 잘 모르겠습니다 감사합니다.', () => {
                botBusy = false; 
            }); 
            userInput.value = ''; 
        }
    }
});

function displayUserMessage(message) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'user-message');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    const avatar = document.createElement('img');
    avatar.src = 'img/profile.jpg';
    avatar.classList.add('avatar', 'user-avatar');
    div.appendChild(messageContent);
    div.appendChild(avatar);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function displayBotMessage(message, callback) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'bot-message');
    
    const avatar = document.createElement('img');
    avatar.src = 'img/profile.jpg'; 
    avatar.classList.add('avatar', 'bot-avatar');
    div.appendChild(avatar);
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    div.appendChild(messageContent);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;

    let index = 0; 

    const intervalId = setInterval(() => {
        if (index < message.length) {
            messageContent.textContent += message.charAt(index); 
            index++; 
        } else {
            clearInterval(intervalId);
            if (callback) callback(); 
        }
    }, 100); 
}

// document.getElementById('chatbox').onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     var chatbox = document.getElementById('chatbox');
//     if (chatbox.scrollHeight - chatbox.clientHeight <= chatbox.scrollTop) {
//         document.getElementById("topBtn").style.display = "block";
//         chatbox.style.height = "calc(100% - 120px)";
//     } else {
//         document.getElementById("topBtn").style.display = "none";
//         chatbox.style.height = "calc(100% - 60px)";
//     }
// }

// function topFunction() {
//     var chatbox = document.getElementById('chatbox');
//     chatbox.scrollTop = 0;
// }

function toggleHiddenButtons() {
    var hiddenButtons = document.getElementById("hiddenButtons");
    if (hiddenButtons.style.display === "none" || hiddenButtons.style.display === "") {
        hiddenButtons.style.display = "block";
    } else {
        hiddenButtons.style.display = "none";
    }
}
