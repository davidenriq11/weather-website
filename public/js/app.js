
window.addEventListener('load', () => {
    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
    const forecastMessage = document.querySelector('.forecast')
    const errorMessage = document.querySelector('.error')


    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault()

        errorMessage.textContent = ''
        forecastMessage.textContent = ''
        const address = search.value

        fetch(`/weather?address=${address}`)
            .then(res => res.json())
            .then(json => {
                if (json.forecast) {
                    forecastMessage.textContent = `${json.location}: ${json.forecast}.`
                } else {
                    errorMessage.textContent = 'Can not find forecast for given location. Try another search.'
                }
            })
            .catch(err => console.log('Error on forecast fetching'))
    })
})
