import * as vscode from "vscode";
import { getText } from "./util/file";
import sendEmail from "./util/sendEmail";

export function activate(context: vscode.ExtensionContext) {
  // 发送邮件
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.sendEmail", (uri) => {
      const length = uri.path.length;
      const path = uri.path.slice(1, length).replace(/\//g, "\\");
      const content = getText(path);
      if (path.includes(".html")) {
        sendEmail(content, "");
      } else {
        sendEmail("", content);
      }
    })
  );
}
