const fs = require('fs');
const nodemailer = require('nodemailer');
const user = fs.readFileSync('/etc/secrets/user', 'utf8');
const pass = fs.readFileSync('/etc/secrets/pass', 'utf8');
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user, // generated ethereal user
    pass, // generated ethereal password
  },
});
async function sendMail(username, attachments, tel = '无', remark = '无') {
  try {
    const info = await transporter.sendMail({
      from: `"${username} 需要打印的文件" <2653194090@qq.com>`, // sender address
      to: '2653194090@qq.com', // list of receivers
      subject: `${username}需要打印的文件`, // Subject line
      html: `联系方式: ${tel}
      备注: ${remark}`, // html body
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
