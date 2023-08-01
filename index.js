const axios = require('axios');
const fs = require('fs');
const { Client, Events, GatewayIntentBits, Partials, AttachmentBuilder } = require('discord.js');
const { token, channelid } = require('./config.json');
const express = require('express');
const bodyParser = require('body-parser');
const Discord = require('discord.js');
const path = require('path');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

// Webhook WP
const app = express();

app.use(bodyParser.json()); // parses incoming JSON
app.use(express.json());

app.post('/webhook', async (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    const channel = client.channels.cache.get(channelid);

    if (!channel) {
        console.log('Could not find channel. Check your channel ID.');
    } else {
        try {
            // prepare the message
            const message = `@everyone\nNew post published: ${req.body.title}\nURL: ${req.body.url}`;

            // if thumbnail URL exists, download the image and attach it to the message
            if (req.body.thumbnail_url) {
                // create temp directory if not exist
                const dir = './temp';
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                
                // download the image
                const response = await axios.get(req.body.thumbnail_url, {
                    responseType: 'arraybuffer'
                });
                const imageBuffer = Buffer.from(response.data, 'binary');
                const fileName = path.join(dir, `${req.body.id}.jpg`);

                // write it to file
                fs.writeFileSync(fileName, imageBuffer);

                // create a new message attachment
                const attachment = new AttachmentBuilder(fileName);

                // send the message and attachment
                channel.send({
                    content: message,
                    files: [attachment],
                })
                .then(message => {
                    console.log(`Sent message: ${message.content}`);
                    // delete the image file from server after sending
                    fs.unlinkSync(fileName);
                })
                .catch(console.error);
            } else {
                // if no thumbnail URL, just send the message
                channel.send(message)
                .then(message => console.log(`Sent message: ${message.content}`))
                .catch(console.error);
            }
        } catch (error) {
            console.error(`Failed to download or send image: ${error}`);
        }
    }

    res.sendStatus(200);
});

// Handles GET request
app.get('/webhook', (req, res) => {
    res.send('Webhook setup is complete!');
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

