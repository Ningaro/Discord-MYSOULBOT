const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
  console.log(`\nDiscord-MySoulBot v0.2-alpha запущен!\nВы авторизовались как ${client.user.tag}!`);
});


//Команда Удаление сообщение сообщения после изменения реакции
client.on('messageReactionRemove', (msg, user) => {
  if ((msg.emoji == `❌`) && (user.id == client.user.id)){
    msg.message.delete();
  };
});


//Команда Channel
client.on('message', msg => {
  if ((msg.content === `${config.prefix}channel`) && (msg.author.id == client.user.id)) {
    //Функция для вывода типа канала на русском
    function rusType(type) {
      switch (type) {
        case 'dm':
          answer = 'Личные сообщения';
          break;
        case 'text':
          answer = 'Текстовый канал на сервере.';
          break;
        case 'group':
          answer = 'Канал группы.';
          break;
      }
      return answer;
    }
    msg.edit({
    embed: {
        color: 0x008000,
        title: '🤖 Bot',
        fields: [
            {
                name: 'Название',
                value: `<#${msg.channel.id}>`,
            },
            {
                name: 'Тип',
                value: `${rusType(msg.channel.type)} `,
            },
            {
                name: `ID`,
                value: `\`\`${msg.channel.id}\`\``,
            },
            {
                name: `Дата создания`,
                value: `${msg.channel.createdAt.getDay()}/${msg.channel.createdAt.getMonth()}/${msg.channel.createdAt.getFullYear()}`,
            }
        ],
    },
}
);
msg.react(`❌`)
.then(console.log(`Used command "channel" in ${msg.channel.type} channel "${msg.channel.name}".`))
  };
});


//Команда Ping
client.on('message', msg => {
  if ((msg.content === `${config.prefix}ping`) && (msg.author.id == client.user.id)) {
    var start = Date.now(); //Делаем временую отметку отправки запроса
    msg.edit(`ping - pong! 🏓 Задержа этого запроса: ${client.user.lastMessage.createdTimestamp - start}мс. Задержка API: ${Math.round(client.ping)}мс.`);
    msg.react(`❌`);
    console.log(`Used command "ping" in ${msg.channel.type} channel "${msg.channel.name}".`);
  };
});


//Команда MessageDellet
client.on('message', msg => {
  if ((msg.content.includes(`${config.prefix}msgd`)) && (msg.author.id == client.user.id)) {
    mes = msg.content.split(' ');
    msg.channel.fetchMessages({ limit: `${Number(mes[1])+1}` })
    .then(messages => messages.deleteAll())
    .catch(console.error);

    msg.channel.send({
    embed: {
        color: 0x008000,
        title: '🤖 Bot',
        fields: [
            {
                name: 'Cостояние',
                value: `Удаление сообщений выполнено.`,
            }
          ],
        },
      })
      .then(message => message.react(`❌`)
            .then(console.log(`Used command "msgd" in ${msg.channel.type} channel "${msg.channel.name}".`))
          );
  };
});


client.login(config.token); //впишите сюда ваш токен
