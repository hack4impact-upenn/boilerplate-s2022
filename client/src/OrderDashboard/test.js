const fetch = require('node-fetch');
// Use environment variable for API key - never commit secrets!
const API_KEY = process.env.TYPEFORM_API_KEY || '';
const url = '';
const headers = {
  Authorization: `Bearer ${API_KEY}`,
};
fetch(url, { headers })
  .then((res) => res.json())
  .then((data) => {
    const orders = [];
    (data.items || []).forEach((item) => {
      const order = {};
      order.uuid = item.response_id;
      order.submittedAt = item.submitted_at;

      const { answers } = item;
      order.firstName = answers[0].text;
      order.lastName = answers[1].text;
      order.name = `${order.firstName} ${order.lastName}`;
      order.phoneNumber = answers[2].phone_number;
      order.email = answers[3].email;
      order.amountPaid = item.variables[1].value;
      order.discountPrice = item.variables[0].value;

      let index = answers.findIndex(
        (item) => item.field?.id === 'Oh5JQY5PZFww',
      );
      if (index !== -1) {
        order.company = answers[4].text;
      } else {
        order.company = '';
      }

      index = answers.findIndex((item) => item.field?.id === 'cWlsB4bhhrqY');
      if (index !== -1) {
        order.discountCode = answers[index].text;
      } else {
        order.discountCode = '';
      }

      index = answers.findIndex((item) => item.field?.id === 'ShAWyFsXRXQB');
      order.popcornQuantities = {
        caramel: answers[index].number,
        respresso: answers[index + 1].number,
        butter: answers[index + 2].number,
        cheddar: answers[index + 3].number,
        kettle: answers[index + 4].number,
      };
      orders.push(order);
    });
    console.log(orders);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
