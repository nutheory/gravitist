import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const whatYouGet = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(top, rgba(192, 192, 170, 0.1), rgba(28, 239, 255, 0.1))',
  },
  featuresList: {
    width: '70%',
    display: 'flex',
    margin: '20px auto 0 auto',
    flexWrap: 'wrap',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(33.33333% - 4rem)',
    margin: '1rem 2rem'
  },
  featureImgWrapper: {
    margin: ' 0 1.4rem 0 0.6rem'
  },
  featureText: {

  }
})

export default whatYouGet
