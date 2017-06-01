import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const share = StyleSheet.create({
  container: {

  },
  innerContainer: {
    display: 'flex',
    flexGrow: '1',
    overflow: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 'auto',
    [scrSize.small]: {
      width: '100%',
    },
    [scrSize.medium]: {
      width: '100%',
    },
    // [scrSize.large]: {
    //   width: '70%',
    // }
  },
  pill: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: '1rem',
    border: `2px solid ${colors.midGrey}`,
    borderRadius: '24px',
    padding: '6px 8px',
    width: '160px',
  },
  icon: {
    display: 'inline-block',
    marginRight: '10px',
  },
  iconImg: {
    width: '24px',
    height: '24px'
  },
  text: {
    display: 'inline-block',
    fontFamily: 'poppins-semibold',
    color: colors.midGrey,
  }
})

export default share
