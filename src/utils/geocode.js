const request = require('request')

const geocode = (address, callback) => {
    const url = `${process.env.MAPBOX_URL_BASE}${encodeURIComponent(address)}.json?language=es&types=place&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`

    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            const error = {
                message: err.message,
                context: {
                    response: JSON.stringify(body),
                    request: {
                        address,
                        url
                    }
                }
            }
            console.log('Error on geolocalization service request!')
            callback(error, undefined)
        } else if (body.features.lenght == 0) {
            callback('Unable to retrieve location. Try another search', undefined)
        } else {
            const principalResult = body.features.filter(feature => {
                return feature.relevance === 1
            })

            try {
                const [lng, lat] = principalResult[0].center
                const location = principalResult[0].place_name

                callback(undefined, { lat, lng, location })
            } catch (err) {
                const error = {
                    message: err.message,
                    context: {
                        response: JSON.stringify(body),
                        request: {
                            address,
                            url
                        }
                    }
                }
                console.error('Cannot get results for given coordinates')
                callback(error, undefined)
            }
        }
    })
}

module.exports = geocode
