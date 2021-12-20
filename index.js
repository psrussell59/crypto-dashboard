// import {express} from './express'
// import {cors} from './cors'
// import {axios} from './axios'

const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.json('Hi')
})

app.get('/news', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-news-live.p.rapidapi.com/news/coindesk',
        headers: {
          'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      };
      
      axios.request(options).then((response) => {
          res.json(response.data)
      }).catch((error) => {
          res.json(error)
      })
})

app.get('/convert', (req, res) => {
    const toCurrency = req.query.to_currency
    const fromCurrency = req.query.from_currency

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: fromCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency},
        headers: {
          'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
        }
      }
      
      axios.request(options).then((response) => {
          res.json(response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
      }).catch((error) => {
          res.error(error)
      })
})

app.listen(PORT, () => console.log(`Backend server is listening on port {PORT} `))