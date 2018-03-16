// @flow
import * as React from 'react'
import { Link, withRouter, Route } from 'react-router-dom'

const LiNavLink = ({to, exact, strict, activeClassName, className, activeStyle, style, isActive: getIsActive, ...rest }: Object) => {
  return (
    <Route
      path={typeof to === 'object' ? to.pathname : to}
      exact={exact}
      strict={strict}
      children={({ location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match)
        return (
          <li className={isActive ? [activeClassName, className].join(' ') : className}
            style={isActive ? { ...style, ...activeStyle } : style}>
            <Link
              className="no-underline"
              to={to}
              {...rest}
            />
          </li>
        )
      }}
    />
  )
}

export default LiNavLink
