const ageGate = document.getElementById('age-gate');
const site = document.getElementById('site');
const blockedMsg = document.getElementById('age-blocked');

document.getElementById('age-yes').addEventListener('click', () => {
  ageGate.hidden = true;
  site.hidden = false;
});

document.getElementById('age-no').addEventListener('click', () => {
  document.querySelector('.age-gate__actions').hidden = true;
  blockedMsg.hidden = false;
});
