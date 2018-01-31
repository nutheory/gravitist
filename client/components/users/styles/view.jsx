import { StyleSheet } from 'aphrodite'
import { ss, c, b } from '../../../styles/helpers'

const viewEdit = StyleSheet.create({
  addFlex: {
    display: 'flex',
  },
  titleTopPadding: {
    alignSelf: 'flex-end'
  },
  currentAvatarWrapper: {
    borderRadius: '16px',
    width: '100%',
    marginBottom: '1rem'
  },
  avatarListWrapper: {
    margin: '1.4rem 0'
  },
  toggles: {
    display: 'flex'
  },
  toggle: {
    display: 'flex',
    flex: '1',
  },
  toggleBlue: {
    color: c.bFgBlue
  },
  toggleGreen: {
    color: '#74c947'
  },
  toggleIcon: {
    flex: '1',
    transition: 'color 1s ease',
    alignSelf: 'flex-end',
    marginRight: '1rem',
    textAlign: 'right',
    color: '#e5e5e5'
  },
  toggleSwitch: {
    flex: '0',
  },
  avatarWrapper: {

  },
  connections: {
    position: 'relative',
    display: 'flex',
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgBlue}`,
    borderRadius: b.radius,
    background: c.bBgBlue,
    color: c.bTextBlue
  },
  connectionIcon: {
    marginLeft: '0.8rem',
    height: '40px',
    width: '200px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  connectionIconInner: {
    height: '26px',
    width: '120px',
  },
  apiInfo: {
    flex: '1'
  },
  apiIdName: {
    fontSize: '0.8rem'
  },
  apiId: {
    fontSize: '1.4rem',
    lineHeight: '1.4rem',
    fontWeight: '600'
  },
  changePassword: {
    position: 'relative',
    display: 'flex',
    padding: '0.6rem 1rem',
    border: `1px solid ${c.bFgYellow}`,
    borderRadius: b.radius,
    background: c.bBgYellow,
    color: c.bTextYellow
  },
  fieldModify: {
    marginBottom: '2rem'
  }
})

export default viewEdit
