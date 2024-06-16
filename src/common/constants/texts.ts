export const TEXTS = {
  mail: {
    common: {
      from: 'hoanghieufro@gmail.com',
    },
    register: {
      subject: 'Register Successfully!',
      title: 'Register Successfully!',
      content:
        'You are one more step to gain access to Zen Social Media, Click on the link above to activate your account',
      footer:
        " Zen is a place for everyone, we don't steal any data, we give you things that you need from a social media platform :)",
      href: `http://localhost:3001/v1/auth/activate-account/`,
      button: 'Click On this link to activate',
    },
    forgotPassword: {
      subject: 'Forgot your password?',
      title: 'A chance to change!',
      content:
        'Everybody in a lifetime forget their own password, welp all you gotta do is just change it again.',
      footer:
        'If this is not your intent, please ignore this message and just live a good life :) but you know that someone is trying to hack you.',
      href: `http://localhost:3001/v1/auth/change-forgotten-password/`,
      button: 'click on this link to change password',
    },
  },
};
