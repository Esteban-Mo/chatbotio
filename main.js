import {appendMessage, appendDivider, loadChatHistory, clearChatHistory, scrollToBottom} from './chatHelpers.js';
import Bot from './bot.js';
import {fetchJoke, fetchQuote, fetchFact, fetchPokemonTeam, fetchAdvice, fetchCatFact, fetchDogFact} from './fetchFunctions.js';

document.addEventListener('DOMContentLoaded', () => {
    const botList = document.getElementById('bot-list');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const clearHistoryButton = document.getElementById('clear-history-button');

    const bots = [
        new Bot('Bot Alpha', 'Je suis le bot Alpha.', {
            'chuck': fetchJoke,
            'pokemon': fetchPokemonTeam,
            'weather': () => 'J\'ai pas trouvé une bonne api pour ça :D',
            'help': () => bots[0].getHelpMessage()
        }),
        new Bot('Bot Beta', 'Je suis le bot Beta.', {
            'citation': fetchQuote,
            'chatfact': fetchCatFact,
            'advice': fetchAdvice,
            'help': () => bots[1].getHelpMessage()
        }),
        new Bot('Bot Gamma', 'Je suis le bot Gamma.', {
            'fait': fetchFact,
            'dogfact': fetchDogFact,
            'chatfact': fetchCatFact,
            'help': () => bots[2].getHelpMessage()
        })
    ];

    bots.forEach(bot => {
        botList.appendChild(bot.render());
    });

    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value.trim();
        if (userMessage === '') return;

        appendMessage('Vous', userMessage, true, bots);
        messageInput.value = '';

        let helpMessages = [];
        let botPromises = bots.map(bot => {
            const botResponse = bot.handleCommand(userMessage);
            if (botResponse) {
                if (botResponse instanceof Promise) {
                    return botResponse.then(response => {
                        appendMessage(bot.name, response, false, bots);
                    });
                } else {
                    appendMessage(bot.name, botResponse, false, bots);
                    return Promise.resolve();
                }
            } else {
                return Promise.resolve();
            }
        });

        Promise.all(botPromises).then(() => {
            if (userMessage.toLowerCase() === 'help' && helpMessages.length > 0) {
                helpMessages.forEach(helpMessage => appendMessage('System', helpMessage, false, bots));
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

    loadChatHistory(bots);
});
