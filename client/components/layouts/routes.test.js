import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { StyleSheetTestUtils } from 'aphrodite'
import { Routes } from './routes'
import Index from '../index/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection()
})
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection()
})

test('testing Index route', () => {
  const component = mount(
    <MemoryRouter initialEntries={[ '/' ]} initialIndex={0}>
      <MuiThemeProvider>
        <Routes user={null} />
      </MuiThemeProvider>
    </MemoryRouter>
  )

  expect(component.find('Index').length).toBe(1)
})

test('testing Pricing route', () => {
  const component = mount(
    <MemoryRouter initialEntries={[ '/pricing' ]} initialIndex={0}>
      <MuiThemeProvider>
        <Routes user={null} />
      </MuiThemeProvider>
    </MemoryRouter>
  )

  expect(component.find('Index').length).toBe(1)
})
