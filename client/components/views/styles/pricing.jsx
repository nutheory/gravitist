import { StyleSheet, css } from 'aphrodite'
import { screenSize } from '../../../styles/cssFunc'

const pricing = StyleSheet.create({
  container: {
    marginTop: '60px',
    width: '920px',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    overflow: 'auto',
    minHeight: 0,
  },
  tomb: {
    flex:1,
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: '4px',
    margin: '20px 10px',
    border: '1px solid #333',
    padding: '20px 20px',
    overflow: 'auto',
  },
  planTitle: {
    flex: '1 1 100%',
    fontSize: '1em',
    textAlign: 'center',
  },
  planPrice: {
    flex: '1 1 100%',
    fontSize: '1.6em',
    textAlign: 'center',
  },
  listItemUL: {
    flex: '1 1 100%',
  },
  planCallToAction: {
    flex: '1 1 100%',
    alignSelf: 'flex-end',
    textAlign: 'center',
  }
})

export default pricing
