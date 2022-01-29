const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '252535978@qq.com', // generated ethereal user
    pass: 'rqajgilrrxdubgfa', // generated ethereal password
  },
});
async function sendMail(username, attachments) {
  try {
    const info = await transporter.sendMail({
      from: `"${username} 需要打印的文件" <252535978@qq.com>`, // sender address
      to: '923983844@qq.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      html: '见附件', // html body
      attachments,
    });
    console.log(nodemailer.getTestMessageUrl(info));
  } catch (e) {
    console.log(e);
    throw e;
  }
}

module.exports = {
  sendMail,
};
