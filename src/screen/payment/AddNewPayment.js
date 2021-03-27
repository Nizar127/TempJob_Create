import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Header, Container } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './components/Button';
import stripe from 'tipsi-stripe';
stripe.setOptions({
    publishableKey:
        'pk_test_Vsl7TzdVtZmpbgY0nN0Smn8S00Ap8g1mAT',
})

export default class AddNewPayment extends PureComponent {
    static title = 'Card Form'

    state = {
        loading: false,
        token: null,
    }

    handleCardPayPress = async () => {
        try {
            this.setState({ loading: true, token: null })

            const params = {
                // mandatory
                number: '4242424242424242',
                expMonth: 11,
                expYear: 25,
                cvc: '223',
                // optional
                name: 'Test User',
                currency: 'usd',
                addressLine1: '123 Test Street',
                addressLine2: 'Apt. 5',
                addressCity: 'Test City',
                addressState: 'Test State',
                addressCountry: 'Test Country',
                addressZip: '55555',
              }
              
              const token2 = await stripe.createTokenWithCard(params)
              console.log("token2",token2)


            const token = await stripe.paymentRequestWithCardForm({
                // Only iOS support this options
               //smsAutofillDisabled: true,
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: 'Ahmad Fakhrul Nizar',
                        line1: '272, Lorong Tok Payung',
                        line2: 'Kuala Ibai',
                        city: 'Kuala Terengganu',
                        state: 'Terengganu',
                        country: 'MY',
                        postalCode: '20400',
                        email: 'ahmadfakhrul127@gmail.com',
                    },
                },
            })

            
            this.setState({ loading: false, token:token2})
        } catch (error) {
            console.log("error", error)
            this.setState({ loading: false })
        }
    }

   /*  https://us-central1-getjob-8c6bc.cloudfunctions.net/payWithStripe */
    
    doPayment = async () => {
        console.log("doPayment")
        fetch('http://192.168.0.145:5000/getjob-8c6bc/us-central1/payWithStripe',

         {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 100,
            currency: "usd",
            token: this.state.token
          }),
        })
          .then((response) => {
              console.log("response", response);
              return response.json();
          })
          .then((responseJson) => {
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      }

    render() {
        const { loading, token } = this.state

        return (
            <Container>

                <View style={styles.container}>

                    <Text style={styles.header}>
                        Add Card Here
          </Text>
                    <Text style={styles.instruction}>
                        Click button to show Card Form dialog.
          </Text>
                    <Button
                        text="Enter you card and pay"
                        loading={loading}
                        onPress={this.handleCardPayPress}
                    />

                    <Button
                        text="Make Payment"
                        loading={loading}
                        onPress={this.doPayment}
                    />
                    <View
                        style={styles.token}
                    >
                        {token &&
                            <Text style={styles.instruction}>
                                Token: {token.tokenId}
                            </Text>
                        }
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    token: {
        height: 20,
    },
})
