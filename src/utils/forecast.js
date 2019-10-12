const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `${process.env.DARKSKY_URL_BASE}${process.env.DARKYSKY_SECRET_KEY}/${lat},${lng}?units=si&lang=es`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback(err, undefined)
        } else if (body.error) {
            callback(('Unexpected response in weather service: ' + JSON.parse(body)), undefined)
        } else {
            try {
                const summary = body.currently.summary,
                    temperature = body.currently.temperature,
                    precipProbability = body.currently.precipProbability

                const forecast = "".concat(
                    `El clima está ${summary}. `,
                    `Hacen ${temperature}º grados. `,
                    `Hay una probabilidad de lluvia de ${precipProbability}`
                )

                callback(undefined, forecast)
            } catch (err) {
                callback(('Error processing response:' + err), undefined)
            }
        }
    })
}

module.exports = forecast
