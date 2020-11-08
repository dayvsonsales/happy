import Mail from "../lib/Mail";

interface User {
  name: string;
  email: string;
  resetLink: string;
}

interface MailData {
  data: object;
}

class ResetPasswordMail {
  get key() {
    return "ResetPassword";
  }

  async handle({ data: user }: MailData) {
    const { name, email, resetLink } = user as User;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: "Recuperação de senha",
      template: "resetpassword",
      context: {
        email,
        name,
        resetLink,
      },
    });
  }
}

export default new ResetPasswordMail();
