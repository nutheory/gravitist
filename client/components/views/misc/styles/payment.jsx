import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const payment = StyleSheet.create({
  container: {
    display: 'flex',
  },
  cardDisplay: {
    // display: '1',
    [ss.sm]: {
      display: 'none',
    },
    [ss.md]: {
      width: 'calc(60% - 4rem)',
      marginRight: '4rem',
    },
  },
  cardInfo: {
    // display: '1',
    [ss.sm]: {
      width: '100%',
    },
    [ss.md]: {
      width: '40%',
    },
  },
  StripeElement: {
    backgroundColor: c.white,
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid transparent',
    boxShadow: '0 1px 3px 0 #e6ebf1',
    transition: 'box-shadow 150ms ease'
  },
//   StripeElement--focus {
//   box-shadow: 0 1px 3px 0 #cfd7df;
// }
//
// .StripeElement--invalid {
//   border-color: #fa755a;
// }
//
// .StripeElement--webkit-autofill {
//   background-color: #fefde5 !important;
// }

})

export default payment
