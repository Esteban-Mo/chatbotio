export function appendMessage(sender, message, isUser = false, bots) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isUser ? 'user' : 'bot');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.innerHTML = `<strong>${sender}:</strong> ${message}`;

    if (!isUser) {
        const bot = bots.find(bot => bot.name === sender);
        if (bot) {
            const avatar = document.createElement('img');
            avatar.src = bot.avatarUrl;
            avatar.alt = `${sender} avatar`;
            avatar.classList.add('avatar');
            messageElement.appendChild(avatar);
        }
    }

    messageElement.appendChild(messageContent);
    chatWindow.appendChild(messageElement);

    saveMessageToLocalStorage(sender, message, isUser);
    saveChatBodyToLocalStorage();
}

export function appendDivider() {
    const chatWindow = document.getElementById('chat-window');
    const dividerElement = document.createElement('div');
    dividerElement.classList.add('divider');

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    dividerElement.textContent = `-------------------- ${currentTime} --------------------`;

    chatWindow.appendChild(dividerElement);

    saveDividerToLocalStorage(currentTime);
    saveChatBodyToLocalStorage();
}

export function saveChatBodyToLocalStorage() {
    const chatWindow = document.getElementById('chat-window');
    const chatBody = chatWindow.innerHTML;
    localStorage.setItem('chatBody', chatBody);
}

export function saveMessageToLocalStorage(sender, message, isUser) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const messageId = `${sender}-${message}-${isUser}`;
    if (!chatHistory.some(entry => entry.id === messageId)) {
        chatHistory.push({ id: messageId, sender, message, isUser });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    updateClearHistoryButtonVisibility();
}

export function saveDividerToLocalStorage(time) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const dividerId = `divider-${time}`;
    if (!chatHistory.some(entry => entry.id === dividerId)) {
        chatHistory.push({ id: dividerId, divider: true, time });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    updateClearHistoryButtonVisibility();
}

export function loadChatHistory(bots) {
    const chatWindow = document.getElementById('chat-window');
    const savedChatBody = localStorage.getItem('chatBody');
    if (savedChatBody) {
        chatWindow.innerHTML = savedChatBody;
    } else {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.forEach(entry => {
            if (entry.divider) {
                const dividerElement = document.createElement('div');
                dividerElement.classList.add('divider');
                dividerElement.textContent = `-------------------- ${entry.time} --------------------`;
                chatWindow.appendChild(dividerElement);
            } else {
                appendMessage(entry.sender, entry.message, entry.isUser, bots);
            }
        });
    }
    updateClearHistoryButtonVisibility();
    scrollToBottom();
}

export function clearChatHistory() {
    const chatWindow = document.getElementById('chat-window');
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('chatBody');
    chatWindow.innerHTML = '';
    updateClearHistoryButtonVisibility();
}

export function updateClearHistoryButtonVisibility() {
    const clearHistoryButton = document.getElementById('clear-history-button');
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    clearHistoryButton.style.display = chatHistory.length > 0 ? 'block' : 'none';
}

export function scrollToBottom() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
