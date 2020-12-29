require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '$'

client.on('ready', () => {
    console.log(`${client.user.username} is logged in`)
})

client.on('message', async (message) => {
    if(message.author.bot) return;

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.trim()
        .substring(PREFIX.length).split(/\s+/)

        if(CMD_NAME === 'kick'){
            if(!message.member.hasPermission('KICK_MEMBERS'))return messaye.reply('ypu dont have that permission')
            if(args.length === 0) return message.reply('Please provide an ID')
            const member = message.guild.members.cache.get(args[0])
            if(member){
                member.kick()
                .then(member => message.channel.send(`${member} was kicked.`))
                .catch( err => message.channel.send(`user can't be kicked.`));
            } else {
                message.channel.send('member not found')
            }
        } else if(CMD_NAME === 'ban'){
            if(!message.member.hasPermission('BAN_MEMBERS'))return messaye.reply('ypu dont have that permission')
            if(args.length === 0) return message.reply('Please provide an ID')

            try{
                const user = await message.guild.members.ban(args[0])
                message.channel.send('user was banned successfully')
            }catch(err){
                message.channel.send('an error occured, permission or user not found')
            }
        }
    }
    console.log(`${message.author.tag}: ${message.content}`)
    if(message.content === 'hello'){
        message.channel.send('hello');
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    const {name} = reaction.emoji;
    const guild = reaction.message.guild.members.cache.get(user.id);

    if(reaction.message.id === '7386665234089990258'){
        switch (name){
            case'🍎':
                members.role.add('')
                break;
            case'🍇':
                members.role.add('')
                break;
            case'🍌':
                members.role.add('')
                break;
            case'🍑':
                members.role.add('')
                break;
        }
    }

})

client.login(process.env.BOT_TOKEN);
