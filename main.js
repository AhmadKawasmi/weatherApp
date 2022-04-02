const input = document.getElementById('srhInput')
const btn = document.getElementById('submit')
const body = document.querySelector('body')
const weatherContainer = document.querySelector('.weatherContainer')

const getWeather = async function(city) {
    try {
          const url = `https://rami-weather.herokuapp.com/weather/`
          const weather = await $.get(`${url} + ${city}`)
          console.log(weather);
          return weather

    } catch (error) {
        return error;
    }
  
}

const addToFav = function (city) {
    localStorage.setItem('favCity' ,city)
}

const removeFav = function (city) {
    localStorage.removeItem('favCity',city)
}


const renderWeather = function (weather,city) {
    const cityContainer = document.createElement('div')
        cityContainer.classList.add('cityContainer')
    const header = document.createElement('div')
        header.classList.add('cityContainerHeader')
    const favBtn = document.createElement('button')
        favBtn.classList.add('favBtn')
        favBtn.innerHTML = '&#9734;'
    favBtn.addEventListener('click', function(){
              addToFav(weather.name)
              favBtn.innerHTML = '&#9733;'
              favBtn.style.color = "yellow"
              header.style.gridTemplateColumns = '3fr 1fr 1fr'
        const removeFromFavBtn = document.createElement('span')
                    removeFromFavBtn.classList.add('rmvBtn')
                    removeFromFavBtn.innerHTML = '&#10008;'
             header.append(removeFromFavBtn)
        removeFromFavBtn.addEventListener('click',function () {
            removeFav()
            header.style.gridTemplateColumns = '2fr 1fr'
            removeFromFavBtn.style.display = 'none'
            favBtn.style.color = 'black'
            favBtn.innerHTML = '&#9734;'
        } )
    })    

    const weatherInfo = document.createElement('div')
        weatherInfo.classList.add('weatherInfo')
    const condition = document.createElement('h2')
        condition.innerText = weather.condition
    const cityName = document.createElement('h1')   
        cityName.innerText = weather.name
    const conditionPic = document.createElement('img')
        conditionPic.src = 'https://rami-weather.herokuapp.com/' + weather.conditionPic
        conditionPic.classList.add('conditionPic')
    const weatherTemp = document.createElement('h1')    
        weatherTemp.innerText = weather.temprature
    weatherContainer.prepend(cityContainer)
    cityContainer.append(header,conditionPic,weatherInfo)
    header.append(cityName,favBtn)
    weatherInfo.append(weatherTemp,condition)
}

const getFavCity = async function () {
    const city = localStorage.getItem("favCity")
    if(city){
        const weather = await getWeather(city)
        renderWeather(city)
    }
}

btn.addEventListener('click', async function() {
    if (input.value == "") {
        alert('please choose a city')
    }else{
        const city = input.value
        const weather = await getWeather(city)
        input.value = ''
        renderWeather(weather)
    }
})
