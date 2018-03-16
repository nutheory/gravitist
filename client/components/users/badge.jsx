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
        <div className="flex">
          <div className="flex-1">
            <div className="text-right">
              {props.link ?
                <Link to={`/admin/profile/${props.user.id}`}>{ props.user.name }</Link>
              : props.user.name }
            </div>
            <div className="text-xs uppercase text-right">{ props.user.type }</div>
          </div>
          <div className="ml-4">
            <Avatar
              src={ props.user.avatar ? props.user.avatar.url : null }
              size={`medium`} />
          </div>
        </div>
      :
        <div className="flex">
            <div className="mr-4">
              <Avatar
                src={ props.user.avatar ? props.user.avatar.url : null }
                size={`medium`} />
            </div>
            <div className="flex-1">
              <div className="">
                {props.link ?
                  <Link to={`/admin/profile/${props.user.id}`}>{ props.user.name }</Link>
                : props.user.name }
              </div>
              <div className="text-xs uppercase">{ props.user.type }</div>
            </div>

        </div>
      }
    </div>
  )
}

export default UserBadge
