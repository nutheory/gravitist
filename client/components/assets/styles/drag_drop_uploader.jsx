import { StyleSheet } from 'aphrodite'
import { ss, c} from '../../../styles/helpers'

const uploads = StyleSheet.create({
  mainDragDropWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    lineHeight: '0'
  },
  mainDragDropContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    border: '2px dashed #27708c',
    borderRadius: '6px',
    background: '#f5f5f5',
  },
  mainDragDropContainerHover: {
    border: '2px solid #23d160',
  },
  mainDragDropForm: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainDragDropInstruction: {
    padding: '1rem',
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },
  hiddenDragDropInput: {
    width: '0.1px',
    height: '0.1px',
    opacity: '0',
    overflow: 'hidden',
    position: 'absolute',
    zIndex: '-1'
  },
  clickableDragDropLabel: {
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    opacity: '0',
    zIndex: '10',
    backgroundColor: 'rgba(76, 0, 153, 0.6)'
  },
  mainDragDropHeader: {
    fontSize: '1.4rem',
    fontFamily: 'Avenir Next, Helvetica, Arial, sans-serif',
    fontWeight: '100',
    textAlign: 'center',
    lineHeight: '2rem',
    color: c.darkGrey
  },
  mainDragDropText: {
    fontSize: '0.8rem',
    textAlign: 'center',
    margin: '0 1rem',
    lineHeight: '1rem'
  },
  changeDragDropOverlay: {
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '0.4rem 1rem',
    textAlign: 'center',
    zIndex: '10',
    margin: '2px',
    borderRadius: '0 5px 0 5px',
    backgroundColor: 'rgba(32, 156, 238, 0.8)',
    color: c.white,
    zIndex: '8'
  },
  mainDragDropPreview: {
    width: '100%',
    height: '100%'
  },
  noImagePreview: {
    display: 'flex',
    background: c.mint,
    color: c.green,
    transition: 'all .4s ease-in-out',
    border: `2px solid ${c.green}`,
    borderRadius: '6px',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    opacity: '0',
    zIndex: '6'
  },
  reviewButton: {
    marginTop: '1rem'
  }
})

export default uploads
