
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_fg6DR9zxHXE5XXFRRUH0S6E600jZFontO0');

exports.payWithStripe = functions.https.onRequest((request, response) => {
//console.log("Request", request)
console.log("request", request.body.token)
console.log("Request:",request.body.amount)
console.log("Request2:",request.body.currency)


    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
 /*    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
    }).then((charge) => {
        console.log("charge",charge)
            // asynchronously called
            response.send(charge);
        })
        .catch(err =>{
            console.log(err);
        }); */

       stripe.customers.create({
            email: 'YOUR_EMAILtest@test.com',
            source: request.body.token.tokenId,
          })
          .then(customer => {
              console.log("customer", customer)
            return stripe.charges.create({
              amount: request.body.amount, // Unit: cents
              currency: 'eur',
              customer: customer.id,
              source: customer.default_source,
              description: 'Test payment',
            })
          })
          .then((charge) => {
            console.log("charge",charge)
                // asynchronously called
                response.send(charge);
            })
            .catch(err =>{
                console.log(err);
            });

});