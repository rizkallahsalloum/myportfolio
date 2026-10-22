import localFont from 'next/font/local';

const editorsNote = localFont({
  src: [
    {
      path: '../fonts/editors-note/EditorsNote-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },

    {
      path: '../fonts/editors-note/EditorsNote-Extralight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-ExtralightItalic.ttf',
      weight: '200',
      style: 'italic',
    },

    {
      path: '../fonts/editors-note/EditorsNote-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },

    {
      path: '../fonts/editors-note/EditorsNote-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-Italic.ttf',
      weight: '400',
      style: 'italic',
    },

    {
      path: '../fonts/editors-note/EditorsNote-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },

    {
      path: '../fonts/editors-note/EditorsNote-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-SemiboldItalic.ttf',
      weight: '600',
      style: 'italic',
    },

    {
      path: '../fonts/editors-note/EditorsNote-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/editors-note/EditorsNote-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--secondary-font',
});

const neueHaasGroteskDisplay = localFont({
  src: [
    {
      path: '../fonts/neue-haas-grotesk-display-pro/NeueHaasDisplayBlack.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--primary-font',
});

export { editorsNote, neueHaasGroteskDisplay };
