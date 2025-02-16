// https://youtu.be/aKV4ChXRp_M فيديو شرح كيف تسويه


const { Client, Intents, Discord , WebhookClient , ActionRowBuilder, ButtonBuilder, EmbedBuilder, Modal, TextInputBuilder , ModalBuilder , TextInputStyle , ActivityType , Permissions, Interaction, SelectMenuBuilder} = require('discord.js');
const { spawn } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const os = require('os');
const extract = require('extract-zip');

const http = require('http');
const { promisify } = require('util');

let pay = false 

const client = new Client({
  intents: 3276799
});

//عشان ترسل الpanel اكتب 
// $setup-bro-bro


//انت حتغير _هنا فقط
//----------------------------------- 
const targetCategoryID = '1335250858115600406'; // كاتيقوري يلي تنفتح فيهاالتكت
const accountsFilePath = './accounts.json'; // لا تغير شي
const installedFolder = './installed'; // لا تغير شي
const serversFolder = './servers'; // لا تغير شي
const botid = '1222500083556417586' // ايدي البوت
const transcriptCHannel = '1337860044565516368'// روم الترنسكربت يلي تنحفض فيها التكتات
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1337915912694530069/d1q-t84C8_srmHNGu7CBpgX3XJbxtZ0KjXXAszj0M2RLtGQ7mN0iXsCFP4wlWOv9zSFl'; //رابط ويبهوك الlog
const guild = "1329865633936183429"
//ايدي السيرفر
const token = 'MTIyMjUwMDA4MzU1NjQxNzU4Ng.G6PQWH.uM-3qPy-HogcSSgL8PubyUHC-QJCkbeCmhB2_4'; // bot token
const bank = '1064937056578572388' //ايدي البنك هنا
//----------------------------------- 


// لا تغير شي في باقي البروجكت الا 
// سطر 1633 : حط فيه رابط فيديو tutorial 
// يمديك تستعمل حقنا نسمح لك


// سطر 1237 : حط فيه سعر ال coins ب كريديت
// لا تنس الفيدباك بالله تعبنا














// project start from here :
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
  client.user.setPresence({
    activities: [
      {
        name: "by @_mm0",
        type: ActivityType.Competing,
      }
    ],
    status: 'dnd',
  });
    try {
    client.application?.commands.create({
      name: 'hosting-control',
      description: 'control your host now!',
    });
        client.application?.commands.create({
      name: 'hosting-coins',
      description: 'buy coins to get your own 24/7 host now !',
      options: [
        {
          type: 4,
          name: 'amount',
          description: 'The amount of coins to purchase',
          required: true
        }
      ]
    });
    client.application?.commands.create({
      name: 'coins',
      description: "see somone 's coins",
      options: [
        {
          type: 6,
          name: 'user',
          description: 'The user that you want to display coins amount',
          required: true
        }
      ]
    });
    client.application?.commands.create({
      name: 'create-user',
      description: "Create User For Hosting Service",
      
    });

    
  } catch (error) {
    console.error(error);
  }

});


// 

client.on('messageCreate', async message => {
    if (message.author.id !== botid) {
        return;
    }

    if (message.content === 'ticket will be deleted in 3 seconds') {
        if (!message.guild) {
            return message.reply('.');
        }
    
    const transcript = await saveChannelTranscript(message.channel);

        
        const targetChannel = await client.channels.fetch(transcriptCHannel);

        
        await targetChannel.send({
          files: [{
            attachment: transcript,
            name: 'transcript.html'
          }]
        });

       
            
                
            
        
    }
});


        
       // 
      
      //////// transcript.//////
      
  function calculateRemainingTime(durationInSeconds) {
    const secondsInDay = 86400;
    const secondsInHour = 3600;
    const secondsInMinute = 60;

    const days = Math.floor(durationInSeconds / secondsInDay);
    const hours = Math.floor((durationInSeconds % secondsInDay) / secondsInHour);
    const minutes = Math.floor(((durationInSeconds % secondsInDay) % secondsInHour) / secondsInMinute);

    return { days, hours, minutes };
}    

      
     
      
      
//command control      
 client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'hosting-control') {
      
      const userId = interaction.user.id;
        const userServers = Object.entries(durationData)
            .filter(([serverName, data]) => data.userId === userId)
            .map(([serverName, data]) => ({ serverName, duration: data.duration }));
      const serverInfo =  userServers.map(({ serverName, duration }) => {
            const { days, hours, minutes } = calculateRemainingTime(duration);
            return `**${serverName}** : \n \`\`\`⌛ | ${days} يوم و ${hours} ساعة و ${minutes} دقيقة متبقية\`\`\``;
        });
      const embed1 = new EmbedBuilder().setTitle('Hosting Panel').setDescription('Monitor mode').setThumbnail('https://media.discordapp.net/attachments/1228417725072801864/1240584618382589962/Picsart_24-05-05_14-32-03-292.jpg?ex=664717f5&is=6645c675&hm=f05616361131f3ba6cf23e79754c1f97415462069ded7a87a8aa8e86e3ecd618&');

        const embed = new EmbedBuilder().setTitle('logs').setDescription('--------------\n'+ serverInfo.join('\n'));
    const row = new ActionRowBuilder()
      .addComponents(
        
        new ButtonBuilder().setCustomId('start').setLabel('تشغيل').setStyle('Success'),
        new ButtonBuilder().setCustomId('stop').setLabel('إيقاف').setStyle('Danger'),
        
        new
ButtonBuilder().setCustomId('setupLog').setLabel('إعداد السجل').setStyle('Secondary'),
        new ButtonBuilder().setCustomId('renew').setLabel('إضافة وقت').setStyle('Primary'),
        new ButtonBuilder().setCustomId('advanced').setLabel('التحكم المتقدم').setStyle('Secondary')
        
      );
      
      
      if (userServers.length === 0) {
            interaction.reply('**ليس لديك أي سيرفر.**');
            return;
        }

    await interaction.reply({ embeds: [embed1,embed], components: [row] });
  }
});





client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'renew') {
        const userId = interaction.user.id;
    const serverOptions = getServerOptions(userId);
    const userIdFromSlashCommand = interaction.message.interaction?.user.id;

   
    // 
    // Compare the user IDs
    if (userIdFromSlashCommand !== userId) {
     interaction.reply({content: '**لا  يمكنك إستخدام لوحة تحكم خاصة بمستخدم أخر <:exclamation:1197502800482009108>**.', ephemeral: true});
      
      return;
    }
      
      const logSetupModal = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder().setCustomId('renew').setPlaceholder('قم بإختيار سيرفر من القائمة').addOptions(serverOptions)
      );
      
    await interaction.reply({components: [logSetupModal], ephemeral: true });
      
      if (serverOptions.length === 0) {
      await interaction.reply({ content: "**ليس لديك أي سيرفر لإضافة وقت له.**", ephemeral: true });
      return;
    }
      
      
      }
});


////////user prv
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
    

  if (interaction.customId === 'advanced') {
      const userId = interaction.user.id;
    
    const userIdFromSlashCommand = interaction.message.interaction?.user.id;
      if (userIdFromSlashCommand !== userId) {
     interaction.reply({content: '**لا  يمكنك إستخدام لوحة تحكم خاصة بمستخدم أخر <:exclamation:1197502800482009108>**.', ephemeral: true});
      
      return;
    }
      
      const row = new ActionRowBuilder()
      .addComponents(
        
        new ButtonBuilder().setCustomId('installpack').setLabel('تحميل البكجات').setStyle('Secondary'),
        new ButtonBuilder().setCustomId('path').setLabel('مسار ملفاتي').setStyle('Secondary'),
        
        new
ButtonBuilder().setCustomId('edit1').setLabel('تعديل الملفات').setStyle('Secondary')
          );
     const embed2 = new EmbedBuilder()
      .setTitle('لوحة التحكم المتقدمة')
      .setDescription('إليك بعض المفاهيم لكل خيار لتبسيط إستخدام لوحة التحكم\n# تعديل الملفات\n•يمكنك هذا الخيار من تعديل ملفاتك التي رفعتها وعليك بعد إستخدام هذا الخيار إيقاف تشغيل السيرفر و إعادة تشغيله مرة أخرى لحفظ التقدم\n# مسار ملفاتي\n•يقوم هذا الخيار بإظهار البنية الخاصة بمشروعك المرفوع على السيرفر\n# تحميل البكجات\n•يمكنك هذا الخيار من تحميل البكجات التي إستخدمتها في مشروعك بضغطة زر\n `New options are coming Soon...`');
      interaction.user.send({embeds:[embed2],components:[row]});
      interaction.reply('**تم إرسال لوحة التحكم المتقدمة في الخاص.**');
      }
    });

  



//edit files 

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'edit1') {
        const userId = interaction.user.id;
    const serverOptions = getServerOptions(userId);
    const userIdFromSlashCommand = interaction.message.interaction?.user.id;

    
    
      
      const editModal = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder().setCustomId('edit2').setPlaceholder('قم بإختيار سيرفر من القائمة لتحديث ملفاته').addOptions(serverOptions)
      );
      
    await interaction.reply({ components: [editModal]});
      
      
      if (serverOptions.length === 0) {
      await interaction.reply({ content: "**ليس لديك أي سيرفر لنحديث ملفاته.**", ephemeral: true });
      return;
    }
      }
});

// 








///////function add month////////

function addMonthToServer(serverName, userId) {
    const currentDuration = durationData[serverName]?.duration || 0;
    durationData[serverName] = { userId, duration: currentDuration + 2592000}; // شهر
    saveDurationData(durationData);
}


client.on("interactionCreate", async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'renew') {
       
        const userId = interaction.user.id;
        const selectedServer = interaction.values[0]; 
       const userCoins = await getUserCoins(userId);
  
      if (userCoins === null || userCoins < 100) {
        await interaction.followUp(`**<@${userId}>, ليس لديك رصيد \`100 عملة\` لإتمام عملية الشراء . إستخدم </hosting-coins:1236961194854842408> للشراء.**`);
        return;
      }
          if (durationData[selectedServer]?.duration > 864000) {
            interaction.reply({ content: '**لا يمكنك تجديد السيرفر قبل 10 أيام متبقية.**', ephemeral: true });
            return;
        }   
  
      
      const newCoins = userCoins - 100;
      await setUserCoins(userId, newCoins);
        
        

             addMonthToServer(selectedServer, userId);
             

      
        

       
        const embed2 = new EmbedBuilder()
        .setTitle('logs')
        .setDescription(` تم إضافة 30 يوما للسيرفر خاصتك ، تبقى \`\`\`${newCoins}\`\`\` في رصيدك\n`)
        .setColor('#16f251');

        interaction.reply({embeds:[embed2]});
    }
});




 

client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'setupLog') {
    const userId = interaction.user.id;
    const serverOptions = getServerOptions(userId);
    const userIdFromSlashCommand = interaction.message.interaction?.user.id;

   
    

   
    if (userIdFromSlashCommand !== userId) {
     interaction.reply({content: '**لا  يمكنك إستخدام لوحة تحكم خاصة بمستخدم أخر <:exclamation:1197502800482009108>**', ephemeral: true});
      
      return;
    }

    if (serverOptions.length === 0) {
      await interaction.reply({ content: "You don't have any servers to set up logging for.", ephemeral: true });
      return;
    }

    const logSetupModal = new ActionRowBuilder()
      .addComponents(
        new SelectMenuBuilder().setCustomId('setupLogModal').setPlaceholder('قم بإختيار سيرفر لإعداد سجل خاص به').addOptions(serverOptions)
      );
      
    await interaction.reply({ components: [logSetupModal], ephemeral: true });
  }
});





function getServerOptions(userId) {
  const serversPath = path.join(__dirname, `./servers/${userId}`);
  try {
    const servers = fs.readdirSync(serversPath);
    const options = servers.map(serverName => ({
      label: serverName,
      value: serverName
    }));
    return options;
  } catch (error) {
    console.error("Error fetching server names:", error);
    return [];
  }
}



client.on("interactionCreate", async interaction => {
  if (!interaction.isSelectMenu()) return;

  if (interaction.customId === "setupLogModal") {
    const serverName = interaction.values[0];

    const start = new ModalBuilder()
      .setCustomId('webhookURLModal')
      .setTitle('Log Webhook URL')
      
      const yo = new TextInputBuilder()
          .setCustomId('webhookURL')
          .setLabel("أدخل رابط الويبهوك الخاص بالسجل")
          .setPlaceholder('https://developers-support.webhook.url')
          .setStyle(TextInputStyle.Short)
      

      const row = new ActionRowBuilder().addComponents(yo);
      start.addComponents(row);
      await interaction.showModal(start);

    
    interaction.client.selectedServerName = serverName;
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isModalSubmit()) {
    return;
  }
  if (interaction.customId !== "webhookURLModal") {
    return;
  }
    const webhookURL = interaction.fields.getTextInputValue("webhookURL");
    const serverName = interaction.client.selectedServerName;

   
    interaction.client.selectedServerName = null;

   
    const logData = loadLogData();
    logData[serverName] = webhookURL;
    saveLogData(logData);

    await interaction.reply({ content: "**تم تسطيب سجل السيرفر بنجاح ، سيتم إرسال كل الأخطاء أو المعلومات الخاصة بسيرفر عبر الويبهوك خاصتك ، يمكنك البدأ بتشغيل السيرفر خاصتك الآن !**", ephemeral: true });
  
});



function loadLogData() {
  try {
    const data = fs.readFileSync('log.json');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading log data:", error);
    return {};
  }
}


function saveLogData(logData) {
  try {
    fs.writeFileSync('log.json', JSON.stringify(logData, null, 2));
    console.log("Log data saved successfully.");
  } catch (error) {
    console.error("Error saving log data:", error);
  }
}



















client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'start') {
        const userId = interaction.user.id;
        
        const userIdFromSlashCommand = interaction.message.interaction?.user.id;
    
       
        
    
       
        if (userIdFromSlashCommand !== userId) {
         interaction.reply({content: '**لا  يمكنك إستخدام لوحة تحكم خاصة بمستخدم أخر <:exclamation:1197502800482009108>**', ephemeral: true});
          
          return;
        }
 
        const start = new ModalBuilder()
          .setCustomId('startmodal')
          .setTitle('Start Server');

      const servername = new TextInputBuilder()
          .setCustomId('servername')
          .setLabel("أدخل إسم السيرفر خاصتك")
          .setPlaceholder('Ex :developersSupport-7jldu3')
          .setStyle(TextInputStyle.Short)
                
      const row = new ActionRowBuilder().addComponents(servername);
      start.addComponents(row);
      await interaction.showModal(start);
          }
    
});        


//packss
client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'installpack') {
        const userId = interaction.user.id;
        
        const userIdFromSlashCommand = interaction.message.interaction?.user.id;
    
       
        
    
       
        
 // packs
        const start = new ModalBuilder()
          .setCustomId('instsll')
          .setTitle('Install Packages');

      const servername = new TextInputBuilder()
          .setCustomId('servername3')
          .setLabel("أدخل إسم السيرفر خاصتك")
          .setPlaceholder('Ex: developersSupport-577j8f')
          .setStyle(TextInputStyle.Short)
                
      const row = new ActionRowBuilder().addComponents(servername);
      start.addComponents(row);
      await interaction.showModal(start);
          }
    
});        

//stop
client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'stop') {
        const userId = interaction.user.id;
        
        const userIdFromSlashCommand = interaction.message.interaction?.user.id;
    
       
        
    
       
        if (userIdFromSlashCommand !== userId) {
         interaction.reply({content: '**لا  يمكنك إستخدام لوحة تحكم خاصة بمستخدم أخر <:exclamation:1197502800482009108>**', ephemeral: true});
          
          return;
        }
 //start modal brooooo
        const start = new ModalBuilder()
          .setCustomId('stopmodal')
          .setTitle('Stop Server');

      const servername = new TextInputBuilder()
          .setCustomId('servername2')
          .setLabel("أدخل إسم السيرفر خاصتك")
          .setPlaceholder('Ex: developersSupport-88fj3j')
          .setStyle(TextInputStyle.Short)
                
      const row = new ActionRowBuilder().addComponents(servername);
      start.addComponents(row);
      await interaction.showModal(start);
          }
    
});        





client.on('messageCreate', async message => {
    if (message.author !== '797800735034048532') return;
  if (message.content === '$setup-host-manger') {
    const embed = new EmbedBuilder().setDescription('Loading system information...');
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder().setCustomId('createUser').setLabel('Create User').setStyle('Primary'),
        new ButtonBuilder().setCustomId('start').setLabel('Start Server').setStyle('Primary'),
        new ButtonBuilder().setCustomId('stop').setLabel('Stop Server').setStyle('Primary'),
        new ButtonBuilder().setCustomId('installpack').setLabel('Package Installation').setStyle('Primary')
      );

    const sentMessage = '1208094789514563664';

   

     

    client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'start') {
 //start modal brooooo
        const start = new ModalBuilder()
          .setCustomId('startmodal')
          .setTitle('Start Host Server');

      const servername = new TextInputBuilder()
          .setCustomId('servername')
          .setLabel("Enter Server Name Here")
          .setPlaceholder('iyed on top')
          .setStyle(TextInputStyle.Short)
                
      const row = new ActionRowBuilder().addComponents(servername);
      start.addComponents(row);
      await interaction.showModal(start);
  
      } else if (interaction.customId === 'stop') {
        //stoppppp modal brooooo
          const stop = new ModalBuilder()
            .setCustomId('stopmodal')
            .setTitle('Stop Host Server');
       
          const servername2 = new TextInputBuilder()
            .setCustomId('servername2')
            .setLabel("Enter Server Name Here")
            .setPlaceholder('iyed on top')
            .setStyle(TextInputStyle.Short)
                       
          const row = new ActionRowBuilder().addComponents(servername2);
          stop.addComponents(row);
          await interaction.showModal(stop);


      } else if (interaction.customId === 'installpack') {
        //pacja==k==age modal brooooo
          const pack = new ModalBuilder()
            .setCustomId('instsll')
            .setTitle('Packages Host Server');
       
          const servername3 = new TextInputBuilder()
            .setCustomId('servername3')
            .setLabel("Enter Server Name Here")
            .setPlaceholder('iyed on top')
            .setStyle(TextInputStyle.Short)
                       
          const row = new ActionRowBuilder().addComponents(servername3);
          pack.addComponents(row);
          await interaction.showModal(pack);
      }
    });

    client.channels.cache.get(sentMessage).send({ embeds: [embed], components: [row] });
  }
});


const runningProcesses = {};


//start server panel 


client.on("interactionCreate", async interaction => {
  if (!interaction.isModalSubmit()) {
    return;
  }
  if (interaction.customId !== "startmodal") {
    return;
  }
  
  const userId = interaction.user.id;
  const serverName = interaction.fields.getTextInputValue("servername");
  const indexPath = path.join(__dirname, `./servers/${userId}/${serverName}/index.js`);
  
  fs.access(indexPath, fs.constants.F_OK, async err => {
    if (err) {
      await interaction.reply({
        content: "**لا يمكنني العثور على هذا الملف 😕! الرجاء الإعادة مجددا**.",
        ephemeral: true
      });
      return;
    }
    
    const childProcess = spawn('node', [indexPath], {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"]
    });
    
    if (!runningProcesses[userId]) {
      runningProcesses[userId] = {};
    }
    
    runningProcesses[userId][serverName] = childProcess;
    
    const webhookURL = getWebhookURL(userId, serverName);
    if (!webhookURL) {

      embed = new EmbedBuilder()
      .setTitle("Error 421")
        .setDescription("**عليك إعداد سجل السيرفر أول!**")
        .setColor("#ff0000");
      await interaction.reply({
        ephemeral: true ,
        embeds : [embed]        
      });
      return;
    }
    
    const webhook = new WebhookClient({ url: webhookURL });
    
    childProcess.stdout.on('data', (data) => {
      
      webhook.send(`\`\`\`ini\n [${serverName} Console]: ${data.toString()}\`\`\``);
    });
    
    childProcess.stderr.on('data', (data) => {
     
      webhook.send(`\`\`\`css\n [${serverName} Errors]: ${data.toString()}\`\`\``);
    });
    childProcess.on("close", (code, signal) => {
      console.log(`Child process for server ${serverName} closed with code ${code} and signal ${signal}`);
    });
    embed2 = new EmbedBuilder()
      .setTitle("Success")
      .setDescription("**تم تشغيل السيرفر خاصتك بنجاح! لا تنسى تقييم تجربتك مع خدمة الهوستات.**")
      .setColor("#22ff00");
    await interaction.reply({
      embeds : [embed2]
    });
  });
});
// 
function getWebhookURL(userId, serverName) {
  const logData = loadLogData();
  return logData[serverName];
}

//stop server panel 
// 
client.on("interactionCreate", async interaction => {
  if (!interaction.isModalSubmit()) {
    return;
  }
  if (interaction.customId !== "stopmodal") {
    return;
  }
  
  const userId = interaction.user.id;
  const serverName = interaction.fields.getTextInputValue("servername2");
  const indexPath = path.join(__dirname, `./servers/${userId}/${serverName}/index.js`);
  
  if (!fs.existsSync(indexPath)) {
    await interaction.reply({
      content: "**لا يمكنني العثور على هذا الملف 😕! الرجاء الإعادة مجددا**."
    });
    return;
  }
  
  if (runningProcesses[userId] && runningProcesses[userId][serverName]) {
    runningProcesses[userId][serverName].kill();
    delete runningProcesses[userId][serverName];
    await interaction.reply({
      content: "**تم إيقاف تشغيل السيرفر خاصتك بنجاح.**"
    });
  } else {
    await interaction.reply({
      content: "**يبدو أن السيرفر متوقف بالفعل🤔!**"
    });
  }
});



// 
client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit() || interaction.customId !== "instsll") {
    return;
  }
  
  const userId = interaction.user.id;
  const serverName = interaction.fields.getTextInputValue("servername3");
  const packageJsonPath = path.join(__dirname, `./${serversFolder}/${userId}/${serverName}/package.json`);
  
  await interaction.reply({
    content: "**جاري إعداد بيئة العمل...**"
  });
  
  try {
    const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const dependencies = packageJsonData.dependencies || {};
    const dependencyNames = Object.keys(dependencies);
    let installedCount = 0;
    const installationPromises = [];
    
    dependencyNames.forEach(dependencyName => {
      const npmInstallProcess = spawn("npm", ["install", dependencyName], {
        cwd: path.dirname(packageJsonPath),
        stdio: 'inherit'
      });// 
      const npmInstallPromise = new Promise((resolve, reject) => {
        npmInstallProcess.on("close", (exitCode, signal) => {
          console.log(`Package ${dependencyName} installed for server ${serverName} with code ${exitCode} and signal ${signal}`);
          installedCount++;
          interaction.editReply({
            content: `تم تحميل *£${dependencyName}** بنسبة (**${installedCount}**/**${dependencyNames.length}**)`
          }).then(resolve);
        });
        
        npmInstallProcess.on("error", error => {
          console.error(`Error installing package ${dependencyName}: ${error.message}`);
          reject(error);
        });
      });
      
      installationPromises.push(npmInstallPromise);
    });
    // 





    
    await Promise.all(installationPromises);
    
    await interaction.editReply({
      content: "**تم تحميل البكجات بنجاح.**"
    });
  } catch (error) {
    console.error(`Error setting up server ${serverName}: ${error.message}`);
    await interaction.editReply({
      content: `**البكجات مثبتة تلقائيا في السيرفر ${serverName}.**`
    });
  }
});




client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'create-user') {
      const userId = interaction.user.id;
      const accountsFilePath = path.join(__dirname, 'accounts.json'); 

// 
      fs.readFile(accountsFilePath, 'utf8', (err, data) => {
          if (err) {
              console.error(err);
              interaction.reply({ content: '**حدث خطأ ما خلال صنع مستخدم خاص بك.**' });
         return;
          }

          const accounts = JSON.parse(data);
          if (accounts[userId]) {
              interaction.reply({ content: '**أوه! يبدو أن لديك حساب بالفعل😅.**'});
              return;
          }


          const serversFolderPath = path.join(__dirname, 'servers');
          const installedFolderPath = path.join(__dirname, 'installed');

          if (!fs.existsSync(serversFolderPath)) {
              fs.mkdirSync(serversFolderPath);
          }

          if (!fs.existsSync(installedFolderPath)) {
              fs.mkdirSync(installedFolderPath);
          }

          const userServerFolderPath = path.join(serversFolderPath, userId);
          if (!fs.existsSync(userServerFolderPath)) {
              fs.mkdirSync(userServerFolderPath);
          }

          const userInstalledFolderPath = path.join(installedFolderPath, userId);
          if (!fs.existsSync(userInstalledFolderPath)) {
              fs.mkdirSync(userInstalledFolderPath);
          }
// 
          accounts[userId] = true;
          fs.writeFile(accountsFilePath, JSON.stringify(accounts), 'utf8', err => {
              if (err) {
                  console.error(err);
                  interaction.reply({ content: '**حدث خطأ ما خلال صنع المستخدم خاصتك.**'});
                  return;
              }
              interaction.reply({ content: '**تم صنع مستخدم خاص بك بنجاح 🎉!**' });
              
              
            
              
          });
      });
  }
});








// 
























//ticket
client.on('messageCreate', async message => {
  if (message.content === '$setup-bro-bro') {
    const embed = new EmbedBuilder()
      .setDescription(`## :battery:  hosting Bot\nمرحبا بك في خدمة هوستات خدمة المبرمجين. احصل على تجربة فريدة و قم برفع بوتك 24/7 الأن .\n**(كل المعلومات محفوظة و لا يتم إستخدامها لأي غرض من الأغراض)**\n**<:exclamation:1197502800482009108> يرجي قراءة المعلومات الموجوده بالاسفل لضمان تجربه مرضيه لك <:exclamation:1197502800482009108>**`);

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('openticket')
          .setLabel('Buy host')
          .setStyle('Secondary')
      );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});


//button open ticket 





client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  
  if (interaction.customId === 'openticket') {
    try {
      const category = targetCategoryID;
      const channel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`,
    type: 0,
    parent: category,
    permissionOverwrites: [
        {
            id: interaction.guild.roles.everyone.id,
            deny: ['ViewChannel'],
        },
        
        {
            id: interaction.user.id,
            allow: ['ViewChannel', 'SendMessages'],
        },
    ],
});

      const embed = new EmbedBuilder()
        .setDescription(`test`);
        
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('BuyServer')
          .setLabel('Buy Server')
          .setStyle('Primary'), 
        new ButtonBuilder()
          .setCustomId('closeTicket')
          .setLabel('close')
          .setStyle('Danger'),
      
        new ButtonBuilder()
          .setCustomId('info')
          .setLabel(' ')
          .setStyle('Secondary')   .setEmoji('👤')
      );

      await channel.send({content : `${interaction.user}`, embeds : [embed], components : [row]});
      await interaction.reply({content : `لقد تم انشاء تذكره لشراء هوست ${channel}`, ephemeral : true});
    } catch (error) {
      console.error('Error:', error.message);
      await interaction.reply({content : `حدث خطأ أثناء إنشاء التذكرة`, ephemeral : true});
    }
  } else if (interaction.customId === 'info') {
    
      await interaction.reply({content :`🙂حتى الفيديو مكسل تسويه ؟ لا تنس الفيدباك بالله تعبنا و حنا نسوي بروجكتات مجانية`});
        
  
  } else if (interaction.customId === 'closeTicket') {
    try {
      await interaction.reply(`سيتم حذف التذكرة بعد 3 ثواني`);
      setTimeout(async () => {
        await interaction.channel.delete();
      }, 5000);
    } catch (error) {
      console.error('Error:', error.message);
      await interaction.reply({content : `حدث خطأ أثناء حذف التذكرة`, ephemeral : true});
    }
  }
});




// 
const durationFilePath = 'duration.json';
function loadDurationData() {
  try {
      const data = fs.readFileSync(durationFilePath, 'utf8');
      return JSON.parse(data);
  } catch (err) {
      return {};
  }
}

// Save duration data to the JSON file
function saveDurationData(data) {
  fs.writeFileSync(durationFilePath, JSON.stringify(data, null, 4));
}


let durationData = loadDurationData();


function addServer(uniqueFileName, userId, duration) {
  const serverName = uniqueFileName;
  durationData[serverName] = { userId, duration };
  saveDurationData(durationData);
  return serverName;
}


function deleteServerFiles(userId, serverName) {
  const userServerPath = `${serversFolder}/${userId}/${serverName}`;
  const userInstalledPath = `${installedFolder}/${userId}/${serverName}.zip`;
  try {
      
      fs.rmdirSync(userServerPath, { recursive: true });
      
      fs.rmdirSync(userInstalledPath, { recursive: true });
      console.log(`Server files for ${serverName} deleted successfully.`);
  } catch (error) {
      console.error(`Error deleting server files for ${serverName}:`, error);
  }
}


function updateDuration() {
  for (const serverName of Object.keys(durationData)) {
      const { userId, duration } = durationData[serverName];
      durationData[serverName].duration -= 1; 
      if (durationData[serverName].duration <= 0) {
          
          deleteServerFiles(userId, serverName);
          delete durationData[serverName]; 
      }
  }
  saveDurationData(durationData);
}


setInterval(updateDuration, 1000);


// 



client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId === 'BuyServer') {
      const embed = new EmbedBuilder()
        .setDescription(`هل أنت متأكد أنك تريد شراء إستضافة؟`);
        
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('proceed')
          .setLabel('متأكد')
          .setEmoji('✔️')
                    
          .setStyle('Success'), 
          
        new ButtonBuilder()
          .setCustomId('closeTicket')
          .setLabel('لا لست متأكد')
          .setStyle('Danger')
          .setEmoji('✖️')
      );

      await interaction.reply({embeds : [embed], components : [row]});
  } else if (interaction.customId === 'proceed') {

    
    const userMention = interaction.user;
    const userId = userMention.id;
  
    try {
      const userCoins = await getUserCoins(userId);
  
      if (userCoins === null || userCoins < 100) {
        await interaction.reply(`<@${userId}>, ليس لديك رصيد عملات كافي لإتمام عملية الشراء . إستخدم </hosting-coins:1236961194854842408> للشراء.`);
        return;
      }
  
      
      const newCoins = userCoins - 100;
      await setUserCoins(userId, newCoins);
      const embed = new EmbedBuilder()
        .setTitle('فاتورة الشراء')
        .setDescription(`المشتري : <@${userId}> \n المبلغ المخصوم : **100** \n المبلغ المتبقي : **${newCoins} **\n\n \`يتوجب عليك الآن إرسال الملف الذي تريد رفعه بصيغة zip\` \n **لمزيد من المعلومات قم بالضغط على الزر أسفله** `);
        await interaction.reply({ embeds : [embed]});
      
    } catch (error) {
      console.error('Error deducting coins:', error);
      await interaction.reply('**حدث خطأ أثناء عملية الشراء ، الرجاء الإعادة مجددا.**');
    }
  

      

      pay = true
      if (pay) {
       
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  try {
    const channel = message.channel;
    if (channel.parentId !== targetCategoryID) return;

    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      if (attachment.name.endsWith('.zip')) {
        const userId = message.author.id;
        const fileName = attachment.name.split('.').slice(0, -1).join('.');
        const randomChars = generateRandomChars(6);
        const uniqueFileName = `${fileName}_${randomChars}`;
        const installPath = `${installedFolder}/${userId}/${uniqueFileName}`;
        const serverPath = path.resolve(`${serversFolder}/${userId}/${uniqueFileName}`);

        if (!fs.existsSync(installedFolder)) {
          fs.mkdirSync(installedFolder, { recursive: true });
        }
        if (!fs.existsSync(serversFolder)) {
          fs.mkdirSync(serversFolder, { recursive: true });
        }

        const accountsData = fs.readFileSync(accountsFilePath, 'utf8');
        const accounts = JSON.parse(accountsData);

        if (!accounts[userId]) {
          message.channel.send('**عليك صنع مستخدم قبل مواصلة عملية الشراء<:info:1198226470368190464>!  </create-user:1237438256627581030> **');
          return;
        }

        try {
          const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
          fs.writeFileSync(installPath, response.data);
          console.log(`Done downloading attachment successfully \n user : ${userId}`);
            const channel = client.channels.cache.get('1337860044565516368');
            
            const userCoins = await getUserCoins(userId);
            const oldCoins = userCoins + 100
            const suii = new EmbedBuilder()
            .setDescription(`**Server Name:** \n${uniqueFileName} \n\n**Client:** \n${message.author}\n\n**Coins After And Before Prurchase:**\n${userCoins} || ${oldCoins}`);

            channel.send({embeds:[suii]});
            const duration = 2592000;
            addServer(uniqueFileName, userId, duration);
            

          message.channel.send({ embeds: [createProgressEmbed()] }).then(async progressMessage => {
            let progressInterval;
            try {
              await extract(installPath, { dir: serverPath });
              console.log('Done extracting attachment successfully');

              clearInterval(progressInterval);
              
              setTimeout(() => {
                progressMessage.edit({ embeds: [createProgressEmbed1()] });
              }, 3000);

              setTimeout(() => {
                progressMessage.edit({ embeds: [createProgressEmbed2()] });
              }, 8000);
              setTimeout(() => {
                progressMessage.edit({ embeds: [createProgressEmbed3()] });
              }, 12000);
              
              setTimeout(() => {
                progressMessage.edit({ embeds:[createProgressEmbed4()]});
              }, 15000);
              
              setTimeout(() => {
                message.author.send({ embeds: [createCompletionEmbed(uniqueFileName)] });
              }, 18000);
              setTimeout(() => {
                  message.channel.send('ticket will be deleted in 3 seconds');
                  
                  } , 23000);
                
          
              setTimeout(() => {
                message.channel.delete()
              }, 26000);
              

              
              
// 
            } catch (extractionError) {
              console.error('An error occurred during extraction:', extractionError);
              progressMessage.edit({ embeds: [createErrorEmbed()] });
            }
          });
        } catch (downloadError) {
          console.error('An error occurred during download:', downloadError);
        }
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});   
    }
  }
});





// 
const originalConsoleLog = console.log;
console.log = function(...args) {
    originalConsoleLog(...args);


    const message = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 4) : a).join('\n');
    
    const MAX_LENGTH = 1900; 
    for (let i = 0; i < message.length; i += MAX_LENGTH) {
        const formattedMessage = '```json\n' + message.substring(i, i + MAX_LENGTH) + '\n```';


        axios.post(WEBHOOK_URL, {
            content: formattedMessage
        }).catch(err => originalConsoleLog('Error sending message:', err));
    }
};


// 

function updateCoins(userId, amount) {
    let coins = require('./coins.json');
    coins[author] = (coins[author] || 0) + amount;
    fs.writeFileSync('./coins.json', JSON.stringify(coins, null, 4));
}

let costWithFee; 
let iyed; 
let amount;
let cost;
let author

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'hosting-coins') {
    amount = interaction.options.getInteger('amount'); 
    costWithFee = amount * 2; // عوض ال 2 حط السعر من غير ضريبة
    cost = costWithFee === 1 ? 1 : Math.floor(costWithFee * 0.95);
    author = interaction.user.id

    iyed = bank;

    const embed = new EmbedBuilder().setDescription(`\`\`\`c ${iyed} ${costWithFee}\`\`\``);
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('Copy')
        .setLabel('Copy')
        .setStyle('Success')
    );

    
    await interaction.reply({ embeds: [embed], components: [row] });
  }
});
// 
client.on('interactionCreate', async buttonInteraction => {
  if (!buttonInteraction.isButton()) return;

  if (buttonInteraction.customId === 'Copy') {
    
    await buttonInteraction.reply({ ephemeral: true, content :`c ${iyed} ${costWithFee}`});
  }
});
recipientId = bank
client.on('messageCreate', async message => {
  if (message.content.includes(`${cost}`) & message.content.includes(`${recipientId}`) && message.author.id === "282859044593598464") {
    updateCoins(message.author.id, amount);
    console.log(author);
    message.channel.send(`<@${author}>, Added \`${amount}\` to your balance!`)
  }
});





client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'coins') {
    const userMention = interaction.options.getUser('user');
    const userId = userMention.id;

    const userCoins = await getUserCoins(userId);

    if (userCoins === null) {
      await interaction.reply(`<@${userId}>, You don't have any balance. Use </hosting-coins:1236961194854842408> to buy.`);
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`${userMention.displayName}'s Coins`)
      .setDescription(`Coins: ${userCoins}`);
    
    await interaction.reply({ embeds: [embed] });
  }
});






/////////////////////////functions///////////////////////////////////////////////


// 
async function getUserCoins(userId) {
  try {
    const data = fs.readFileSync('coins.json', 'utf8');
    const coins = JSON.parse(data);
    return coins[userId] || null;
  } catch (err) {
    console.error('Error reading coins:', err);
    return null;
  }
}

async function setUserCoins(userId, newCoins) {
  try {
    let data = fs.readFileSync('coins.json', 'utf8');
    let coins = JSON.parse(data);
    coins[userId] = newCoins;
    fs.writeFileSync('coins.json', JSON.stringify(coins));
  } catch (err) {
    console.error('Error updating coins:', err);
    throw err;
  }
}

function generateRandomChars(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
// 

function createProgressEmbed() {
  return new EmbedBuilder()
    .setTitle('Setup in Progress <a:StatusWickStudio:1336140123061883013>')
    .setDescription('جاري عملية الإعداد. الرجاء الانتظار...');
}

function createProgressEmbed1() {
  return new EmbedBuilder()
    .setTitle('Setup in Progress <a:StatusWickStudio:1336140123061883013>')
    .setDescription('جاري عملية الإعداد. الرجاء الانتظار...\n\n```Setting up database```');
}
function createProgressEmbed2() {
  return new EmbedBuilder()
    .setTitle('Setup in Progress <a:StatusWickStudio:1336140123061883013>')
    .setDescription('جاري عملية الإعداد. الرجاء الانتظار...\n\n```Setting up database\nSetting up server```');
}
function createProgressEmbed3() {
  return new EmbedBuilder()
    .setTitle('Setup in Progress <a:StatusWickStudio:1336140123061883013>')
    .setDescription('جاري عملية الإعداد. الرجاء الانتظار...\n\n```Setting up database\nSetting up server\nPasting Files```');
}

function createProgressEmbed4() {
  return new EmbedBuilder()

    .setDescription('تم إرسال معلومات الخادم الخاص بك في الخاص ✅')
    .setColor('#3dfc03');
}


function createCompletionEmbed(fileName) {
  return new EmbedBuilder()
    .setTitle('تم الإعداد بنجاح')
    .setDescription(`تم إكمال إعداد الخادم الخاص بك بنجاح. تم إرسال رسالة إلى البريد الخاص بك تحتوي على المعلومات التالية:\n\n**اسم الخادم**:\n\`\`\`${fileName}\`\`\` \n**كيفية تثبيت الخادم بعد رفعه؟**\n\n1- اكتب الأمر التالي في غرفة الأوامر \`/hosting-control\`\n2- اختر خيار تثبيت الحزم\n3- اكتب اسم الخادم الخاص بك\n4- اضغط على بدء الخادم\n5- سيعمل الخادم الخاص بك الآن بسلاسة دون أي مشاكل.`);
}

function createErrorEmbed() {
  return new EmbedBuilder()
    .setTitle('Error Occurred')
    .setDescription('حدث خطأ أثناء عملية الإعداد. يرجى المحاولة مرة أخرى لاحقًا.');
}


// Developers Support تم صنع هذا بروجكت من سيرفر 

client.login(token);

