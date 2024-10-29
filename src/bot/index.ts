import { Telegraf, Markup } from "telegraf";
const token = process.env.TELEGRAM_BOT_TOKEN;
const serverUrl = process.env.SERVER_URL;

const bot = new Telegraf(token);
import axios from "axios";

// const getProfilePicture = async (userId: any) => {
//   try {
//     const photos = await bot.telegram.getUserProfilePhotos(userId);
//     if (photos.total_count > 0) {
//       const fileId = photos.photos[0][0].file_id;
//       const file = await bot.telegram.getFile(fileId);
//       return `https://api.telegram.org/file/bot${token}/${file.file_path}`;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error getting profile photo:", error);
//     return null;
//   }
// };

const getProfilePicture = async (userId: any) => {
  try {
    // const photos = await bot.telegram.getUserProfilePhotos(userId);

    const photosResponse = await axios.get(
      `https://api.telegram.org/bot${token}/getUserProfilePhotos`,
      {
        params: {
          user_id: userId,
        },
      }
    );

    if (photosResponse.data.result.total_count === 0) {
      return null;
    }

    if (photosResponse.data.ok && photosResponse.data.result.total_count > 0) {
      const fileId = photosResponse.data.result.photos[0][0].file_id;

      // Step 2: Get File Information
      const fileResponse = await axios.get(
        `https://api.telegram.org/bot${token}/getFile`,
        {
          params: {
            file_id: fileId,
          },
        }
      );

      if (fileResponse.data.ok) {
        const filePath = fileResponse.data.result.file_path;

        // Step 3: Construct the Download URL
        const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;

        return fileUrl;
      }
    }

    // if (photos.total_count > 0) {
    //   const fileId = photos.photos[0][0].file_id;
    //   const file = await bot.telegram.getFile(fileId);
    //   const profilePictureUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    //   console.log("Profile Picture URL:", profilePictureUrl); // Add this line
    //   return profilePictureUrl;
    // }
    // return null;
  } catch (error) {
    console.error("Error getting profile photo:", error);
    return null;
  }
};

const imageUrl =
  "https://res.cloudinary.com/djasnkjdo/image/upload/v1730210253/Jet_Design_xrkbve.png";

// bot.telegram

// Start command
bot.start(async (ctx) => {
  const referralCode = ctx.payload;
  const username = ctx.from.username;
  const profilePicture = await getProfilePicture(ctx.from.id);

  ctx.replyWithPhoto(
    { url: imageUrl },
    {
      caption: `Welcome to Space Kombat, @${ctx.from.username}!\n\n
      Step into the Space Kombat universe! \n\n
Experience the next level of gameplay on Telegram. Join the elite space warriors, where every move matters and your skills are put to the test. Complete missions, earn rewards, and dominate the galaxy. \n\n
Key Features \n
. Battle players in intergalactic Kombat \n
. Unlock and upgrade powerful ships and weapons. \n
. Challenge your friends and rise through the ranks/leaderboard. \n
Ready to embark on a thrilling space adventure? Let’s get started! \n\n
Welcome, Space Commander! \n\n

🚀 Upgrade your ship now, boost your ranking, and unlock exclusive rewards.\n
🎮 Challenge your fellow commanders and rise to the top. \n
`,
      reply_markup: {
        inline_keyboard: [
          //   [
          //     Markup.button.url(
          //       "💪💋 Join community",
          //       `https://t.me/oniontap/`
          //     ),
          //   ],
          //   [
          //     Markup.button.url(
          //       "OnionAI on X",
          //       "https://x.com/oniontap_bot?t=MvmutTzvpVTe8_PZK6apTA&s=09"
          //     ),
          //   ],
          // [
          //   Markup.button.webApp(
          //     "🔥 Test Play now!",
          //     `https://zl3tblm9-5173.uks1.devtunnels.ms/`
          //   ),
          // ],
          [
            Markup.button.webApp(
              "🔥 Play now!",
              `https://space-combat.vercel.app/`
            ),
          ],
        ],
      },
    }
  );

  //   console.log("started");
});

// Handle button clicks
bot.action("start_now", (ctx) => ctx.reply('You clicked "Start now!"'));
bot.action("join_community", (ctx) =>
  ctx.reply('You clicked "Join community"')
);
bot.action("help", (ctx) => ctx.reply('You clicked "Help"'));

// Launch the bot

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export default bot;
