// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { css } from 'aphrodite'
import Avatar from '../assets/avatar'
import cE from '../../styles/common_elements'
import bdg from './styles/badge'

const UserBadge = (props: Object) => {
  return (
    <div>
      { props.align === "right" ?
      <div className={`${css(cE.areaBase)} ${css(cE[props.flavor + 'Obj'])}`}>
        <div className={`columns`}>
          <div className={`column ${css(bdg.agent)} ${css(bdg.removeRightPadding)}`}>
            <div className={`${css(bdg.smallUppercaseRight)}`}>{ props.user.type }</div>
            <div className={`${css(bdg.rightText)}`}>
              {props.link ?
                <Link to={`/admin/profile/${props.user.id}`}>{ props.user.name }</Link>
              : props.user.name }
            </div>
          </div>
          <div className={`${css(bdg.avatar)} column is-narrow`}>
            <Avatar
              src={ props.user.avatar ? props.user.avatar.url : null }
              size={`medium`} />
          </div>
        </div>
      </div>
      :
        <div className={`${css(cE.areaBase)} ${css(cE[props.flavor + 'Obj'])}`}>
          <div className={`columns`}>
            <div className={`${css(bdg.avatar)} column is-narrow`}>
              <Avatar
                src={ props.user.avatar ? props.user.avatar.url : null }
                size={`medium`} />
            </div>
            <div className={`column ${css(bdg.agent)} ${css(bdg.removeLeftPadding)}`}>
              <div className={`${css(bdg.smallUppercase)}`}>{ props.user.type }</div>
              <div className={`${css(bdg.nameText)}`}>
                {props.link ?
                  <Link to={`/admin/profile/${props.user.id}`}>{ props.user.name }</Link>
                : props.user.name }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default UserBadge
