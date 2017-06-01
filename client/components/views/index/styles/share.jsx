import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const share = StyleSheet.create({
  container: {

  },
  innerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto',
    justifyContent: 'space-between',
    [scrSize.desktop]: {
      width: '70%',
    },
    [scrSize.smartphone]: {
      width: '100%',
    }
  },
  pill: {
    flex: '1',
    margin: '1rem',
    border: `2px solid ${colors.midGrey}`,
    borderRadius: '24px',
    padding: '6px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '160px',
    [scrSize.small]: {
      ':last-child': {
        margin: '1rem auto',
      }
    }
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
