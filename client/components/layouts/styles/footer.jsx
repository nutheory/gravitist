import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from '../../../styles/helpers'

const footer = StyleSheet.create({
  container: {
    display: 'flex',
    borderTop: `1px solid ${colors.lightGrey}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [scrSize.small]: {
      width: '100%',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    [scrSize.large]: {
      width: '100%',
    },
  },
  innerContainer: {
    display: 'flex',
    margin: '3rem auto 0rem auto',
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [scrSize.medium]: {
      width: '90%',
    },
    [scrSize.large]: {
      width: '90%',
    }
  },
  sectionTitle: {
    fontFamily: 'poppins-bold',
    fontSize: '1.25rem',
    [scrSize.small]: {
      textAlign: 'center'
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
    color: colors.blue,
    textDecoration: 'none',
  },
  phone: {
    display: 'flex',
    marginTop: '2.2rem',
    justifyContent: 'center',
  },
  phoneLink: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.375rem',
    display: 'inline-block',
    marginRight: '10px',
    marginTop: 'auto',
    color: colors.black,
    textDecoration: 'none',
    [scrSize.small]: {
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
    [scrSize.small]: {
      margin: '0rem auto 1rem auto',
    },
    [scrSize.medium]: {
      margin: '2rem 0 1rem 0',
    }
  },
  copyright: {
    lineHeight: '2rem',
    [scrSize.small]: {
      padding: '1rem 2rem',
      textAlign: 'center'
    }
  },
  termsPolicyLinks: {
    [scrSize.small]: {
      textAlign: 'center',
    },
  },
  termsPolicy: {
    display: 'inline-block',
    color: colors.blue,
    textDecoration: 'none',
    marginRight: '1rem',
    ':last-child': {
      marginRight: '0',
    },
  },
  location: {
    margin: '0 1rem 2rem 1rem',
    [scrSize.small]: {
      textAlign: 'center',
    },
    [scrSize.large]: {
      flex: '1',
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
    [scrSize.small]: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column'
    },
    [scrSize.medium]: {
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
    [scrSize.small]: {
      textAlign: 'center'
    }
  },
  qLink:{
    color: colors.black,
    textDecoration: 'none',
  },
  faqLink: {
    marginBottom: '1.8rem',
    [scrSize.small]: {
      textAlign: 'center'
    }
  }
})

export default footer
