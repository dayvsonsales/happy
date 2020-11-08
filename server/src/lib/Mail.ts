import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "path";
import exphbs from "express-handlebars";
import nodemailerhbs from "nodemailer-express-handlebars";

import * as SMTPTransport from "nodemailer/lib/smtp-transport";

import mailConfig from "../config/mail";

class Mail {
  private transporter: Transporter;

  constructor() {
    const { host, port, secure, auth } = mailConfig;

    console.log(host, port, secure, auth);

    const options: SMTPTransport.Options = {
      host,
      port: Number(port),
      secure,
      auth: {
        user: auth.user || "",
        pass: auth.pass || "",
      },
    };

    this.transporter = nodemailer.createTransport(options);

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, "..", "views", "emails");

    this.transporter.use(
      "compile",
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, "layouts"),
          partialsDir: resolve(viewPath, "partials"),
          defaultLayout: "default",
          extname: ".hbs",
        }),
        viewPath,
        extName: ".hbs",
      })
    );
  }

  sendMail(message: any) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
