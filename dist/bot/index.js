"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const token = process.env.TELEGRAM_BOT_TOKEN;
const serverUrl = process.env.SERVER_URL;
const bot = new telegraf_1.Telegraf(token);
const axios_1 = __importDefault(require("axios"));
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
const getProfilePicture = async (userId) => {
    try {
        // const photos = await bot.telegram.getUserProfilePhotos(userId);
        const photosResponse = await axios_1.default.get(`https://api.telegram.org/bot${token}/getUserProfilePhotos`, {
            params: {
                user_id: userId,
            },
        });
        if (photosResponse.data.result.total_count === 0) {
            return null;
        }
        if (photosResponse.data.ok && photosResponse.data.result.total_count > 0) {
            const fileId = photosResponse.data.result.photos[0][0].file_id;
            // Step 2: Get File Information
            const fileResponse = await axios_1.default.get(`https://api.telegram.org/bot${token}/getFile`, {
                params: {
                    file_id: fileId,
                },
            });
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
    }
    catch (error) {
        console.error("Error getting profile photo:", error);
        return null;
    }
};
const imageUrl = "https://res.cloudinary.com/wallnet/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1716556851/onionai_sny5e8.png";
// bot.telegram
// Start command
bot.start(async (ctx) => {
    const referralCode = ctx.payload;
    const username = ctx.from.username;
    const profilePicture = await getProfilePicture(ctx.from.id);
    ctx.replyWithPhoto({ url: imageUrl }, {
        caption: `Welcome to Onion AI, @${ctx.from.username}!\n\nBoost your balance with every tap.\n\Space Combat: Leading the way in decentralized platforms.\nOur decentralized platform integrates advanced AI with robust data processing for Real-World Assets (RWAs).\nGet ready for the biggest distribution of Onion AI Token among users. \n\nInvite your network—more connections mean more rewards!\n\nJoin us on our mission to lead AI-driven RWA management.`,
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
                    telegraf_1.Markup.button.webApp("🔥 Play now!", `https://space-combat.vercel.app/`),
                ],
            ],
        },
    });
    //   console.log("started");
});
// Handle button clicks
bot.action("start_now", (ctx) => ctx.reply('You clicked "Start now!"'));
bot.action("join_community", (ctx) => ctx.reply('You clicked "Join community"'));
bot.action("help", (ctx) => ctx.reply('You clicked "Help"'));
// Launch the bot
// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
exports.default = bot;
//# sourceMappingURL=index.js.map