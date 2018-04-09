/**
 * @argument mailInfo
 * receiverEmail: String
 * receiverName: String
 * mailType: String
 */
exports.mailer = function (mailInfo) {
  var nodemailer = require("nodemailer");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'merlionsharing@gmail.com',
      pass: 'merlionsharinganyone'
    }
  });

  var mailOptions

  switch (mailInfo.mailType) {

    case ConsentForSale:
      mailOptions = {
        from: "NUS Chinese Drama <nuscfacd@gmail.com>",
        to: mailInfo.receiverEmail,
        subject: "恋爱的犀牛-电子票 |E-ticket for Rhinoceros in Love",
        html:
          '<body style=""><div class="disclaimer" style="text-align:center;font-size:11px;color:#6C7A89;margin-bottom:20px;">Please use a mobile device to view the ticket if the page looks distorted. Should you have any questions for us, pleasecontact SHI TIANYUAN@ Email: tianyuan.shi@u.nus.edu<br/>如果页面看起来十分杂乱，请使用移动设备打开。如有任何疑问，请联系 石添元@ Email: tianyuan.shi@u.nus.edu</div><div class="ticket" style=""><div class="ticket-header" style="text-align:center;font-size:30px;">Hi! ' + receiver.name + '</div><div class="ticket-body" style="background-color:#7e0e0e;"><div class="ticket-body__image" style="margin: auto;width: 80%;padding-top:30px;"><img src="http://preview.ibb.co/hdaC7c/Rhino.png" alt="RHINO_PIC" title="rhino" style="width:100%;"></div><div class="ticket-body__header-main" style="text-align:center;font-size:22px;font-weight:bold;color:white;padding-top:10px;">恋爱的犀牛 | Rhinoceros in Love</div><div class="ticket-body__header-sub" style="text-align:center;font-size:16px;color:white;">by NUS Chinese Drama, a member of NUS Centre For the Arts</div><div class="ticket-body__header-sub" style="text-align:center;font-size:10px;color:white;">*Advisory - Some Mature Content | 忠告级 - 含有部分成人内容</div><div class="ticket-body__text" style="width:100%;vertical-align:top;text-align:center;font-size:20px;color:white;padding-bottom:5%;padding-top:30px;"><div class="ticket-body__text-time" style="">您要观看的演出是：<br/>' + receiver.showTime + '</div><div class="ticket-body__text-time" style="">Reserved performance slot:<br/>' + englishDateTime + '</div><div class="ticket-body__text-time" style="font-size:16px;font-weight:bold;padding-top:20px;">演出开始前30分钟开始入场<br/>演出将准时开始，迟到者可能被拒绝入场!<br/></div><div class="ticket-body__text-time" style="font-size:14px;font-weight:bold;padding-top:5px;">Doors open 30mins before performance<br/>Please note that performance will start on time.<br/>Latecomers might be denied entry into the theatre.<br/></div><div class="ticket-body__text-time" style="padding-top:20px;">您注册的票数 (Number of Tickets Registered):&nbsp' + receiver.numberOfTix + ' </div><div class="ticket-body__text-venue" style="padding-top:20px;">地点 (Performance venue):<br/>Dance Atelier 2, Level 3,<br/>Stephen Riady Centre, University Town,<br/>2 College Ave West,<br/>Singapore 138607</div><div class="ticket-body__text-instruction" style="font-size:16px;padding-top:20px;">出示下图的二维码作为入场凭据<br/>多张票可重复扫描同个二维码<br/>如果二维码无法显示请<a href="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300"style="background-color:#ffffff;color:#7e0e0e;text-decoration:none;font-weight:bold;">点击此处</a></div><div class="ticket-body__text-instruction" style="font-size:16px;padding-top:5px;">Please flash QR code upon entry.<br/>Each QR code can be scanned repeatedly depending on number of tickets registered.<br/>Please <a href="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300"style="background-color:#ffffff;color:#7e0e0e;text-decoration:none;font-weight:bold;">click here</a> if you have difficulty viewing the QR code.</div></div><div class="ticket-body__QR" style="margin: auto;width: 200px;padding: 10px;"><img src="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300" alt="QR_CODE"title="TICKET" width="200" align="middle" /></div></div></div></div></body>'
      };

    case BuyerPayment:
      mailOptions = {
        from: "NUS Chinese Drama <nuscfacd@gmail.com>",
        to: mailInfo.receiverEmail,
        subject: "恋爱的犀牛-电子票 |E-ticket for Rhinoceros in Love",
        html:
          '<body style=""><div class="disclaimer" style="text-align:center;font-size:11px;color:#6C7A89;margin-bottom:20px;">Please use a mobile device to view the ticket if the page looks distorted. Should you have any questions for us, pleasecontact SHI TIANYUAN@ Email: tianyuan.shi@u.nus.edu<br/>如果页面看起来十分杂乱，请使用移动设备打开。如有任何疑问，请联系 石添元@ Email: tianyuan.shi@u.nus.edu</div><div class="ticket" style=""><div class="ticket-header" style="text-align:center;font-size:30px;">Hi! ' + receiver.name + '</div><div class="ticket-body" style="background-color:#7e0e0e;"><div class="ticket-body__image" style="margin: auto;width: 80%;padding-top:30px;"><img src="http://preview.ibb.co/hdaC7c/Rhino.png" alt="RHINO_PIC" title="rhino" style="width:100%;"></div><div class="ticket-body__header-main" style="text-align:center;font-size:22px;font-weight:bold;color:white;padding-top:10px;">恋爱的犀牛 | Rhinoceros in Love</div><div class="ticket-body__header-sub" style="text-align:center;font-size:16px;color:white;">by NUS Chinese Drama, a member of NUS Centre For the Arts</div><div class="ticket-body__header-sub" style="text-align:center;font-size:10px;color:white;">*Advisory - Some Mature Content | 忠告级 - 含有部分成人内容</div><div class="ticket-body__text" style="width:100%;vertical-align:top;text-align:center;font-size:20px;color:white;padding-bottom:5%;padding-top:30px;"><div class="ticket-body__text-time" style="">您要观看的演出是：<br/>' + receiver.showTime + '</div><div class="ticket-body__text-time" style="">Reserved performance slot:<br/>' + englishDateTime + '</div><div class="ticket-body__text-time" style="font-size:16px;font-weight:bold;padding-top:20px;">演出开始前30分钟开始入场<br/>演出将准时开始，迟到者可能被拒绝入场!<br/></div><div class="ticket-body__text-time" style="font-size:14px;font-weight:bold;padding-top:5px;">Doors open 30mins before performance<br/>Please note that performance will start on time.<br/>Latecomers might be denied entry into the theatre.<br/></div><div class="ticket-body__text-time" style="padding-top:20px;">您注册的票数 (Number of Tickets Registered):&nbsp' + receiver.numberOfTix + ' </div><div class="ticket-body__text-venue" style="padding-top:20px;">地点 (Performance venue):<br/>Dance Atelier 2, Level 3,<br/>Stephen Riady Centre, University Town,<br/>2 College Ave West,<br/>Singapore 138607</div><div class="ticket-body__text-instruction" style="font-size:16px;padding-top:20px;">出示下图的二维码作为入场凭据<br/>多张票可重复扫描同个二维码<br/>如果二维码无法显示请<a href="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300"style="background-color:#ffffff;color:#7e0e0e;text-decoration:none;font-weight:bold;">点击此处</a></div><div class="ticket-body__text-instruction" style="font-size:16px;padding-top:5px;">Please flash QR code upon entry.<br/>Each QR code can be scanned repeatedly depending on number of tickets registered.<br/>Please <a href="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300"style="background-color:#ffffff;color:#7e0e0e;text-decoration:none;font-weight:bold;">click here</a> if you have difficulty viewing the QR code.</div></div><div class="ticket-body__QR" style="margin: auto;width: 200px;padding: 10px;"><img src="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300" alt="QR_CODE"title="TICKET" width="200" align="middle" /></div></div></div></div></body>'
      };
    case ConsentTransfer:
      mailOptions = {
        from: "NUS Chinese Drama <nuscfacd@gmail.com>",
        to: mailInfo.receiverEmail,
        subject: "恋爱的犀牛-电子票 |E-ticket for Rhinoceros in Love",
        html:
          '<body style=""><div class="disclaimer" style="text-align:center;font-size:11px;color:#6C7A89;margin-bottom:20px;">Please use a mobile device to view the ticket if the page looks distorted. Should you have any questions for us, pleasecontact SHI TIANYUAN@ Email: tianyuan.shi@u.nus.edu<br/>如果页面看起来十分杂乱，请使用移动设备打开。如有任何疑问，请联系 石添元@ Email: tianyuan.shi@u.nus.edu</div><div class="ticket" style=""><div class="ticket-header" style="text-align:center;font-size:30px;">Hi! ' + receiver.name + '</div><div class="ticket-body" style="background-color:#7e0e0e;"><div class="ticket-body__image" style="margin: auto;width: 80%;padding-top:30px;"><img src="http://preview.ibb.co/hdaC7c/Rhino.png" alt="RHINO_PIC" title="rhino" style="width:100%;"></div><div class="ticket-body__header-main" style="text-align:center;font-size:22px;font-weight:bold;color:white;padding-top:10px;">恋爱的犀牛 | Rhinoceros in Love</div><div class="ticket-body__header-sub" style="text-align:center;font-size:16px;color:white;">by NUS Chinese Drama, a member of NUS Centre For the Arts</div><div class="ticket-body__header-sub" style="text-align:center;font-size:10px;color:white;">*Advisory - Some Mature Content | 忠告级 - 含有部分成人内容</div><div class="ticket-body__text" style="width:100%;vertical-align:top;text-align:center;font-size:20px;color:white;padding-bottom:5%;padding-top:30px;"><div class="ticket-body__text-time" style="">您要观看的演出是：<br/>' + receiver.showTime + '</div><div class="ticket-body__text-time" style="">Reserved performance slot:<br/>' + englishDateTime + '</div><div class="ticket-body__text-time" style="font-size:16px;font-weight:bold;padding-top:20px;">演出开始前30分钟开始入场<br/>演出将准时开始，迟到者可能被拒绝入场!<br/></div><div class="ticket-body__text-time" style="font-size:14px;font-weight:bold;padding-top:5px;">Doors open 30mins before performance<br/>Please note that performance will start on time.<br/>Latecomers might be denied entry into the theatre.<br/></div><div class="ticket-body__text-time" style="padding-top:20px;">您注册的票数 (Number of Tickets Registered):&nbsp' + receiver.numberOfTix + ' </div><div class="ticket-body__text-venue" style="padding-top:20px;">地点 (Performance venue):<br/>Dance Atelier 2, Level 3,<br/>Stephen Riady Centre, University Town,<br/>2 College Ave West,<br/>Singapore 138607</div><div class="ticket-body__text-instruction" style="font-size:16px;padding-top:20px;">出示下图的二维码作为入场凭据<br/>多张票可重复扫描同个二维码<br/>如果二维码无法显示请<a href="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300"style="background-color:#ffffff;color:#7e0e0e;text-decoration:none;font-weight:bold;">点击此处</a></div><div class="ticket-body__text-instruction" style="font-size:16px;padding-top:5px;">Please flash QR code upon entry.<br/>Each QR code can be scanned repeatedly depending on number of tickets registered.<br/>Please <a href="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300"style="background-color:#ffffff;color:#7e0e0e;text-decoration:none;font-weight:bold;">click here</a> if you have difficulty viewing the QR code.</div></div><div class="ticket-body__QR" style="margin: auto;width: 200px;padding: 10px;"><img src="https://api.qrserver.com/v1/create-qr-code/?data=' + receiver.submissionId + '&amp;size=300x300" alt="QR_CODE"title="TICKET" width="200" align="middle" /></div></div></div></div></body>'
      };

    default:
      console.log(`Invalid Mail Type: ${mailInfo.mailType}`)
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response + ' delivered to:' + receiver.email);
    }
  });
}
