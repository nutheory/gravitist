import { StyleSheet } from 'aphrodite'

const draw = {
  '50%': {
    strokeDashoffset: '0',
    transform: 'scale(0.5)'
  }
}

const loader = StyleSheet.create({
  loaderContainer: {
    position: 'relative',
    margin: '120px auto',
    width: '150px'
  },
  loader: {
    position: 'absolute',
    opacity: '0.7'
  },
  loader : {
    ':circle': {
      animationName: [draw],
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      transitionTimingFunction: 'ease-in-out',
      transformOrigin: 'center',
      transform: 'rotate(-90deg)'
    }
  },
  loader2: {
    ':circle': {
      animationDelay: '1s'
    }
  },
  loader3: {
    left: '-150px',
    transform: 'rotateY(180deg)'
  }
})

export default loader

// .loader-2 circle,
// .loader-6 circle {
//   animation-delay: 1s;
// }
//
// .loader-7 circle {
//   animation-delay: 2s;
// }
//
// .loader-4 circle,
// .loader-8 circle {
//   animation-delay: 3s;
// }
//
// .loader-3 {
//   left: -150px;
//   transform: rotateY(180deg);
// }
//
// .loader-6,
// .loader-7,
// .loader-8 {
//   left: -150px;
//   transform: rotateX(180deg) rotateY(180deg);
// }
//
// .loader-5 circle {
//   opacity: .2;
// }
