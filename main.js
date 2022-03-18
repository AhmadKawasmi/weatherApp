const input = document.getElementById('srhInput')
const btn = document.getElementById('submit')
const body = document.querySelector('body')

const getWeather = async function(city) {
    const weather = await $.git(`https://rami-weather.herokuapp.com/weather/${city}`)
    console.log(weather);
    return weather
}

btn.addEventListener('click', async function() {
    const city = input.value
    try {
        const weather = await getWeather(city)
        input.value
        const conditionPic = document.createElement('img')
        conditionPic.src = 'https://rami-weather.herokuapp.com/' + weather.conditionPic
        body.append(conditionPic)
    } catch (error) {
        console.log(error);
        alert('error')
    }
})