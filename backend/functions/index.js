// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();
const db = admin.firestore();
var Jimp = require("jimp");
var QRCode = require("qrcode");
var min_len = 8;
var max_len = 12;
var letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
var nums = "1234567890";
var letters_nums = letters + nums;
var fs = require("fs");
const bucket = admin.storage().bucket();
var dataUriToBuffer = require('data-uri-to-buffer');
var Canvas = require('canvas');
//var Canvas = require('canvas');
function getHTML(name) {
    return `
    <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<title>
Registration ACK
</title>    
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
a{
color:blue;
}
#outlook a {
padding: 0;
}

.ReadMsgBody {
width: 100%;
}

.ExternalClass {
width: 100%;
}

.ExternalClass * {
line-height: 100%;
}

body {
margin: 0;
padding: 0;
-webkit-text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
}

table,
td {
border-collapse: collapse;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt;
}

img {
border: 0;
height: auto;
line-height: 100%;
outline: none;
text-decoration: none;
-ms-interpolation-mode: bicubic;
}

p {
display: block;
margin: 13px 0;
}
</style>
<!--[if !mso]><!-->
<style type="text/css">
@media only screen and (max-width:480px) {
@-ms-viewport {
width: 320px;
}

@viewport {
width: 320px;
}
}
</style>
<link rel="stylesheet" text="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
<style type="text/css">
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
</style>
<style type="text/css">
@media only screen and (min-width:480px) {
.mj-column-per-80 {
width: 80% !important;
}

.mj-column-per-100 {
width: 100% !important;
}
}

.mj-column-per-20 {
width: 20% !important;
}
</style>
<style type="text/css">


.float {
margin-top: 5px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

width: 90%;

}

.footer {
width: 80%;

}

.hack {
font-size: 30px;
}

.hi {
font-size: 22px;
}

@media only screen and (max-width: 700px) {

.hack {
font-size: 20px;
}

.hi {
font-size: 18px;
}

}
</style>
</head>

<body style="background-color:#414141f6;">
<div style="background-color:#414141f6;">
<div style="Margin:0px auto;max-width:600px;">

<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
<tbody>
<tr>
    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
    </td>
</tr>
<tr>
    <td style="width:350px;">
    <div style="width: 350px; margin:auto;">
        
    </div>
    </td>
</tr>
</tbody>
</table>

</div>
<div class="float" style="background:rgb(255, 255, 255);background-color:rgb(255, 255, 255);Margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
style="background:rgb(255, 255, 255);background-color:rgb(255, 255, 255);">
<tbody>
<tr>
    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
    <div class="mj-column-per-80 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="border-collapse:collapse;border-spacing:0px;">
                <tbody>

                </tbody>
            </table>

            </td>
        </tr>
        <tr>
            <td align="center" background="#515151"
            style="background:#f5d000;font-size:0px;padding:2.5px 2.5px; word-break:break-word;">
            </td>
        </tr>
        <tr>
            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            <div
                style="font-family:'Courier New', Courier, monospace;font-size:20px;line-height:1;color:#000; font-weight: bold">Hola ${name}!
            </div>
            <div
                style="font-family: Arial, Helvetica, sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#000;">
                <p>
                I see you've signed up for our workshop😃. The details for the workshop are as follows:
                </p>
                <br>
                <b>Platform: </b> Google Meet
                <br>
                <b>Date: </b> 26th - 27th September, 2020
                <br>
                <b>Timings: </b> 5pm  -7pm
                <br>
                <br>
                Here is your pass for the event <br><img src="cid:image1" style="width:100%;max-width: 400px;">
                <br>
                
                <br><br><b>PS: </b>We have limited number of seats. So if your friends want to register, tell them to hurry!
            </div>
            </td>
        </tr>
        <tr>
            <td align="center" vertical-align="middle"
            style="font-size:0px;padding:10px 25px;word-break:break-word;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="border-collapse:separate;line-height:100%;">
                <tr>
                </tr>
            </table>
            </td>
        </tr>
        <tr>
            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            <div
                style="font-family:'Courier New', Courier, monospace;font-size:15px;line-height:1;text-align:center;color:#555; font-weight: bold">
                Thanks, KJSCE CodeCell
            </div>
            </td>
        </tr>
        </table>
    </div>
    </td>
</tr>
</tbody>
</table>
</div>
<div class="footer" style="Margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
<tbody>
<tr>
    <td
    style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;text-align:center;vertical-align:top;">
    <div class="mj-column-per-20 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:5px 5px;word-break:break-word;">
            <div
                style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:25px;line-height:1;text-align:center;color:white;">
                <a href="https://www.facebook.com/kjscecodecell/"><img width="25px"
                    src="https://kjscehackmails.surge.sh/facebook.png"></img></a>
            </div>
            </td>
        </tr>
        </table>
    </div>
    <div class="mj-column-per-20 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:5px 5px;word-break:break-word;">
            <div
                style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:25px;line-height:1;text-align:center;color:white;">
                <a href="https://www.instagram.com/kjsce_codecell/?hl=en"><img width="25px"
                    src="https://kjscehackmails.surge.sh/instagram.png"></img></a>
            </div>
            </td>
        </tr>
        </table>
    </div>
    <div class="mj-column-per-20 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:5px 5px;word-break:break-word;">
            <div
                style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:25px;line-height:1;text-align:center;color:white;">
                <a href="https://twitter.com/kjsce_codecell?lang=en"><img width="25px"
                    src="https://kjscehackmails.surge.sh/twitter.png"></img></a>
            </div>
            </td>
        </tr>
        </table>
    </div>
    <div class="mj-column-per-20 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:5px 5px;word-break:break-word;">
            <div
                style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:25px;line-height:1;text-align:center;color:white;">
                <a href="https://github.com/KJSCE-Codecell"><img width="25px"
                    src="https://kjscehackmails.surge.sh/github.png"></img></a>
            </div>
            </td>
        </tr>
        </table>
    </div>
    <div class="mj-column-per-20 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:5px 5px;word-break:break-word;">
            <div
                style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:25px;line-height:1;text-align:center;color:white;">
                <a href="https://www.linkedin.com/company/kjscecodecell/about/"><img width="25px"
                    src="https://kjscehackmails.surge.sh/linkedin.png"></img></a>
            </div>
            </td>
        </tr>
        </table>
    </div>
    </td>
</tr>
</tbody>
</table>
</div>
<div style="Margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
<tbody>
<tr>
    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0;text-align:center;vertical-align:top;">
    <div class="mj-column-per-100 outlook-group-fix"
        style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
        width="100%">
        <tr>
            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
            <div
                style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:white;">
                Copyright © KJSCE Codecell, All rights reserved.
            </div>
            </td>
        </tr>
        </table>
    </div>
    </td>
</tr>
</tbody>
</table>
</div>
</div>

</body>

</html>`;
}

function getRandomInt(min, max) {
    var min1 = Math.ceil(min);
    var max1 = Math.floor(max);
    return Math.floor(Math.random() * (max1 - min1)) + min1;
}
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "codecell.engg@somaiya.edu",
        pass: "qemdrffjocywaday"
    }
});

function pass_gen(name, email, payment) {
    var s = "";
    for (var i = 0; i < getRandomInt(min_len, max_len); i++) {
        s = s + letters_nums[getRandomInt(0, letters_nums.length)];
    }
    var fname = s;

    if (name.length >= 20) {
        name = name.split(" ");
        if (name.length >= 2) {
            name = name[0] + " " + name[1][0] + "."
        } else {
            name = name[0]
        }
    }
    name = name.toUpperCase();

    var seat =
        getRandomInt(1, 100).toString() +
        letters[getRandomInt(0, letters.length)].toUpperCase();

    var final =
        "Name: " +
        name +
        "\nEmail: " +
        email +
        "\nRoom: B-215\n" +
        "Reach us: http://bit.ly/makebot\n" +
        "Payment Status: " +
        payment;
    return [seat, fname, final];
}

async function overlay(imgBuf, name, dest, final) {

    console.log(final);
    // let uri = await QRCode.toDataURL(final[2])
    // var decoded = dataUriToBuffer(uri);
    // let jimg = await Jimp.read(imgBuf);
    // let barcode = await Jimp.read(decoded);
    // jimg.composite(barcode, 400, 375);

    // let myFont = bucket.file('font.fnt');
    // myFont = await myFont.download();
    // myFont = myFont[0];

    // let myTGA = bucket.file('font_0.tga');
    // myTGA = await myTGA.download();
    // myTGA = myTGA[0];
    // fs.writeFileSync('/tmp/font.fnt',myFont);
    // console.log('TGA:', myTGA)
    // fs.writeFileSync('/tmp/font_0.tga',myTGA);
    // let font = await Jimp.loadFont('/tmp/font.fnt');
    // jimg.print(font, 15, 300, name);
    // jimg.print(font, 470, 300, final[0]);


    // jimg = await jimg.getBufferAsync(Jimp.MIME_PNG);
    // let image = new Canvas.Image;
    // image.src = jimg;
    // canvas = new Canvas.createCanvas(image.width, image.height);
    // 
    // let ctx = canvas.getContext('2d');
    // ctx.drawImage(image, 0, 0);

    if (name.length > 20) {
        name = name.split(" ")
        if (name.length >= 2) {
            name = name[0] + " " + name[1][0] + "."
        } else {
            name = name[0]
        }
    }

    ctx.font = '900 32px sans-serif';
    ctx.fillText(name, 15, 310)
        // ctx.fillText(final[0], 470, 310)
    return dataUriToBuffer(canvas.toDataURL())

}

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // getting dest email by query string
        const dest = req.body.email;
        const name = req.body.name;
        const opts = req.body.opts;
        let final = pass_gen(name, dest, "Pending");
        // let seat = final[0];
        let myImage = bucket.file("pass.png");
        console.log(myImage);
        let chkEmail = db.collection("python");
        let getDoc = chkEmail
            .where("dest", "==", dest)
            .get()
            .then(snapshot => {
                if (!snapshot.empty) {
                    res.send("Email already exists.");
                    return;
                } else {
                    db.collection("python").add({ dest: dest, name: name, year: opts });


                    // .then( err => err)
                    // .then()
                    myImage.download().then(img => {
                        imag = img[0];
                        console.log("IMGIMGIMG", imag, img);
                        overlay(imag, name, dest, final).then(buf => {
                            const mailOptions = {
                                from: "KJSCE CodeCell <codecell.engg@somaiya.edu>", // Something like: Jane Doe <janedoe@gmail.com>
                                to: dest,
                                subject: "Workshop Registration ACK", // email subject
                                html: getHTML(name),
                                attachments: [{
                                    filename: "pass.png",
                                    content: buf.toString("base64"),
                                    encoding: "base64",
                                    cid: "image1" //same cid value as in the html img src
                                }]
                            };
                            return transporter.sendMail(
                                mailOptions,
                                (erro, info) => {
                                    if (erro) {
                                        return res.send(erro.toString());
                                    }
                                    return res.send("Yayay");
                                }
                            );
                        });
                    });
                }
            }); // returning result
    });
});