const express = require('express')
const router = express.Router()
const { update } = require('../services/users')
const axios = require('axios')

router.get('/signup-pilot', async (req, res, next) => {
  axios.post('https://connect.stripe.com/oauth/token', {
    client_secret: process.env[`STRIPE${process.env.NODE_ENV === 'development' ? '_DEV' : ''}_SECRET_KEY`],
    code: req.query.code,
    grant_type: 'authorization_code'
  }).then(async (response) => {
    const upadated = await update({ id: req.query.state, user: { accountId: response.data.stripe_user_id, refreshToken: true }})
    res.redirect('/dashboard')
  })
  .catch(err => {
    // invalid_grant
    console.log(err)
  })
})

module.exports = router
