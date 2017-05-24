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
    display: 'flex',
    margin: '20px auto 0 auto',
    flexWrap: 'wrap',
    [scrSize.desktop]: {
      width: '70%',
    },
    [scrSize.smartphone]: {
      // width: '90%',
    }
  },
  feature: {
    display: 'flex',
    // flexWrap: 'wrap',
    alignItems: 'center',

    margin: '1rem 2rem',
    [scrSize.desktop]: {
      width: 'calc(33.33333% - 4rem)',
    },
    [scrSize.smartphone]: {
      // width: '90%',
    }
  },
  featureImgWrapper: {
    margin: ' 0 1.4rem 0 0.6rem'
  },
  featureText: {

  }
})

export default whatYouGet
