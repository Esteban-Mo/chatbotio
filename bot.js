export default class Bot {
    constructor(name, description, commands) {
        this.name = name;
        this.description = description;
        this.commands = commands;
        this.avatarUrl = `https://ui-avatars.com/api/?name=${name}&background=random`;
    }

    getHelpMessage() {
        const commandList = Object.keys(this.commands)
            .map(command => `<strong>${command}</strong>`)
            .join(', ');
        return `Commandes disponibles pour ${this.name}: ${commandList}`;
    }

    handleCommand(command) {
        if (this.commands[command]) {
            return this.commands[command]();
        }
        return null;
    }

    render() {
        const botItem = document.createElement('div');
        botItem.classList.add('bot-item');

        const avatar = document.createElement('img');
        avatar.src = this.avatarUrl;
        avatar.alt = `${this.name} avatar`;

        const botInfo = document.createElement('div');
        botInfo.classList.add('bot-info');

        const botName = document.createElement('div');
        botName.classList.add('bot-name');
        botName.textContent = this.name;

        const botDescription = document.createElement('div');
        botDescription.classList.add('bot-description');
        botDescription.textContent = this.description;

        botInfo.appendChild(botName);
        botInfo.appendChild(botDescription);
        botItem.appendChild(avatar);
        botItem.appendChild(botInfo);

        return botItem;
    }
}
