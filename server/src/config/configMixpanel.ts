import Mixpanel from 'mixpanel';

const token = process.env.MIXPANEL_TOKEN || 'DEFAULT_TOKEN';
const mixpanel = Mixpanel.init(token);

console.log('Mixpanel initialized with token:', token);
console.log('Mixpanel:', mixpanel.people);

export default mixpanel;
