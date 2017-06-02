import { StyleSheet, css } from 'aphrodite'
import { ss, c } from '../../../styles/helpers'

const footer = StyleSheet.create({
  container: {
    display: 'flex',
    borderTop: `1px solid ${c.lightGrey}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [ss.sm]: {
      width: '100%',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    [ss.md]: {
      width: '100%',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    [ss.lg]: {
      width: '100%',
    },
  },
  innerContainer: {
    display: 'flex',
    margin: '3rem auto 0rem auto',
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [ss.md]: {
      width: '90%',
    },
    [ss.lg]: {
      width: '90%',
    }
  },
  sectionTitle: {
    fontFamily: 'poppins-bold',
    fontSize: '1.25rem',
    [ss.sm]: {
      textAlign: 'center'
    },
    [ss.md]: {
      textAlign: 'center'
    },
    [ss.lg]: {
      textAlign: 'left'
    },
  },
  contactUs: {
    display: 'flex',
    margin: '0 1rem 2rem 1rem',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: '2',
  },
  mContactUs: {
    display: 'flex',
    margin: '0 1rem 2rem 1rem',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mMailLink:{
    textAlign: 'center',
  },
  mailLink: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.375rem',
    color: c.blue,
    textDecoration: 'none',
  },
  phone: {
    display: 'flex',
    marginTop: '2.2rem',
    justifyContent: 'center',
    [ss.lg]: {
      justifyContent: 'flex-start',
    },
  },
  phoneLink: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.375rem',
    display: 'inline-block',
    marginRight: '10px',
    marginTop: 'auto',
    color: c.black,
    textDecoration: 'none',
    [ss.sm]: {
      textAlign: 'center',
    },
  },
  socialLinks: {

  },
  address: {
    lineHeight: '1.8rem',
  },
  socialIconList: {
    textAlign: 'center',
  },
  socialIcon: {
    display: 'inline-block',
    height: '24px',
    marginRight: '1rem',
    ':last-child': {
      marginRight: '0',
    }
  },
  logo: {
    width: '148px',
    height: '20px',
    [ss.sm]: {
      margin: '0rem auto 1rem auto',
    },
    [ss.md]: {
      margin: '2rem auto 1rem auto',
    },
    [ss.lg]: {
      margin: '2rem 0 1rem 0',
    }
  },
  copyright: {
    lineHeight: '2rem',
    padding: '1rem 2rem',
    [ss.sm]: {
      textAlign: 'center'
    },
    [ss.md]: {
      textAlign: 'center'
    },
    [ss.lg]: {
      textAlign: 'left'
    }
  },
  termsPolicyLinks: {
    [ss.sm]: {
      textAlign: 'center',
    },
    [ss.md]: {
      textAlign: 'center',
    },
    [ss.lg]: {
      textAlign: 'left'
    }
  },
  termsPolicy: {
    display: 'inline-block',
    color: c.blue,
    textDecoration: 'none',
    marginRight: '1rem',
    ':last-child': {
      marginRight: '0',
    },
  },
  location: {
    margin: '0 1rem 2rem 1rem',
    [ss.sm]: {
      textAlign: 'center',
    },
    [ss.md]: {
      textAlign: 'center',
    },
    [ss.lg]: {
      flex: '1',
      textAlign: 'left',
    },
  },
  flag: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
  },
  quickLinks: {
    display: 'flex',
    marginTop: '2.2rem',
    justifyContent: 'center',
    margin: '0 1rem 2rem 1rem',
    [ss.sm]: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column'
    },
    [ss.md]: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column'
    },

    // flex: '1',
  },
  quickLinkList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '1rem',
    display: 'block',
  },
  quickLink: {
    marginBottom: '1rem',
    [ss.sm]: {
      textAlign: 'center'
    },
    [ss.md]: {
      textAlign: 'center'
    },
    [ss.lg]: {
      textAlign: 'left'
    }
  },
  qLink:{
    color: c.black,
    textDecoration: 'none',
  },
  faqLink: {
    marginBottom: '1.8rem',
    [ss.sm]: {
      textAlign: 'center'
    },
    [ss.md]: {
      textAlign: 'center'
    },
    [ss.lg]: {
      textAlign: 'left'
    }
  }
})

export default footer
