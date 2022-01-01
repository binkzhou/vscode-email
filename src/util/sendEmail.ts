import * as vscode from "vscode";
import * as nodemailer from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

// 读取配置文件
const configuration = vscode.workspace.getConfiguration();

// email type
type EmailType = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  to: string;
  subject: string;
};

function emailTo(html: string, text: string) {
  const emailConfig = configuration.get("emailConfig") as EmailType;
  const transporter = nodemailer.createTransport(emailConfig);

  // 发送者
  const from = emailConfig.auth.user;
  // 接受者，主题
  const { to, subject } = emailConfig;
  const mailOptions: Mail.Options = { from, subject, to };
  if (html) {
    mailOptions.html = html;
  } else {
    mailOptions.text = text;
  }
  try {
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        vscode.window.showInformationMessage(`发送失败`);
        return;
      }
      vscode.window.showInformationMessage(`发送成功`);
    });
  } catch (err) {
    vscode.window.showInformationMessage(`发送失败`);
  }
}

const sendEmail = (html: string, text: string) => {
  emailTo(html, text);
};

export default sendEmail;
