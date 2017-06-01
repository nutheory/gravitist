import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../../styles/helpers'

const pricing = StyleSheet.create({
  container: {
    display: 'flex',
    margin: '1rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  planList: {
    margin: '1rem auto 0 auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  plan: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    fontFamily: 'poppins-semibold',
    borderRadius: '4px',
    border: '1px solid #e5e5e5',
    boxShadow: '1px 1px 2px #5e5e5e',
    padding: '1rem 2rem 2rem 2rem',
    [scrSize.small]: {
      width: 'calc(100% - 6rem - 2px)',
      margin: '1rem',
    },
    [scrSize.medium]: {
      width: 'calc(50% - 6rem - 2px)',
      margin: '1rem',
      ':last-child': {
        width: 'calc(100% - 4rem - 2px)'
      }
    },
    [scrSize.large]: {
      margin: '0rem 0.6rem',
      minHeight: '520px',
    },
  },
  planTitle: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.5rem',
  },
  changeLink: {
    fontFamily: 'poppins-regular',
    fontSize: '0.875rem',
  },
  details: {
    alignSelf: 'flex-start',
    flexDirection: 'column'
  },
  price: {
    flex: '1 1 100%',
    fontFamily: 'poppins-semibold',
    fontSize: '2rem',
  },
  dollarSign: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.2rem',
    verticalAlign: 'top'
  },
  cents: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.2rem',
  },
  desc: {
    flex: '1 1 100%',
    textTransform: 'uppercase',
    fontFamily: 'poppins-light',
    fontSize: '1rem',
  },
  features: {
    padding: '0',
    listStyle: 'none',
  },
  feature: {
    position: 'relative',
    overflow: 'auto',
    marginBottom: '8px',
    padding: '6px',
  },
  icon: {
    width: '16px',
    height: '16px',
    display: 'block',
    marginRight: '10px',
    float: 'left',
  },
  featureDesc: {
    float: 'left',
    fontFamily: 'poppins-regular',
    margin: '0',
    width: 'calc(100% - 26px)',
  },
  buttonWrapper: {
    display: 'flex',
    flexGrow: '8',
    alignItems: 'flex-end'
  },
  contactFooter: {
    textAlign: 'center',
    margin: '2rem'
  }
})

export default pricing
