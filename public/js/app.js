
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const dataMsg = document.querySelector('#data')
const errorMsg = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value
    dataMsg.textContent = ""
    errorMsg.textContent = ""
    
    // fetch is used for client-side javascript only
    fetch('/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if(data.error)
                errorMsg.textContent = data.error
            else{
                const forecast = 'Precip: ' + data.precip +
                            '<br>Humidty: ' + data.humidity +
                            '<br>Temperature: ' + data.temperature +
                            '<br>Weather description: ' + data.weather + 
                            '<br>Address: ' + data.address + 
                            '<br>Location: ' + data.location
                dataMsg.innerHTML = forecast
            }
        })
})

    
})