const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { sendMail } = require('./utils/sendMail');

var upload = multer({
  dest: 'uploads/',
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', upload.single('file'), async function (req, res) {
  // 改名
  const { destination, filename, originalname } = req.file;
  const filepath = path.join(destination, originalname);
  await fs.rename(path.join(destination, filename), filepath);

  res.json({
    msg: '上传成功',
    data: {
      path: filepath,
      filename: originalname,
    },
  });
});

app.post('/send', async function (req, res) {
  console.log(req.body);
  const { username, attachments = [], tel = '无', remark = '无' } = req.body;
  if (!username) {
    res.json({ msg: '请输入你的名字' });
    return;
  }

  if (!attachments || attachments.length === 0) {
    res.json({ msg: '你还没有是传文件呢' });
    return;
  }
  try {
    await sendMail(username, attachments, tel, remark);
    res.json({ msg: '发送成功, 我们会尽快为你打印' });
    return;
  } catch (e) {
    console.log(e);
    res.json({ msg: '发送失败' });
    return;
  }
});

app.get('/', function (req, res) {
  res.redirect('https://www.baidu.com');
});

app.listen(process.env.PORT || 3001);
