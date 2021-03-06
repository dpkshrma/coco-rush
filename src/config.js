export const NUM_CHOCOS = 10;
export const shareUrl = 'https://twitter.com/share?text=Play Coco Rush!&hashtags=cocorush';
export const forkUrl = 'https://github.com/dpkshrma/coco-rush';
export const gradientColors = [
  ['#2B32B2', '#1488CC'],
  ['#1D2671', '#C33764'],
  ['#ee0979', '#ff6a00'],
  ['#191654', '#43c6ac'],
];
export const API_URL =
  process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production'
    ? 'https://api.stackcrunch.io/cocorush'
    : 'http://localhost:3030/cocorush';
export const AUTH_TOKEN_ID = '';
export const GA_KEY = 'UA-58492803-5';
export const GA_EVENTS = {
  GAME_COMPLETED: 'GameCompleted',
  GAME_RESTART_CLICKED: 'GameRestartClicked',
  DONATE_CLICKED: 'DonateClicked',
};
