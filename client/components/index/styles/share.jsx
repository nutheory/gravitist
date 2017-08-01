import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

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
    [ss.sm]: {
      width: '100%',
    },
    [ss.md]: {
      width: '100%',
    },
    // [ss.lg]: {
    //   width: '70%',
    // }
  },
  pill: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: '0.6rem',
    border: `2px solid ${c.midGrey}`,
    borderRadius: '24px',
    padding: '6px 8px',
    width: '140px',
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
    color: c.midGrey,
  }
})

export default share
