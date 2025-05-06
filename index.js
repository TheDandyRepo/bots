const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');

const client = new Client();

// Array of lyrics to cycle through for the activity (displayed status)
const lyrics = [
  "tough.mp3",
  "red hot summer",
  "it's like really...",
  "I wanna be like you",
  "falling all over again",
  "you broke me first",
  "I still feel you"
];

// Array of image URLs to cycle through
const imageUrls = [
  'https://cdn.discordapp.com/attachments/123456789012345678/112233445566778899/image1.png',
  'https://cdn.discordapp.com/attachments/123456789012345678/112233445566778899/image2.png',
  'https://cdn.discordapp.com/attachments/123456789012345678/112233445566778899/image3.png'
];

// Set custom presence with random lyric and image
function setCustomPresence() {
  const randomLyric = lyrics[Math.floor(Math.random() * lyrics.length)];
  const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  // Set presence with random lyric and image
  try {
    client.user.setPresence({
      activities: [{
        name: randomLyric,  // Randomly selected lyric
        type: "LISTENING",
        state: "stream red hot summer",
        assets: {
          large_image: randomImageUrl  // Use the image URL here
        }
      }]
    });
    console.log(`Presence set with lyric: ${randomLyric} and image: ${randomImageUrl}`);
  } catch (err) {
    console.error("Failed to set presence:", err);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  setCustomPresence(); // Set presence on start

  // Cycle lyric and image every 5 minutes
  setInterval(() => {
    setCustomPresence();
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
});

client.login(process.env.TOKEN);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
