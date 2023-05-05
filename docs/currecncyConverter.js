const baseInput = document.getElementById("base-currency")
const newC = document.getElementById("target-currency")
const amount = document.getElementById("amount")
const conversionValue = document.getElementById("converted-amount")
const historyElement  = document.getElementById("historical-rates-container")
const historyBtn  = document.getElementById("historical-rates")
const favDiv = document.getElementById("favorite-currency-pairs")
const favBtn =  document.getElementById("save-favorite")
const favCBtn = document.getElementById("favPair")
const favC = document.getElementById("fav-list-item")

function converter() {
  let baseC = baseInput.value
  let convertTo = newC.value
  let inputAmount = amount.value
  
  if (baseC !== "Empty" && convertTo !== "Empty")
  {var myHeaders = new Headers()
  myHeaders.append("apikey", "7XZvGa27lbkTNSSqWMgV4rMofxAifcXv")

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    }

    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${convertTo}&from=${baseC}&amount=${inputAmount}`

    fetch(url, requestOptions)        
    .then(response => response.json())
        .then(result => {
        const exchangeRate = result.result
        console.log("This is the exchange rate :" + exchangeRate)
        const convertedAmount = (exchangeRate).toFixed(2)
        let symbol

        switch (convertTo) {
          case "USD":
            symbol = "$"
            break
          case "EUR":
            symbol = "€"
            break
          case "JPY":
            symbol = "¥"
            break
          case "GBP":
            symbol = "£"
            break
          case "AUD":
            symbol = "A$"
            break
          case "CAD":
            symbol = "C$"
            break
          case "CHF":
            symbol = "CHF"
            break
          case "CNY":
            symbol = "CN¥"
            break
          case "HKD":
            symbol = "HK$"
            break
          case "NZD":
            symbol = "NZ$"
            break
          default:
            symbol = ""
            break
        }
        
        conversionValue.innerText = `${symbol}${convertedAmount}`

        return convertedAmount
    })
    .catch(error => console.log('Error:', error))}
}



function historyData(){
  let baseC = baseInput.value
  let convertTo = newC.value

  if (baseC !== "Empty" && convertTo !== "Empty")
  historyElement.innerText = "The Historical Exchange rate of the last 5 years"
  historyList= document.createElement('ul')
  historyList.classList.add("hList")
  historyElement.appendChild(historyList)

    {for (let i= 2018; i <= 2022; i++){
    let newHList

    var myHeaders = new Headers()
    myHeaders.append("apikey", "7XZvGa27lbkTNSSqWMgV4rMofxAifcXv")

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    }

    const url = `https://api.apilayer.com/exchangerates_data/${i}-01-01?symbols=${convertTo}&base=${baseC}`

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {
    const exchangeRate = (result.rates[convertTo]).toFixed(2)
    let symbol
    let symbol2


    switch (convertTo) {
      case "USD":
        symbol = "$"
        break
      case "EUR":
        symbol = "€"
        break
      case "JPY":
        symbol = "¥"
        break
      case "GBP":
        symbol = "£"
        break
      case "AUD":
        symbol = "A$"
        break
      case "CAD":
        symbol = "C$"
        break
      case "CHF":
        symbol = "CHF"
        break
      case "CNY":
        symbol = "CN¥"
        break
      case "HKD":
        symbol = "HK$"
        break
      case "NZD":
        symbol = "NZ$"
        break
      default:
        symbol = ""
        break
    }
    switch (baseC) {
      case "USD":
        symbol2 = "$"
        break
      case "EUR":
        symbol2 = "€"
        break
      case "JPY":
        symbol2 = "¥"
        break
      case "GBP":
        symbol2 = "£"
        break
      case "AUD":
        symbol2 = "A$"
        break
      case "CAD":
        symbol2 = "C$"
        break
      case "CHF":
        symbol2 = "CHF"
        break
      case "CNY":
        symbol2 = "CN¥"
        break
      case "HKD":
        symbol2 = "HK$"
        break
      case "NZD":
        symbol2 = "NZ$"
        break
      default:
        symbol2 = ""
        break
    }
    
    
    newHList = document.createElement("li")
    newHList.innerHTML = `${i}-01-01  :  1 ${symbol2}${baseC} = ${exchangeRate} ${symbol}${convertTo} <br><br>`
    historyList.appendChild(newHList)

    })
    .catch(error => console.log('Error:', error))
}}


}






function conversion() {
  converter()
}


function addFavs(){
  let baseC = baseInput.value
  let convertTo = newC.value

  if (baseC !== "Empty" && convertTo !== "Empty") 
  {const favPair = document.createElement('button')
    favPair.id = "favPair"
    favPair.innerText = `${baseC}/${convertTo}`
    favC.appendChild(favPair)
  } 
  else {
    alert("Please select two currencies.")
  }
}


function convertFavs(){ 
  const favPull = this.innerText
  let [baseC, convertTo] = favPull.split("/")
  console.log(baseC, convertTo)
  baseInput.value = baseC
  newC.value = convertTo
  converter()
}



favBtn.addEventListener('click', addFavs)
amount.addEventListener('keyup', conversion)
newC.addEventListener('change', conversion)
baseInput.addEventListener('change', conversion)
historyBtn.addEventListener("click", historyData)
favC.addEventListener('click', convertFavs)


 