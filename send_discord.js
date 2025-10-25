// send_discord.js
// Node 18+ (fetch built in). Use DISCOHOOK_URL env var.

const webhookUrl = process.env.DISCOHOOK_URL;
if (!webhookUrl) {
  console.error("Missing DISCOHOOK_URL environment variable");
  process.exit(1);
}

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

// ==== USER ID -> AVATAR MAPPING (paste yours here) ====
const userMapping = [
  { id: "1358906555898269817", avatar: "https://cdn.discordapp.com/avatars/1358906555898269817/bfe0e71dad6f9c6b4f86f9ef2eba679c.png?size=1024" },
  { id: "1412460057257443341", avatar: "https://cdn.discordapp.com/avatars/1412460057257443341/e0a40bcc3b8bc7d6b19c8e145427fe15.png?size=1024" },
  { id: "1359034199306403862", avatar: "https://cdn.discordapp.com/avatars/1359034199306403862/9d5a48d3edde73df22fb36fda1d8aa3d.png?size=1024" },
  { id: "1359186409952641226", avatar: "https://cdn.discordapp.com/avatars/1359186409952641226/851be19f719e3256bbae3c2e47738aad.png?size=1024" },
  { id: "1350686436516434121", avatar: "https://cdn.discordapp.com/avatars/1350686436516434121/58172c3bee40d03429951a1f87427b41.png?size=1024" },
  { id: "1350741546110292012", avatar: "https://cdn.discordapp.com/avatars/1350741546110292012/8786739f67f73456162c5480378cc9af.png?size=1024" },
  { id: "1420083774187896874", avatar: "https://cdn.discordapp.com/avatars/1420083774187896874/a263256c1d8582711ed644c78f7a7730.png?size=1024" },
  { id: "1349776662363111455", avatar: "https://cdn.discordapp.com/avatars/1349776662363111455/ba08ca86fb0f1634e7fac53ccf56c75c.png?size=1024" },
  { id: "1385735944904118304", avatar: "https://cdn.discordapp.com/avatars/1385735944904118304/7656566c59854f4d92fc3aea261de807.png?size=1024" },
  { id: "1418682142212227084", avatar: "https://cdn.discordapp.com/avatars/1418682142212227084/aede55946f83f6f82f6fbb3b54fe6de7.png?size=1024" },
  { id: "1412420184865767529", avatar: "https://cdn.discordapp.com/avatars/1412420184865767529/3ba7159a7fda558c062846a5061b174b.png?size=1024" },
  { id: "1387852277263634465", avatar: "https://cdn.discordapp.com/avatars/1387852277263634465/20d32091260641af73af80741eb9d872.png?size=1024" },
  { id: "1373735944875802675", avatar: "https://cdn.discordapp.com/avatars/1373735944875802675/4866e63fb8f4615bd4de519e3c0b07b7.png?size=1024" },
  { id: "1350332100305227826", avatar: "https://cdn.discordapp.com/avatars/1350332100305227826/51d79a1aa1d346870fdbd20c87d96eec.png?size=1024" },
  { id: "1392294380391632946", avatar: "https://cdn.discordapp.com/avatars/1392294380391632946/a99c69a3c3c954fee6e6e9599afb9107.png?size=1024" },
  { id: "1349273885576663103", avatar: "https://cdn.discordapp.com/avatars/1349273885576663103/73edf25d214ed4963aec4eddc85d65e7.png?size=1024" },
  { id: "1418318289406398647", avatar: "https://cdn.discordapp.com/avatars/1418318289406398647/3601f0edf1a99499fc30bafc26030b31.png?size=1024" },
  { id: "1418605664535842977", avatar: "https://cdn.discordapp.com/avatars/1418605664535842977/7d14de56424e53e7bfeca0c1410770a9.png?size=1024" },
  { id: "1385664520889958590", avatar: "https://cdn.discordapp.com/avatars/1385664520889958590/833ee367c59d5b49c158e39044b5da4e.png?size=1024" },
  { id: "1418608715493277696", avatar: "https://cdn.discordapp.com/avatars/1418608715493277696/a9d1b3cb40f5ef07152d5b8045fee36f.png?size=1024" }
];
// =============================================================

const products = [
  "Robux", "Limited Item", "Roblox Account", "UGC Item",
  "Gamepass", "Developer Product", "In-game Item (MM Item)", "VIP Server"
];

const reviews = [
  "Smooth middleman, got my Robux instantly.",
  "Trusted service — legit seller and fast MM.",
  "Paid and received the limited item without issues.",
  "Account transfer was clean, thanks!",
  "Perfect — verified and quick, would trade again.",
  "Seller tried to bamboozle but MM handled it ✅",
  "UGC delivered, quality as described.",
  "Gamepass purchase went through, thanks MM!"
];

const stars = ["⭐⭐⭐⭐⭐","⭐⭐⭐⭐","⭐⭐⭐"];

function pickRandomUser() {
  return rand(userMapping);
}

function buildPayload() {
  const user = pickRandomUser();
  const product = rand(products);
  const review = rand(reviews);
  const star = rand(stars);
  const game = rand([
    "Adopt Me!", "Jailbreak", "Murder Mystery 2", "Bloxburg",
    "Brookhaven", "Arsenal", "Pet Simulator X", "Royale High"
  ]);

  return {
    content: null,
    embeds: [
      {
        title: `#${randInt(1,999)} New Vouch Received`,
        description: `<@${user.id}> has submitted a vouch for **${product}** in *${game}*!`,
        color: 16745728,
        fields: [
          { name: "Product", value: product },
          { name: "Review", value: review },
          { name: "Stars", value: star }
        ],
        footer: { text: "discord.gg/ctcentral" },
        timestamp: new Date().toISOString(),
        thumbnail: { url: user.avatar }
      }
    ],
    username: "Crosstrade Central | Vouches",
    avatar_url: "https://cdn.discordapp.com/attachments/1335710092418482289/1428518124860473435/ctc.png",
    attachments: []
  };
}

async function send() {
  try {
    const payload = buildPayload();
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Failed to send webhook:", res.status, text);
      process.exit(2);
    }
    console.log("✅ Sent webhook. Mentioned:", payload.embeds[0].description);
  } catch (err) {
    console.error("Error sending webhook:", err);
    process.exit(3);
  }
}

send();
