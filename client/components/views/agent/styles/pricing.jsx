import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../../styles/cssFunc'
import Colors from '../../../../styles/colors'

const pricing = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  planList: {
    margin: '40px auto',
    display: 'flex',
    flexWrap: 'wrap',
    [scrSize.desktop]: {
      width: '70%',
    },
    [scrSize.smartphoneLandscape]: {
      width: '100%',
    },
    [scrSize.tablet]: {
      width: '100%',
    },
    [scrSize.smartphone]: {
      width: '100%',
    }
  },
  plan: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: 'calc(33.3333% - 1rem)',
    // minHeight: '520px',
    margin: '0rem 0.6rem',
    flex: '1',
    flexWrap: 'wrap',
    fontFamily: 'poppins-semibold',
    borderRadius: '4px',
    border: '1px solid #e5e5e5',
    boxShadow: '1px 1px 2px #5e5e5e',
    padding: '1rem 2.6rem 2rem 2.6rem',
    [scrSize.desktop]: {
      margin: '0rem 0.6rem',
      minHeight: '520px',
    },
    [scrSize.smartphone]: {
      margin: '1rem 2rem',
      minHeight: '320px',
    }
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
