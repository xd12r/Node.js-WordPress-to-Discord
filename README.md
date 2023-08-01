# Node.js Discord Bot for Webhook Integration
[![License](https://img.shields.io/github/license/xd12r/Node.js-WordPress-to-Discord?color=green)](https://github.com/xd12r/Node.js-WordPress-to-Discord/blob/main/LICENSE)

This project provides a Node.js Discord bot that receives HTTP POST requests containing data about newly published posts on a WordPress website and sends it to a specified Discord channel. This enables real-time updates to be sent to a Discord server when new content is published on a WordPress site.

## Features

- Receives HTTP POST requests on a specified endpoint containing JSON data about newly published WordPress posts.
- Sends a formatted message to a specified Discord channel including the post title, URL, and an optional attached image.
- Downloads and attaches an image to the Discord message if a URL to a thumbnail image is included in the request body.
- Provides useful error logging.

## Installation

1. Download or clone this repository.
2. Run `npm install` in your project directory to install necessary dependencies.
3. Setting a `config.json` file in the project root and populate it with your Discord bot token and channel ID.
4. Start the bot with `node index.js`.

## Usage

1. Start your bot running on your server.
2. Set your WordPress webhook to point to the URL of your server where the bot is running, followed by '/webhook' (e.g., `http://myserver.com:3000/webhook`).
3. Publish a post on your WordPress site. The bot will receive the data, format a message, and send it to the specified Discord channel.

## Project that works together

| Name  | Release |
| ------------- | ------------- |
| [Discord Bot](https://github.com/xd12r/Node.js-WordPress-to-Discord)  | [![Bot Release](https://img.shields.io/github/v/release/xd12r/Node.js-WordPress-to-Discord)](https://github.com/xd12r/Node.js-WordPress-to-Discord/releases)  |
| [Wordpress Plugin](https://github.com/xd12r/Wordpress-xDr-Webhook)  | [![Plugin Release](https://img.shields.io/github/v/release/xd12r/Wordpress-xDr-Webhook)](https://github.com/xd12r/Wordpress-xDr-Webhook/releases)  |

## Code Overview

The bot uses the Discord.js library to interact with the Discord API. It sets up an Express.js server to listen for incoming HTTP POST requests. When it receives a request, it logs the headers and body, formats a message, and sends it to the specified Discord channel. If a URL to a thumbnail image is provided in the request body, it downloads the image, attaches it to the message, and then sends it to the channel.
