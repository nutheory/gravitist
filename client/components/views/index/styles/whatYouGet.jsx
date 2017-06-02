import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../../styles/helpers'

const whatYouGet = StyleSheet.create({
  featuresList: {
    display: 'flex',
    margin: '3rem auto 0 auto',
    flexWrap: 'wrap',
    [ss.lg]: {
      width: '96%',
    },
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 2rem',
    [ss.sm]: {
    },
    [ss.md]: {
      width: 'calc(50% - 4rem)',
    },
    [ss.lg]: {
      width: 'calc(33.33333% - 4rem)',
    },

  },
  featureImgWrapper: {
    margin: ' 0 1.4rem 0 0.6rem'
  },
  featureText: {

  }
})

export default whatYouGet
