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
}

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

const hiddenButtonElements = document.querySelectorAll('.hidden-button');
hiddenButtonElements.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        const buttonText = this.textContent;
        sendMessageFromButton(buttonText);
        hiddenButtons.style.display = 'none';
    });
});

document.getElementById('toggleButtons').addEventListener('click', function(event) {
    event.preventDefault(); 
    if (hiddenButtons.style.display === 'none' || hiddenButtons.style.display === '') {
        hiddenButtons.style.display = 'block';
    } else {
        hiddenButtons.style.display = 'none';
    }
});

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var main = document.getElementById('main');
    var header = document.querySelector('header');
    var toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    var toggleTrigger = document.getElementById('trigger');
    var toggleLabel = document.querySelector('label[for="trigger"]');
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        main.style.marginLeft = '0';
        main.style.width = '100%';
        header.style.width = '100%';
        toggleTrigger.checked = false;
        toggleLabel.querySelector('span:nth-child(1)').style.top = '0';
        toggleLabel.querySelector('span:nth-child(2)').style.opacity = '1';
        toggleLabel.querySelector('span:nth-child(3)').style.top = '100%';
        if (viewportWidth > 768) { 
            header.style.transform = 'translateX(0)';
        }
    } else {
        sidebar.classList.add('active');
        main.style.marginLeft = '400px';
        main.style.width = 'calc(100% - 400px)';
        if (viewportWidth > 768) { 
            header.style.width = 'calc(100% - 400px)';
            header.style.transform = 'translateX(400px)';
        } else { 
            header.style.width = '100%';
            header.style.transform = 'translateX(0)';
        }
        toggleTrigger.checked = true;
        toggleLabel.querySelector('span:nth-child(1)').style.top = '50%';
        toggleLabel.querySelector('span:nth-child(2)').style.opacity = '0';
        toggleLabel.querySelector('span:nth-child(3)').style.top = '50%';
    }
}

document.addEventListener('click', function(event) {
    var sidebar = document.getElementById('sidebar');
    var toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    var toggleTrigger = document.getElementById('trigger');
    var toggleLabel = document.querySelector('label[for="trigger"]');
    if (sidebar.classList.contains('active') && !event.target.closest('#sidebar') && event.target !== toggleSidebarBtn && event.target !== toggleTrigger && event.target !== toggleLabel && event.target !== hiddenButtons) {
        toggleSidebar();
    }
});

document.getElementById('toggleSidebarBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    toggleSidebar();
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

