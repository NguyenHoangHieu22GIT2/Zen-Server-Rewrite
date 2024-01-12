import { emailHtmlTemplate } from 'src/common/constants/emailHtmlTemplate';
import { TEXTS } from 'src/common/constants/texts';

export const registerMail = (email: string, token: string) => ({
  from: TEXTS.mail.common.from,
  to: email,
  subject: TEXTS.mail.register.subject,
  html: emailHtmlTemplate({
    title: TEXTS.mail.register.title,
    content: TEXTS.mail.register.content,
    footer: TEXTS.mail.register.footer,
    href: TEXTS.mail.register.href + token,
    button: TEXTS.mail.register.button,
  }),
});
