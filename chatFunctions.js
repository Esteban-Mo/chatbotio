import { appendMessage, appendDivider, saveChatBodyToLocalStorage, saveMessageToLocalStorage, saveDividerToLocalStorage, loadChatHistory, clearChatHistory, updateClearHistoryButtonVisibility, scrollToBottom } from './chatHelpers.js';
import Bot from './Bot.js';
import { fetchJoke, fetchQuoteInFrench, fetchFactInFrench, fetchPokemonTeam } from './fetchFunctions.js';

document.addEventListener('DOMContentLoaded', () => {
    const botList = document.getElementById('bot-list');
    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const clearHistoryButton = document.getElementById('clear-history-button');

    const bots = [
        new Bot('Bot Alpha', 'Je suis le bot Alpha.', {
            'Chuck': fetchJoke,
            'pokemon': fetchPokemonTeam,
            'help': () => bots[0].getHelpMessage()
        }),
        new Bot('Bot Beta', 'Je suis le bot Beta.', {
            'citation': fetchQuoteInFrench,
            'help': () => bots[1].getHelpMessage()
        }),
        new Bot('Bot Gamma', 'Je suis le bot Gamma.', {
            'fait': fetchFactInFrench,
            'help': () => bots[2].getHelpMessage()
        })
    ];

    bots.forEach(bot => {
        botList.appendChild(bot.render());
    });

    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value.trim();
        if (userMessage === '') return;

        appendMessage('Vous', userMessage, true);
        messageInput.value = '';

        let helpMessages = [];
        let botPromises = bots.map(bot => {
            const botResponse = bot.handleCommand(userMessage);
            if (botResponse) {
                if (botResponse instanceof Promise) {
                    return botResponse.then(response => {
                        appendMessage(bot.name, response);
                    });
                } else {
                    appendMessage(bot.name, botResponse);
                    return Promise.resolve();
                }
            } else {
                return Promise.resolve();
            }
        });

        Promise.all(botPromises).then(() => {
            if (userMessage.toLowerCase() === 'help' && helpMessages.length > 0) {
                helpMessages.forEach(helpMessage => appendMessage('System', helpMessage));
            }
            appendDivider();
            scrollToBottom();
        });
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    clearHistoryButton.addEventListener('click', clearChatHistory);

    loadChatHistory();
});
