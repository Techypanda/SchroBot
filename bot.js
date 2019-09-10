var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
console.log('Running Bot');
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
console.log(auth.token);
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    message = message.toLowerCase();
    if (message.substring(0, 6) == "Schrö " || message.substring(0, 6) == "Schro " || message.substring(0, 6) == "schro " || message.substring(0, 6) == "schrö ") {
        var args = message.substring(6).split(' '); var subArgs = message.split(' '); subArgs.shift(); subArgs.shift();
        var cmd = args[0];
        // DEBUG PURPOSES: bot.sendMessage({to: channelID, message: args[0]});
        args.splice(1);
        var mOL = randomMOL();
        cmd = cmd.toLowerCase();
        /*REWRITE THIS! THIS IS NOT MODULAR!*/
        switch(cmd) {
            // Schro ping
            case 'meaningoflife':
                bot.sendMessage({
                    to: channelID,
                    message: mOL
                });
                break;
            case 'meme':
                bot.sendMessage({
                    to: channelID,
                    message: "DEPRECATED"
                });
                break;
            case 'succ':
                bot.sendMessage({
                    to: channelID,
                    message: "https://i.kym-cdn.com/photos/images/newsfeed/001/244/990/df7.png"
                });
                break;
            case 'bitchscale':
                if (subArgs.length == 0) {
                    bot.sendMessage({
                        to: channelID,
                        message: "No user was specified you dumb bitch " + user
                    });
                }
                else
                { // There has been stuff specified
                    var bitchScale = randInd(100); var userShownMath = bitchScale;
                    bitchScale = ((bitchScale / 101.0) * 100) + "%";
                    bot.sendMessage({
                        to: channelID,
                        message: subArgs.toString() + " is " + bitchScale + " a bitch. \n ***Concerned About my math?: ((" + userShownMath + " / 101.0) * 100) + %***"
                    });
                }
                break;
            case 'kys':
                bot.sendMessage({
                    to: channelID,
                    message: "Okay " + user + " :("
                });
                break;
            case 'yougaynigga':
                bot.sendMessage({
                    to: channelID,
                    message: "no u " + user
                });
                break;
            case 'fuck':
                if (subArgs.length == 0) {
                    bot.sendMessage({
                        to: channelID,
                        message: "fuck what? " + user
                    });
                }
                else
                { // There has been stuff specified
                    bot.sendMessage({
                        to: channelID,
                        message: "Yeh fuck " + subArgs.toString()
                    });
                }
                break;
            case 'help':
                if (subArgs.length == 0)
                {
                    bot.sendMessage({
                        to: channelID,
                        message: "This help isnt modular so if one is missing blame leigh?: meaningoflife, meme, succ, bitchscale, kys, yougaynigga, fuck, help"
                    });
                }
                else if (subArgs.length > 1)
                {
                    bot.sendMessage({
                        to: channelID,
                        message: "I cant help you with that many sub arguments you dumb fuck"
                    });
                }
                else
                {
                    help(subArgs[0], channelID);
                }
                break;
            case 'minecrafttips':
                randomMinecraftTip(channelID);
                break;
            default:
                bot.sendMessage({
                    to: channelID,
                    message: "Sorry i dont quite understand"
                });
                break;
            // Just add any case commands if you want to..
         }
     }
});

function randomMOL()
{
    var mOL = "undefined";
    var index = randInd(10);
    switch(index)
    {
        case 0:
            mOL = "Cheese has holes, More Cheese = more holes. More holes = less cheese. Therefore, More cheese = Less Cheese";
            break;
        case 1:
            mOL = "You are a mistake.";
            break;
        case 2:
            mOL = "To bully james!";
            break;
        case 3:
            mOL = "It's written in the terms and conditions bro did you not read them?";
            break;
        case 4:
            mOL = "I can put a whole fist in my mouth, wanna see?";
            break;
        case 5:
            mOL = "Roses are red. Life has no meaning. The voices in my head. Are constantly screaming.";
            break;
        case 6:
            mOL = "I wanna put a 🥒 in your 🥚";
            break;
        case 7:
            mOL = "HASANK";
            break;
        case 8:
            mOL = "If I were to hypothetically murder a hooker at 3:16 AM after she tried to bite my dick off, what’s the best way to hide the body? 👨🏿‍👨🏿‍👨🏿‍👅👀🧠💋👋";
            break;
        case 9:
            mOL = "The boy: Hi 💕, The girl: Hi, i got something to tell you 😥, The boy: Tell me 😱, The girl: I luv u😳😍, The boy: i luv u 2 but im 23 and ur 7 and im dating someone of my age 😞, The girl: **logs out**, That Night, The Girl Cut Her Veins And Wrote On The Wall “AGE DOESNT MATTER”, The Boy Loved Her And He Hanged Himself, And He Wrote: “SHE WAS RIGHT, OBAMA IS KINDA FUNNY DOE 😳💁🏿‍♂️ “";
            break;
        case 10:
            mOL = "Fuck you bitch 💁‍♀️ I do whatever I want bitch 😡😡 Don't downvote me or I will downvote you 🤷‍♀️ I hate Reddit for calling me a normie for using emojis 😩😤 You guys have no lives if you hate Instagram users for no reason sksksksks 🤡🤡🤡 Yeah bitch I can use them idc 🥵🥵😂🤣 Like bitch fuck you and your dumbass smh 👁👁👀👄👅🙏🔪 Y'all got me dead 💀";
            break;
    }
    return mOL;
}

function randInd(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}

function help(command, channelID)
{
    command = command.toLowerCase();
    switch (command)
    {
        case 'help':
            bot.sendMessage({
                to: channelID,
                message: "Display help"
            });
            break;
        case 'meaningoflife':
            bot.sendMessage({
                to: channelID,
                message: "Display the meaning of life"
            })
            break;
        case 'meme':
            bot.sendMessage({
                to: channelID,
                message: "Display a random meme (CURRENTLY NOT IMPLEMENTED!)"
            });
            break;
        case 'succ':
            bot.sendMessage({
                to: channelID,
                message: "Display succ"
            });
            break;
        case 'bitchscale':
            bot.sendMessage({
                to: channelID,
                message: "Check how much @User is a bitch out of 101"
            });
            break;
        case 'kys':
            bot.sendMessage({
                to: channelID,
                message: "Tell me to kys :()"
            });
            break;
        default:
            bot.sendMessage({
                to: channelID,
                message: "havent written a help for that."
            });
            break;
    }
}

function randomMinecraftTip(channelID)
{
    var i = randInd(50);
    switch (i)
    {
        case 0:
            outB("Making a Machine with pistons that in turn makes a block go in a never ending loop.", channelID);
            break;
        case 1:
            outB("Take a swim in lava", channelID);
            break;
        case 2:
            outB("Place a door the wrong way.", channelID);
            break;
        case 3:
            outB("Dig Straight down.", channelID);
            break;
        case 4:
            outB("Use your first couple of diamonds to make a diamond hoe, cause these hoes mad.", channelID);
            break;
        case 5:
            outB("Throw Diamonds into Lava for Microsoft", channelID);
            break;
        case 6:
            outB("Destroy a crafting table while someone is using it causing all they're stuff to fly all over the fucking place", channelID);
            break;
        case 7:
            outB("Mine obsidian with your bare hand.", channelID);
            break;
        case 8:
            outB("Herobrine is behind you.", channelID);
            break;
        default:
            outB("42 more tips to add, if you got one of these im too lazy to add more. you have a 8/51 chance to get a tip", channelID);
            break;
    }
}

function outB(outVar, channelID)
{
    bot.sendMessage({
        to: channelID,
        message: outVar
    });
}
