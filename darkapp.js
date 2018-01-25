const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


//Команда Удаление сообщение сообщения после изменения реакции
client.on('messageReactionRemove', (msg, user) => {
  if ((msg.emoji == `❌`) && (user.id == client.user.id)){
    msg.message.delete();
  };
});


//Команда channel
client.on('message', msg => {
  if ((msg.content === '^channel') && (msg.author.id == client.user.id)) {
    msg.edit({
    embed: {
        color: 0x008000,
        title: '🤖 Bot',
        fields: [
            {
                name: 'Создатель канала',
                value: `${msg.channel.client.user.username}`,
            },
            {
                name: `ID`,
                value: `${msg.channel.id}`,
            },
            {
                name: `Дата создания`,
                value: `${msg.channel.createdAt.getDay()}/${msg.channel.createdAt.getMonth()}/${msg.channel.createdAt.getFullYear()}`,
            }
        ],
    },
}
);
msg.react(`❌`);
  };
});


//Команда Ping
client.on('message', msg => {
  if ((msg.content === '^ping') && (msg.author.id == client.user.id)) {
    var start = Date.now(); //Делаем временую отметку отправки запроса
    msg.edit(`ping - pong! 🏓 Задержа этого запроса: ${client.user.lastMessage.createdTimestamp - start}мс. Задержка API: ${Math.round(client.ping)}мс.`);
    msg.react(`❌`);
    console.log(`Used command "ping" in ${msg.channel.type} channel ${msg.channel.name}.`);
  };
});


client.login(config.token); //впишите сюда ваш токен
