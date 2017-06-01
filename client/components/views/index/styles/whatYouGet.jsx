import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const whatYouGet = StyleSheet.create({
  featuresList: {
    display: 'flex',
    margin: 'auto',
    flexWrap: 'wrap',
    [scrSize.large]: {
      width: '96%',
    },
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem 2rem',
    [scrSize.small]: {
    },
    [scrSize.medium]: {
      width: 'calc(50% - 4rem)',
    },
    [scrSize.large]: {
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
