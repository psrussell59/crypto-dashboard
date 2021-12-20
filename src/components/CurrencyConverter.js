import {useState} from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'


const CurrencyConverter = () =>{
    const currencies = ['BTC', 'ETH','USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('USD')
    const [primaryAmount, setPrimaryAmount] = useState(1)
    const [result, setResult] = useState(0)
    const [exchangeData, setExchangeData] = useState({
        primaryCurrency: null,
        secondaryCurrency: null,
        exchangeRate: null
    })

    const convert = () => {
        console.log(chosenPrimaryCurrency, chosenSecondaryCurrency)
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
          }
          
          axios.request(options).then((response) => {
              setResult(response.data * primaryAmount)
              setExchangeData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data   
              })
          }).catch((error) => {
              setExchangeData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: 'Error!'   
              })
              setResult("Error!")
          })
    }

    return (
        <div className="currency-converter">
            <h2>CurrencyConverter</h2>
            <div className="converter-input">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency</td>
                            <td>
                                <input
                                    type="number" 
                                    name="currency-amount-1" 
                                    value={primaryAmount}
                                    onChange={(e) => setPrimaryAmount(e.target.value)}
                                    />
                            </td>
                            <td>
                                <select
                                    value={chosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >

                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                    
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>Secondary Currency</td>
                            <td>
                                <input
                                    name="currency-amount-2" 
                                    value={result}
                                    disabled = {true}
                                    />
                            </td>
                            <td>
                                <select
                                    value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                    
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button 
                    id="convert-button"
                    onClick={convert}>Convert</button>
            </div>
            <ExchangeRate 
                exchangeData={exchangeData} />
            <div className="app-description"><p>This Node.js/React app is a demonstration of RapidAPI integration of a crypto converter and crypto news feed</p></div>    
        </div>
    )
}
export default CurrencyConverter