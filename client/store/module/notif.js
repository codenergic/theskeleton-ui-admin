const state = {
  countdown: null,
  text: 'Success',
  variant: 'success'
};

const mutations = {
  showNotification(state, { countdown = 3, text = 'Success', variant = 'success' }) {
    state.countdown = countdown;
    state.text = text;
    state.variant = variant;
  },
  countdownNotif(state, countdown) {
    state.countdown = countdown;
  }
};

export default { mutations, state };
