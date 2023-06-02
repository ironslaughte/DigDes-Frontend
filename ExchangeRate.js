var requestCB = new XMLHttpRequest();
var responseInfo = document.querySelector('.exchange-rate');
var exchangeRate; 
document.getElementById('getCurrExchangeRate').addEventListener('click', asyncRequest);

function handlerStateChange() {
    var status = requestCB.status;				
    if (status == 200) {
        exchangeRate = JSON.parse(requestCB.responseText);
        let usd = setValueExchangeRate('USD');
        let eur = setValueExchangeRate('EUR');
        responseInfo.innerHTML += '<p>Текущий курс доллара на сегодняшний день: <b>' + usd + '</b> рублей</p>'
        responseInfo.innerHTML += '<p>Текущий курс евро на сегодняшний день: <b>' + eur + '</b> рублей</p>'
    } else {
        responseInfo.innerHTML += '<div><b>'+ requestCB.statusText + '</b></div>'
    }
}

function setValueExchangeRate(currencyName){
    return new Intl.NumberFormat('ru', {maximumFractionDigits: 2}).format(exchangeRate.Valute[currencyName].Value);
}

function asyncRequest(){
    requestCB.onload = handlerStateChange;		
    responseInfo.innerHTML	= '<div></div>';	
    requestCB.onreadystatechange = null;	
    requestCB.open('GET', 'https://www.cbr-xml-daily.ru/daily_json.js', true);
    requestCB.send();	 
}