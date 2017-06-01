import { StyleSheet, css } from 'aphrodite'
import { scrSize, colors } from './helpers'

const commonElements = StyleSheet.create({
  iconImg: {
    width: '64px',
    height: '64px',
  },
  callToAction: {
    width: '100%',
    height: '64px',
    color: colors.white,
    borderRadius: '32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    width:'80%',
    flexWrap: 'wrap',
  },
  cta: {
    fontFamily: 'poppins-semibold',
    borderRadius: '32px',
    width: '260px',
    height: '64px',
    margin: '20px',
    color: colors.white,
    position: 'relative',
    zIndex: '10',
    textDecoration: 'none',
    textTransform: 'uppercase',
    boxShadow: '1px 1px 2px #0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [scrSize.small]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [scrSize.medium]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
  },
  redButton: {
    backgroundColor: colors.red,
    [scrSize.small]: {
      width: '260px',
      height: '44px',
    },
    [scrSize.medium]: {
      width: '260px',
      height: '64px',
    },
  },
  blueButton: {
    backgroundColor: colors.blue,
    [scrSize.small]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [scrSize.medium]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
  },
  fourBoxArea: {
    display: 'flex',
    margin: '2rem auto 0 auto',
    justifyContent: 'space-between',
    [scrSize.small]: {
      flexWrap: 'wrap',
      width: '100%',
    },
    [scrSize.medium]: {
      flexWrap: 'wrap',
      width: '90%',
    },
    [scrSize.large]: {
      width: '90%',
      maxWidth: '1280px'
    },
  },
  fourBoxSingle: {
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    borderRadius: '4px',
    [scrSize.small]: {
      margin: '1rem 1rem',
      width: '100%',
    },
    [scrSize.medium]: {
      width: 'calc(40% - 3rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [scrSize.large]: {
      width: 'calc(25% - 6rem)',
      margin: '0 1rem 2rem 1rem',
    },
  },
  imgIconWrapper: {
    width: '64px',
    margin: '0px auto 20px auto',
  },
})

export default commonElements
