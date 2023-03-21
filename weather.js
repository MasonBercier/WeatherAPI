const apiKey = '0c01714764e28e72003a3be11b57dd72'

const formData = document.querySelector('#form-data')
formData.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event)

    const name = formData.name.value
    console.log(name)

    getInfo(name)
})

const getInfo = async (name) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`)
    const data = await response.json()
    const lat = data[0]['lat']
    const lon = data[0]['lon']
    const newResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    const newData = await newResponse.json()
    const castResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    const castData = await castResponse.json()
    console.log(castData)

    const weatherDiv = document.querySelector('.weather-div')
    weatherDiv.innerHTML = `
    
    <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${newData.name}</li>
            <li class="list-group-item">Temperature: ${newData['main']['feels_like']} F</li>
            <li class="list-group-item">Cloud Cover: ${newData['weather'][0]['description']}</li>
            <li class="list-group-item">Humidity: ${newData['main']['humidity']}%</li>
        </ul>
    </div>
    `
    const forcastDiv = document.querySelector('.forcast-div')
    forcastDiv.innerHTML = `
    
    
    <table class="table table-dark">
    <thead>
        <tr>
        <th scope="col">Day</th>
        <th scope="col">Temp</th>
        <th scope="col">Cloud Cover</th>
        <th scope="col">Humidity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <th scope="row">${castData['list'][0]['dt_txt']}</th>
        <td>${castData['list'][0]['main']['temp']} F</td>
        <td>${castData['list'][0]['weather'][0]['description']}</td>
        <td>${castData['list'][0]['main']['humidity']} %</td>
        </tr>
        <tr>
        <th scope="row">${castData['list'][8]['dt_txt']}</th>
        <td>${castData['list'][8]['main']['temp']} F</td>
        <td>${castData['list'][8]['weather'][0]['description']}</td>
        <td>${castData['list'][8]['main']['humidity']} %</td>
        </tr>
        <tr>
        <th scope="row">${castData['list'][16]['dt_txt']}</th>
        <td>${castData['list'][16]['main']['temp']} F</td>
        <td>${castData['list'][16]['weather'][0]['description']}</td>
        <td>${castData['list'][16]['main']['humidity']} %</td>
        </tr>
        <th scope="row">${castData['list'][24]['dt_txt']}</th>
        <td>${castData['list'][24]['main']['temp']} F</td>
        <td>${castData['list'][24]['weather'][0]['description']}</td>
        <td>${castData['list'][24]['main']['humidity']} %</td>
        </tr>
        <th scope="row">${castData['list'][32]['dt_txt']}</th>
        <td>${castData['list'][32]['main']['temp']} F</td>
        <td>${castData['list'][32]['weather'][0]['description']}</td>
        <td>${castData['list'][32]['main']['humidity']} %</td>
        </tr>
    </tbody>
    </table>
    `
}