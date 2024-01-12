import { emailHtmlTemplate } from 'src/common/constants/emailHtmlTemplate';
import { TEXTS } from 'src/common/constants/texts';

export const forgotPasswordMail = (email: string, token: string) => ({
  from: TEXTS.mail.common.from,
  to: email,
  subject: TEXTS.mail.forgotPassword.subject,
  html: emailHtmlTemplate({
    title: TEXTS.mail.forgotPassword.title,
    content: TEXTS.mail.forgotPassword.content,
    footer: TEXTS.mail.forgotPassword.footer,
    href: TEXTS.mail.forgotPassword.href + token,
    button: TEXTS.mail.forgotPassword.button,
  }),
});
