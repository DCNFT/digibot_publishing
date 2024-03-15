const userInput = document.getElementById('user-input');
const chatbox = document.getElementById('chatbox');
const sendIcon = document.querySelector('.send-icon');
const centerLogo = document.querySelector('.center_logo');
const boxContainer = document.querySelector('.box-container');
let botBusy = false;

window.onload = function() {
    sendIcon.style.color = '#888';
};

userInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        sendIcon.style.color = '#000';
    } else {
        sendIcon.style.color = '#888';
    }
});

sendIcon.addEventListener('click', function() {
    const message = userInput.value.trim();
    if (message !== '') {
        sendMessage(message);
        userInput.value = '';
    }
});

// sendMessage 함수 수정
function sendMessage(message) {
    if (botBusy) return;
    botBusy = true;
    hideCenterLogoAndBoxContainer();
    displayUserMessage(message);
    displayBotMessage('모르겠습니다!', () => {
        botBusy = false;
    });
}

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        if (event.ctrlKey) {
            event.preventDefault();
            userInput.value += '\n';
        } else {
            event.preventDefault();
            const message = userInput.value.trim();
            if (message !== '') {
                sendMessage(message);
                userInput.value = '';
            }
        }
    }
});

// centerLogo와 boxContainer 숨기는 함수
function hideCenterLogoAndBoxContainer() {
    if (centerLogo) centerLogo.style.display = 'none';
    if (boxContainer) {
        boxContainer.style.display = 'none';
        const hiddenButtons = boxContainer.querySelectorAll('.hidden-button');
        hiddenButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
}

function sendMessageFromButton(buttonText) {
    if (botBusy) return;
    botBusy = true;
    hideCenterLogoAndBoxContainer();
    displayUserMessage(buttonText);
    displayBotMessage(`${buttonText}에 대한 질문을 주셨군요!`, () => {
        displayBelowMessageButtons();
        botBusy = false;
    });
}

function displayBotMessage(message, callback) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'bot-message');
    const avatar = document.createElement('img');
    avatar.src = 'images/dx_logo_2.png';
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
    displayTime(div, 'bot-message-time');
}

// 아래 메시지 버튼 표시 함수
function displayBelowMessageButtons() {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('below-message-buttons');

    const button1 = document.createElement('button');
    button1.classList.add('below-message-button');
    button1.textContent = '경조금 문의';
    button1.onclick = function() {
        sendMessageFromButton('경조금 문의');
    };

    const button2 = document.createElement('button');
    button2.classList.add('below-message-button');
    button2.textContent = '휴가 신청';
    button2.onclick = function() {
        sendMessageFromButton('휴가 신청');
    };

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);

    chatbox.appendChild(buttonDiv);
}

// 사용자 메시지 표시 함수
function displayUserMessage(message) {
    const div = document.createElement('div');
    div.classList.add('chat-message', 'user-message');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    const avatar = document.createElement('img');
    avatar.src = 'images/dx_logo_2.png';
    avatar.classList.add('avatar', 'user-avatar');
    div.appendChild(messageContent);
    div.appendChild(avatar);
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
    displayTime(div, 'user-message-time');
}

// 채팅 시간 표시 함수
function displayTime(messageElement, timeClass) {
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time', timeClass);
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    timeDiv.textContent = timeString;
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timeDiv);
    chatbox.appendChild(messageContainer);
    chatbox.scrollTop = chatbox.scrollHeight;
}

document.querySelector('.hamburger-menu').addEventListener('click', function(event) {
    event.stopPropagation();
    const nav = document.getElementById('nav');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('header');
    const main = document.querySelector('.main');
    const subPost = document.querySelector('.sub-post');

    this.classList.toggle('active'); 
    sidebar.classList.toggle('active');
    header.classList.toggle('active');
    main.classList.toggle('active');
    subPost.classList.toggle('active');
    nav.classList.toggle('active');
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
