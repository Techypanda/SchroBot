var Discord = require('discord.io')
var logger = require('winston')
var auth = require('./auth.json')
const botID = "620914331424391188"
const imgL = "./resources/images/"
const functions = ["meaningoflife", "meme", "succ", "bitchscale", "fuck", "help", "minecrafttips", "clean"]  // This is the functions.
// Configure Bot
initBot()
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
})
signalReady()
// Bot Ready

bot.on('message', function (user, userID, channelID, message, event) {
    var user = initUser(user, userID)
    var server = initServer(channelID, message, event)
    debug(user, server)
    menu(user,server)
})

// Display Functions
function putt(msg, server) // Put Text
{
    bot.sendMessage({
        to: server.channelID,
        message: msg
    })
}
function puti(img, fExt, server) // Put Image
{
    /*({
        to: server.channelID,
        file: "https://i.redd.it/nkwsozmpvwl31.jpg"
    }) */
    bot.uploadFile({
        to: server.channelID,
        file: imgL + img + "." + fExt
    })
}

// INITILIZATION
function initBot()
{
    console.log('Running Bot')
    logger.remove(logger.transports.Console)
    logger.add(new logger.transports.Console, {
        colorize: true
    })
    logger.level = 'debug'
    console.log(auth.token + " is my token!")
}
function signalReady()
{
    bot.on('ready', function (evt) {
        logger.info('Connected')
        logger.info('Logged in as: ')
        logger.info(bot.username + ' - (' + bot.id + ')')
    })
}
function initUser(user, userID)
{
    return new UserInformation(user,userID)
}
function initServer(channelID, message, event)
{
    message = message.toLowerCase()
    var args = message.substring(6).split(' ')
    var subArgs = message.split(' ')
    subArgs.shift()
    subArgs.shift()  // Following The Arguments
    var cmd = args[0]  // Command Being Demanded
    args.splice(1)
    return new ServerInformation(channelID, message, event, cmd, args, subArgs)
}

// Verification Methods
function schrö(message)
{
    if (message.substring(0, 6) == "Schrö " || message.substring(0, 6) == "Schro " || message.substring(0, 6) == "schro " || message.substring(0, 6) == "schrö ") { return true }
    else { return false }
}

function debug(user, server)
{
    if (server.message.substring(0,2) == "$d" && user.userID == "132356876892504064") {
        bot.sendMessage({
            to: server.channelID,
            message: "user classfields: " + user.user + "," + user.userID
        })
        bot.sendMessage({
            to: server.channelID,
            message: "server classfields: chnlID = " + server.channelID + ", msg = " + server.message + ", event = " + server.event + ", cmd = " + server.cmd + " args = " + server.args + ", subArgs = " + server.subArgs
        })
    }
    else if (user.userID == "620914331424391188") { /* THIS IS THE BOT DONT DO ANYTHING! */}
    else if (user.userID != "132356876892504064" && server.message.substring(0,2) == "$d")
    {
        bot.sendMessage({
            to: server.channelID,
            message: "You don't have permission to view the classfields!"
        })
    }
}

// Bot Funcs
function mOLF(server)
{
    var mOL = randomMOL()
    putt(mOL, server)
}
function meme(server) // make functional
{
    putt("DEPRECATED", server)
}
function succ(server) // add more succs
{
    putt("https://i.kym-cdn.com/photos/images/newsfeed/001/244/990/df7.png", server)
}
function bitchscalee(server)
{
    if (server.subArgs.length == 0)
    {
        putt("No user was specified you dumb bitch " + user, server)
    }
    else
    { // There has been stuff specified
        var bitchScale = randInd(100)
        var userShownMath = bitchScale
        bitchScale = ((bitchScale / 101.0) * 100) + "%"
        putt(server.subArgs.toString() + " is " + bitchScale + " a bitch. \n ***Concerned About my math?: ((" + userShownMath + " / 101.0) * 100) + %***", server)
    }
}
function fuck(server, user)
{
    if (server.subArgs.length == 0) {
        putt("fuck what? " + user.user, server)
    }
    else
    { // There has been stuff specified
        putt("Yeh fuck " + server.subArgs.toString(), server)
    }
}
function help(server)
{
    if (server.subArgs.length == 0)
    {
        putt("Commands: " + functions.toString(), server)
    }
    else if (server.subArgs.length > 1)
    {
        putt("I cant help you with that many sub arguments you dumb fuck", server)
    }
    else
    {
        helper(server.subArgs[0], server.channelID, server)
    }
}
function helper(command, channelID, server)
{
    command = command.toLowerCase()
    switch (command)
    {
        case functions[5]:
            putt("Display help", server)
            break
        case functions[0]:
            putt("Display the meaning of life", server)
            break
        case functions[1]:
            putt("Display a random meme (CURRENTLY NOT IMPLEMENTED!)", server)
            break
        case functions[2]:
            putt("Display succ", server)
            break
        case functions[3]:
            putt("Check how much @User is a bitch out of 101", server)
            break
        default:
            putt("Haven't written a help for that function", server)
            break
    }
}
// Menu
function menu(user, server)
{
    if (schrö(server.message))
    {
        switch(server.cmd) {
            // Schro ping
            case functions[0]:
                mOLF(server)
                break
            case functions[1]:
                meme(server)
                break
            case functions[2]:
                succ(server)
                break
            case functions[3]:
                bitchscalee(server)
                break
            case functions[4]:
                fuck(server, user)
                break
            case functions[5]:
                help(server)
                break
            case functions[6]:
                randomMinecraftTip(server)
                break
            case functions[7]:
                clean(server)
                break
            default:
                putt("Sorry I don't quite understand", server)
                break
            }
    }
}
function randomMOL()
{
    var mOL = "undefined"
    var index = randInd(10)
    switch(index)
    {
        case 0:
            mOL = "Cheese has holes, More Cheese = more holes. More holes = less cheese. Therefore, More cheese = Less Cheese"
            break
        case 1:
            mOL = "You are a mistake."
            break
        case 2:
            mOL = "To bully james!"
            break
        case 3:
            mOL = "It's written in the terms and conditions bro did you not read them?"
            break
        case 4:
            mOL = "I can put a whole fist in my mouth, wanna see?"
            break
        case 5:
            mOL = "Roses are red. Life has no meaning. The voices in my head. Are constantly screaming."
            break
        case 6:
            mOL = "I wanna put a 🥒 in your 🥚"
            break
        case 7:
            mOL = "HASANK"
            break
        case 8:
            mOL = "If I were to hypothetically murder a hooker at 3:16 AM after she tried to bite my dick off, what’s the best way to hide the body? 👨🏿‍👨🏿‍👨🏿‍👅👀🧠💋👋"
            break
        case 9:
            mOL = "The boy: Hi 💕, The girl: Hi, i got something to tell you 😥, The boy: Tell me 😱, The girl: I luv u😳😍, The boy: i luv u 2 but im 23 and ur 7 and im dating someone of my age 😞, The girl: **logs out**, That Night, The Girl Cut Her Veins And Wrote On The Wall “AGE DOESNT MATTER”, The Boy Loved Her And He Hanged Himself, And He Wrote: “SHE WAS RIGHT, OBAMA IS KINDA FUNNY DOE 😳💁🏿‍♂️ “"
            break
        case 10:
            mOL = "Fuck you bitch 💁‍♀️ I do whatever I want bitch 😡😡 Don't downvote me or I will downvote you 🤷‍♀️ I hate Reddit for calling me a normie for using emojis 😩😤 You guys have no lives if you hate Instagram users for no reason sksksksks 🤡🤡🤡 Yeah bitch I can use them idc 🥵🥵😂🤣 Like bitch fuck you and your dumbass smh 👁👁👀👄👅🙏🔪 Y'all got me dead 💀"
            break
    }
    return mOL
}
function randInd(max)
{
    return Math.floor(Math.random() * Math.floor(max))
}
function randomMinecraftTip(server)
{
    var i = randInd(50)
    switch (i)
    {
        case 0:
            putt("Making a Machine with pistons that in turn makes a block go in a never ending loop.", server)
            break
        case 1:
            putt("Take a swim in lava", server)
            break
        case 2:
            putt("Place a door the wrong way.", server)
            break
        case 3:
            putt("Dig Straight down.", server)
            break
        case 4:
            putt("Use your first couple of diamonds to make a diamond hoe, cause these hoes mad.", server)
            break
        case 5:
            putt("Throw Diamonds into Lava for Microsoft", server)
            break
        case 6:
            putt("Destroy a crafting table while someone is using it causing all they're stuff to fly all over the fucking place", server)
            break
        case 7:
            putt("Mine obsidian with your bare hand.", server)
            break
        case 8:
            putt("Herobrine is behind you.", server)
            break
        case 9:
            puti("minecraft_11", "png", server)
            break
        case 10:
            puti("minecraft_15", "png", server)
            break
        case 11:
            puti("minecraft_21", "png", server)
            break
        case 12:
            puti("minecraft_22", "png", server)
            break
        default:
            //putt("42 more tips to add, if you got one of these im too lazy to add more. you have a 8/51 chance to get a tip", server)
            var z = randInd(26)
            while (z == 0 || z == 11 || z == 15 || z == 21 || z == 22) { z = randInd(26)  }
            puti("minecraft_" + z, "jpg", server)
            break
    }
}

// Classes

class UserInformation // contains User Information
{
    constructor(user, userID)
    {
        this.user = user
        this.userID = userID
    }
}
class ServerInformation
{
    constructor(channelID, message, event, cmd, args, subArgs)
    {
        this.channelID = channelID
        this.message = message
        this.event = event
        this.cmd = cmd
        this.args = args
        this.subArgs = subArgs
    }
}
