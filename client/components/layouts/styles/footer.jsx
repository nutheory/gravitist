import { StyleSheet, css } from 'aphrodite'
import { scrSize } from '../../../styles/cssFunc'
import Colors from '../../../styles/colors'

const footer = StyleSheet.create({
  container: {
    display: 'flex',
    borderTop: `1px solid ${Colors.lightGrey}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    [scrSize.desktop]: {
      width: '100%',
    }
  },
  innerContainer: {
    display: 'flex',
    margin: '3rem auto 4rem auto',
    overflow: 'hidden',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [scrSize.desktop]: {
      width: '70%',
    }
  },
  sectionTitle: {
    fontFamily: 'poppins-bold',
    fontSize: '1.25rem',
  },
  contactUs: {
    display: 'flex',
    margin: '0 1rem 2rem 1rem',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: '2',
  },
  mailLink: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.375rem',
    color: Colors.blue,
    textDecoration: 'none',
  },
  phone: {
    display: 'flex',
    marginTop: '2.2rem',
  },
  phoneLink: {
    fontFamily: 'poppins-semibold',
    fontSize: '1.375rem',
    display: 'inline-block',
    marginRight: '10px',
    marginTop: 'auto',
    color: Colors.black,
    textDecoration: 'none',
  },
  socialLinks: {

  },
  address: {
    lineHeight: '1.8rem',
  },
  socialIcon: {
    display: 'inline-block',
    height: '24px',
    marginRight: '20px',
  },
  logo: {
    width: '148px',
    height: '20px',
    margin: '2rem 0 0.2rem 0',
  },
  copyright: {
    lineHeight: '2rem'
  },
  termsPolicy: {
    display: 'inline-block',
    color: Colors.blue,
    textDecoration: 'none',
    marginRight: '1rem',
  },
  location: {
    margin: '0 1rem 2rem 1rem',
    flex: '1',
  },
  flag: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
  },
  quickLinks: {
    margin: '0 1rem 2rem 1rem',
    flex: '1',
  },
  quickLinkList: {
    listStyle: 'none',
    padding: '0',
    marginTop: '2rem',
  },
  quickLink: {
    marginBottom: '1rem',
  },
  qLink:{
    color: Colors.black,
    textDecoration: 'none',
  },
  faqLink: {
    marginBottom: '1.8rem',

  }
})

export default footer
