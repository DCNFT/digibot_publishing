const userInput = document.getElementById('user-input');
const chatbox = document.getElementById('chatbox');
const hiddenButtons = document.getElementById('hiddenButtons');
let botBusy = false;

function sendMessage(message) {
    if (botBusy) return;
    botBusy = true;
    displayUserMessage(message);
    displayBotMessage('모르겠습니다!', () => {
        botBusy = false;
    });
}

function sendMessageFromButton(buttonText) {
    if (botBusy) return;
    botBusy = true;
    displayUserMessage(buttonText);
    displayBotMessage(`${buttonText}에 대한 질문을 주셨군요!`, () => {
        setTimeout(() => {
            displayBotMessage('모르겠습니다!', () => {
                botBusy = false;
            });
        }, 1000);
    });
    hideHiddenButtons(); 
}

function hideHiddenButtons() {
    hiddenButtons.style.display = 'none';
}

function showHiddenButtons() {
    hiddenButtons.style.display = 'block';
}

const hiddenButtonElements = document.querySelectorAll('.hidden-button');
hiddenButtonElements.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        const buttonText = this.textContent;
        sendMessageFromButton(buttonText);
    });
});

document.querySelector('.show-options-btn').addEventListener('click', function() {
    if (hiddenButtons.style.display === 'block') {
        hideHiddenButtons();
    } else {
        showHiddenButtons();
    }
});

document.addEventListener('click', function() {
    hideHiddenButtons();
});

document.getElementById('send-button').addEventListener('click', function(event) {
    event.preventDefault();
    const message = userInput.value.trim();
    if (message !== '') {
        sendMessage(message);
        userInput.value = ''; 
    }
});

userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        const message = userInput.value.trim();
        if (message !== '') {
            sendMessage(message); 
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
    displayTime(div, 'user-message-time');
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
    displayTime(div, 'bot-message-time');
}

function displayTime(messageElement, timeClass) {
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time', timeClass);
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    timeDiv.textContent = timeString;
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.appendChild(messageElement);
    messageContainer.appendChild(timeDiv);
    chatbox.appendChild(messageContainer);
    chatbox.scrollTop = chatbox.scrollHeight;
}

document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const nav = document.getElementById('nav');
    const header = document.querySelector('header');
    const main = document.querySelector('.main');

    this.classList.toggle('active'); 
    sidebar.classList.toggle('active');
    header.classList.toggle('active');
    main.classList.toggle('active');
});

document.querySelector('.new-chat').addEventListener('click', function() {
    const chatMessages = document.querySelectorAll('#chatbox .chat-message');
    chatMessages.forEach(message => {
        if (message.id !== 'first-message') {
            message.remove();
        }
    });
    const messageTimes = document.querySelectorAll('.message-time');
    messageTimes.forEach(time => {
        time.remove();
    });
    this.blur();
});
