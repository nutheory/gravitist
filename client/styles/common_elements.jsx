import { StyleSheet, css } from 'aphrodite'
import { ss, c } from './helpers'

const commonElements = StyleSheet.create({
  iconImg: {
    width: '64px',
    height: '64px',
  },
  callToAction: {
    width: '100%',
    height: '64px',
    borderRadius: '32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    display: 'flex',
    color: c.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtons: {
    width: '100%',
  },
  ctaButtonOverlay: {
    display: 'block',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '6px',
    transition: 'all .3s ease-out',
    opacity: '0',
    ':hover': {
      opacity: '1'
    }
  },
  ctaButton: {
    display: 'inline-block',
    lineHeight: '54px',
    color: '#fff',
    boxShadow: '1px 1px 2px #0a0a0a',
    fontWeight: '500',
    fontSize: '1.125em',
    border: 0,
    borderRadius: '6px',
    height: '54px',
    position: 'relative',
    textAlign: 'center',
    width: '100%'
  },
  ctaGreen: {
    backgroundImage: 'linear-gradient(-180deg,#74c947 0,#4bc459 100%)',
  },
  ctaPurple: {
    backgroundImage: 'linear-gradient(-180deg, #644985 0, #534192 100%)',
  },
  ctaRed: {
    backgroundImage: 'linear-gradient(-180deg, #e52d27 0, #b31217 100%)',
  },
  cta: {
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    borderRadius: '32px',
    width: '260px',
    height: '64px',
    margin: '20px',
    color: c.white,
    position: 'relative',
    zIndex: '10',
    textDecoration: 'none',
    textTransform: 'uppercase',
    boxShadow: '1px 1px 2px #0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [ss.sm]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
  },
  redButton: {
    color: c.white,
    backgroundColor: c.red,
    [ss.sm]: {
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      width: '260px',
      height: '64px',
    },
  },
  blueButton: {
    color: c.white,
    backgroundColor: c.blue,
    [ss.sm]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      margin: '20px 20px 20px 0',
      width: '260px',
      height: '64px',
    },
  },
  whiteButton: {
    color: c.midnightBlue,
    backgroundColor: c.white,
    [ss.sm]: {
      margin: '6px 0px',
      width: '260px',
      height: '44px',
    },
    [ss.md]: {
      margin: '20px',
      width: '260px',
      height: '64px',
    },
  },
  fourBoxArea: {
    display: 'flex',
    margin: '4rem auto 0 auto',
    justifyContent: 'space-between',
    [ss.sm]: {
      flexWrap: 'wrap',
      width: '100%',
    },
    [ss.md]: {
      flexWrap: 'wrap',
      width: '90%',
    },
    [ss.lg]: {
      width: '90%',
      maxWidth: '1280px'
    },
  },
  fiveBoxArea: {
    display: 'flex',
    margin: '4rem auto 0 auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    [ss.sm]: {
      flexWrap: 'wrap',
      width: '100%',
    },
    [ss.md]: {
      flexWrap: 'wrap',
      width: '90%',
    },
    [ss.lg]: {
      width: '90%',
      maxWidth: '1280px'
    },
  },
  fourBoxSingle: {
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    borderRadius: '4px',
    [ss.sm]: {
      margin: '1rem 1rem',
      width: '100%',
    },
    [ss.md]: {
      width: 'calc(40% - 3rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [ss.lg]: {
      width: 'calc(25% - 2rem)',
      margin: '0 1rem 2rem 1rem',
    },
  },
  twoColumnLists: {
    display: 'flex',
    width: '70%',
    margin: 'auto',
  },
  fiveBoxSingle: {
    padding: '2rem',
    background: '#fff',
    boxShadow: '1px 1px 2px #5e5e5e',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: '4px',
    [ss.sm]: {
      margin: '1rem 1rem',
      width: '100%',
    },
    [ss.md]: {
      width: 'calc(40% - 3rem)',
      margin: '0 1rem 2rem 1rem',
    },
    [ss.lg]: {
      width: 'calc(33.3333% - 6rem)',
      margin: '0 1rem 2rem 1rem',
    },
  },
  imgIconWrapper: {
    float: 'left',
  },
  scrollDown: {
    position: 'absolute',
    maxWidth: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    left: '50%',
    marginLeft: '-90px',
    [ss.sm]: {
      bottom: '20px',
    },
    [ss.md]: {
      bottom: '30px',
    },
    [ss.lg]: {
      bottom: '40px',
    },
  },
  scrollDownInner:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    opacity: '0.7',
    ':hover': {
       opacity: '1'
    }
  },
  scrollDownIcon: {
    width: '26px',
    height: '26px',
  },
  scrollDownText: {
    display: 'inline-block',
    marginTop: '10px',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#fff',
  },
  buttonWithOutline: {
    border: '1px solid #FFF !important',
    textShadow: '1px 1px 2px #0a0a0a',
    color: c.white,
    padding: '10px 14px',
    borderRadius: '.33rem',
    margin: '6px 0 0 10px',
    display: 'inline-block',
    ':visited': {
      color: c.white
    },
    ':link': {
      color: c.white
    },
    ':hover': {
      backgroundColor: 'rgba(47, 170, 193, 0.4)',
    }
  },
  gradButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4rem',
    height: '4rem',
    borderRadius: '4px',
    boxShadow: '1px 1px 2px #0a0a0a',
  },
  iconFix: {
    marginRight: 0,
    color: '#fff'
  },
  gradRed: {
    background: '#c94b4b',
    background: '-webkit-linear-gradient(to bottom, #4b134f, #c94b4b)',
    background: 'linear-gradient(to bottom, #4b134f, #c94b4b)'
  },
  gradBlue: {
    background: '#43C6AC',
    background: '-webkit-linear-gradient(to bottom, #191654, #43C6AC)',
    background: 'linear-gradient(to bottom, #191654, #43C6AC)'
  },
  gradGreen: {
    background: '#DCE35B',
    background: '-webkit-linear-gradient(to bottom, #45B649, #DCE35B)',
    background: 'linear-gradient(to bottom, #45B649, #DCE35B)'
  },
  gradOrange: {
    background: '#c21500',
    background: '-webkit-linear-gradient(to top, #ffc500, #c21500)',
    background: 'linear-gradient(to top, #ffc500, #c21500)'
  },
  gradVice: {
    background: '#3494E6',
    background: '-webkit-linear-gradient(to bottom, #EC6EAD, #3494E6)',
    background: 'linear-gradient(to bottom, #EC6EAD, #3494E6)'
  },
  gradPeach: {
    background: '#ED4264',
    background: '-webkit-linear-gradient(to bottom, #FFEDBC, #ED4264)',
    background: 'linear-gradient(to bottom, #FFEDBC, #ED4264)'
  },
  gradIntuitive: {
    background: '#da22ff',
    background: '-webkit-linear-gradient(to bottom, #da22ff, #9733ee)',
    background: 'linear-gradient(to bottom, #da22ff, #9733ee)'
  },
  gradMirage: {
    background: '#16222A',
    background: '-webkit-linear-gradient(to bottom, #3A6073, #16222A)',
    background: 'linear-gradient(to bottom, #3A6073, #16222A)'
  },
  gradStrain: {
    background: '#870000',
    background: '-webkit-linear-gradient(to bottom, #870000, #190A05)',
    background: 'linear-gradient(to bottom, #870000, #190A05)'
  },
  gradMango: {
    background: '#ffe259',
    background: '-webkit-linear-gradient(to bottom, #ffa751, #ffe259)',
    background: 'linear-gradient(to bottom, #ffa751, #ffe259)'
  },
  bulletList: {
    width: '50%',
    margin: '2rem 0'
  },
  bullet: {
    position: 'relative',
    margin: '20px 0',
  }
})

export default commonElements
