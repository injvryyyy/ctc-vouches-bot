// send_discord.js
// Node 18+
// Sends a vouch message every 43 minutes (as scheduled by GitHub Actions).
// - Title: "New Vouch Received"
// - Description: "<@USER> has submitted a vouch!"
// - Random product (Ingame Items, Robux, Limiteds, Selling)
// - Only 4–5 stars
// - Uses your provided user IDs and profile pictures.

const webhookUrl = process.env.DISCOHOOK_URL;
if (!webhookUrl) {
  console.error("Missing DISCOHOOK_URL environment variable");
  process.exit(1);
}

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ==== USER ID -> AVATAR MAPPING ====
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
  { id: "1421458094575058954", avatar: "https://cdn.discordapp.com/embed/avatars/0.png" },
  { id: "1397454862433779722", avatar: "https://cdn.discordapp.com/avatars/1397454862433779722/48bf1e41abb732675609a19277e77d20.png?size=1024" },
  { id: "1350256101068902430", avatar: "https://cdn.discordapp.com/avatars/1350256101068902430/5bb661307cb2839b355fdc133c1e9db4.png?size=1024" },
  { id: "1385678142596841563", avatar: "https://cdn.discordapp.com/avatars/1385678142596841563/eca7982db204598724d3ce4d17011d6f.png?size=1024" },
  { id: "1385851772525871136", avatar: "https://cdn.discordapp.com/avatars/1385851772525871136/acdbd0987a3731115656a5573d58fa17.png?size=1024" },
  { id: "1349352459557928970", avatar: "https://cdn.discordapp.com/avatars/1349352459557928970/130d4b8b7ba7d7445614889a865532b6.png?size=1024" },
  { id: "1296170440905199721", avatar: "https://cdn.discordapp.com/avatars/1296170440905199721/ab810cc666d2806851fe6459572cb097.png?size=1024" },
  { id: "1418450248891764917", avatar: "https://cdn.discordapp.com/avatars/1418450248891764917/9593bef00c1c44ea03ca90e2a7e9e72e.png?size=1024" },
  { id: "1349812252970324069", avatar: "https://cdn.discordapp.com/avatars/1349812252970324069/704a3ded21c150814db900ec04573c10.png?size=1024" },
  { id: "1420081458521051229", avatar: "https://cdn.discordapp.com/avatars/1420081458521051229/11920f042d44912190a55ea554dd3f07.png?size=1024" },
  { id: "1417892799902384389", avatar: "https://cdn.discordapp.com/avatars/1417892799902384389/b455287108004e8067bc5330597fc426.png?size=1024" },
  { id: "1350277833485979658", avatar: "https://cdn.discordapp.com/avatars/1350277833485979658/9d7283c4d8bfe6eed72aa2173a69a279.png?size=1024" },
  { id: "1397298117006721135", avatar: "https://cdn.discordapp.com/avatars/1397298117006721135/212a124225b829f50dd545211c939642.png?size=1024" },
  { id: "1387337996319199233", avatar: "https://cdn.discordapp.com/avatars/1387337996319199233/784a76372efa345b32efd731f8bb1906.png?size=1024" },
  { id: "1418450935822155809", avatar: "https://cdn.discordapp.com/avatars/1418450935822155809/3177230cccef97751670e1f8b25b69c8.png?size=1024" },
  { id: "1422239699405111360", avatar: "https://cdn.discordapp.com/avatars/1422239699405111360/df8c42f009c53b8047ac575a81fd6706.png?size=1024" },
  { id: "1412347517160390707", avatar: "https://cdn.discordapp.com/avatars/1412347517160390707/2cab3c9c9fac531c06cbe51b42274ac2.png?size=1024" },
  { id: "1412452350764777472", avatar: "https://cdn.discordapp.com/avatars/1412452350764777472/a8a630545cc2e80a11d3a3bed2644856.png?size=1024" },
  { id: "1388473807332970569", avatar: "https://cdn.discordapp.com/avatars/1388473807332970569/de6441d0cf689b0eaa33ebe933706384.png?size=1024" },
  { id: "1368663470589083709", avatar: "https://cdn.discordapp.com/avatars/1368663470589083709/361dee1ae77771df2819aa2384195048.png?size=1024" },
  { id: "1420684878076186729", avatar: "https://cdn.discordapp.com/avatars/1420684878076186729/8cfd32be73f1d500106683a188b16bf6.png?size=1024" },
  { id: "1397596258033598587", avatar: "https://cdn.discordapp.com/avatars/1397596258033598587/68c04ca0a83e1578689c7231eb81f459.png?size=1024" },
  { id: "1421504951636725781", avatar: "https://cdn.discordapp.com/avatars/1421504951636725781/5bd7edd04a3008976e3ee60263b5d230.png?size=1024" },
  { id: "1423494068695990372", avatar: "https://cdn.discordapp.com/avatars/1423494068695990372/ddc8bc3b67392d40faa165dd1d963dec.png?size=1024" },
  { id: "1385285648180838440", avatar: "https://cdn.discordapp.com/avatars/1385285648180838440/1d7f32a8ae96d482f7fef2c76c80a1b4.png?size=1024" },
  { id: "1395597810891751434", avatar: "https://cdn.discordapp.com/avatars/1395597810891751434/5abf11495269d586f4288fcf7cf48794.png?size=1024" },
  { id: "1387442467317743687", avatar: "https://cdn.discordapp.com/avatars/1387442467317743687/f4725285b91c7041235d6171fde2252e.png?size=1024" },
  { id: "1423630735830417480", avatar: "https://cdn.discordapp.com/avatars/1423630735830417480/5509fb958b703ffdc05eb370302c806b.png?size=1024" },
  { id: "1418608715493277696", avatar: "https://cdn.discordapp.com/avatars/1418608715493277696/a9d1b3cb40f5ef07152d5b8045fee36f.png?size=1024" }
];
// =========================================================

const reviews = [
  "Very fast and legit!",
  "what can I say, just too good",
  "W Seller bro",
  "Im only gonna use this server from now on",
  "great service",
  "received my stuff in 20 minutes",
  "thanks you so much for being legit",
  "couldnt be better",
  "legittt",
  "w legit seller",
  "got my stuff",
  "w server gng",
  "way too underrated",
  "legit asf",
  "best Seller",
  "W",
  "Trusted",
  "trusted asf",
  "I thought this wasnt legit at first",
  "way too good",
  "Got my stuff fast",
  "best seller ever",
  "underrated ash",
  "best tools frfr",
  "Will buy again soon"
];

const stars = ["⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
const products = ["Ingame Items", "Cheap Currency", "Tool"];

function buildPayload() {
  const user = rand(userMapping);
  const review = rand(reviews);
  const star = rand(stars);
  const product = rand(products);

  return {
    content: null,
    embeds: [
      {
        title: "New Vouch Received",
        description: `<@${user.id}> has submitted a vouch!`,
        color: 4294901760,
        fields: [
          { name: "Product", value: product },
          { name: "Review", value: review },
          { name: "Stars", value: star }
        ],
        footer: { text: "discord.gg/algorithm" },
        timestamp: new Date().toISOString(),
        thumbnail: { url: user.avatar }
      }
    ],
    username: "Algorithm Tools | Vouches",
    avatar_url:
      "https://media.discordapp.net/attachments/1428520457191161933/1434242524456816700/standard_2.gif?ex=69079df0&is=69064c70&hm=3abf650eadc563a648238494956236846480a52e5e7b961d1f5887d10ec49a63&=",
    attachments: []
  };
}

async function send() {
  const payload = buildPayload();
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    console.error("Webhook failed:", res.status, await res.text());
    process.exit(1);
  }
  console.log("✅ Sent:", payload.embeds[0].description);
}

send();
