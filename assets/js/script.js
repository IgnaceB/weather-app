const apiKey="f8353102e9a1f92a8cea887213238ec0"
const searchBarCity=document.getElementById("city")
const selectCountry=document.getElementById("country")
const selectState=document.getElementById("state")
const submit=document.getElementById("submit")
let actualData=[]
let weatherData=[]
let allPrevision=[]
let date=new Date()

const chooseCountry=(event)=>{
	if (event.key=="Enter"){
		selectCountry.replaceChildren()
		let actualCity=searchBarCity.value
		fetch("http://api.openweathermap.org/geo/1.0/direct?q="+actualCity+"&limit=5&appid="+apiKey)
		.then(response=> response.json())
		.then(data=>{
			actualData=data
			for (let i=0;i<data.length;i++){


				let alreadyExist=0
				let alreadyExistingcountry=document.querySelectorAll("option")
				alreadyExistingcountry.forEach(element=>{
					if (element.value==data[i].country){
						alreadyExist=1

					}
					else {}
				})
				if (alreadyExist==1){
				}
				else {
					const createCountryOption=document.createElement("option")
					fetch ("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json")
					.then(response=> response.json())
					.then(data2=>{

						data2.forEach(element=>{

							if (element.Code==data[i].country){
								createCountryOption.innerText=element.Name
							}
						})
					})
					createCountryOption.value=data[i].country

					selectCountry.appendChild(createCountryOption)
				}
			}
		})
		const createCountryOption=document.createElement("option")
		createCountryOption.value=""
		selectCountry.insertBefore(createCountryOption,selectCountry.firstElementChild)}
	}


	const chooseState=(event)=>{
		selectState.replaceChildren()
		if (selectCountry.value=="CA"){
			selectState.style.display="initial"
			let actualCity=searchBarCity.value

			for (let i=0;i<actualData.length;i++){
				if (actualData[i].country=="CA" ){
					const createStateOption=document.createElement("option")
					createStateOption.value=actualData[i].state
					createStateOption.innerText=actualData[i].state
					selectState.appendChild(createStateOption)
				}
			}
		}

		else if (selectCountry.value=="US"){

			selectState.style.display="initial"
			let actualCity=searchBarCity.value

			for (let i=0;i<actualData.length;i++){
				if (actualData[i].country=="US"){
					const createStateOption=document.createElement("option")
					createStateOption.value=actualData[i].state
					createStateOption.innerText=actualData[i].state
					selectState.appendChild(createStateOption)
				}
			}

		}
		else {
			selectState.style.display='none'
		}

	}

	const selectPreviousHour=(event)=>{
		let parent= event.target.parentElement
		let children=parent.children
		console.log(children)

		for (let i=0;i<children.length;i++)
			if (children[i].checkVisibility()){
				if (children[i].id!="" && children[i].previousSibling.id!="" ){
				children[i].previousSibling.style.display='initial'
				children[i].style.display="none"
			}
			}
		}

	const selectNextHour=(event)=>{
		let parent= event.target.parentElement
		let children=parent.children
		console.log(children)

		for (let i=0;i<children.length;i++)
			if (children[i].checkVisibility()){
				if (children[i].id!="" && children[i].nextSibling.id!="" ){
					console.log(children[i])
				children[i].nextSibling.style.display='initial'
				children[i].style.display="none"
				i=children.length
			}
			}
		}
	

	const getWeatherInformations=(event)=>{
		if (selectCountry.value==""){
			alert("please choose a country")
			return
		}
		let longitude=0
		let latitude=0

		console.log(actualData)
		let actualCity=searchBarCity.value
		let actualCountry=selectCountry.value
		let actualState=selectState.value
		/*for (let i=0;i<actualData.length;i++){
			if(actualData[i].name==actualCity){
				if(actualData[i].country==actualCountry)
					if (actualData[i].state==actualState || actualState==""){
						longitude=actualData[i].lon
						latitude=actualData[i].lat					}

				} 
			}*/
		fetch ("https://api.openweathermap.org/data/2.5/forecast?q="+actualCity+","+actualState+","+actualCountry+"&appid="+apiKey+"&units=metric")
		.then(response=> response.json())
		.then(data=>{

			weatherData=data
			console.log(weatherData.list.length)
			let day=1
			let hour=8-((Math.ceil((21-date.getHours())/3)))
			let initHour=hour
			let container=document.getElementById(`displayDay${day}`)

			const createDivSwitchLeft=document.createElement("div")
				createDivSwitchLeft.className="divSwitchLeft"
				container.appendChild(createDivSwitchLeft)
				createDivSwitchLeft.addEventListener("click",selectPreviousHour)


			for (let i=0; i<weatherData.list.length;i++){
				let weatherDay={
					date : weatherData.list[i].dt_txt,
					sunrise : weatherData.city.sunrise,
					sunset : weatherData.city.sunset,
					temperature : weatherData.list[i].main.temp,
					humidity : weatherData.list[i].main.humidity,
					weather : weatherData.list[i].weather[0].main,
					weatherDescription: weatherData.list[i].weather[0].description,
					weatherIcon: weatherData.list[i].weather[0].icon,
					wind: weatherData.list[i].wind.speed,

				}
				allPrevision.push(weatherDay)

				
				
			container=document.getElementById(`displayDay${day}`)
			const createDiv=document.createElement("div")
			createDiv.id=`day${day}/hour${hour}`

			const createPDate=document.createElement("p")
			createPDate.innerText= weatherDay.date
			createDiv.appendChild(createPDate)

			const createPSunrise=document.createElement("p")
			createPSunrise.innerText= weatherDay.sunrise
			createDiv.appendChild(createPSunrise)

			const createPSunset=document.createElement("p")
			createPSunset.innerText= weatherDay.sunset
			createDiv.appendChild(createPSunset)

			const createPTemperature=document.createElement("p")
			createPTemperature.innerText= weatherDay.temperature
			createDiv.appendChild(createPTemperature)

			const createPHumidity=document.createElement("p")
			createPHumidity.innerText= weatherDay.humidity
			createDiv.appendChild(createPHumidity)

			const createPWeather=document.createElement("p")
			createPWeather.innerText= weatherDay.weather
			createDiv.appendChild(createPWeather)

			const createPWeatherDescription=document.createElement("p")
			createPWeatherDescription.innerText= weatherDay.weatherDescription
			createDiv.appendChild(createPWeatherDescription)

			const createPIcon=document.createElement("p")
			createPIcon.innerText= weatherDay.weatherIcon
			createDiv.appendChild(createPIcon)

			const createPWind=document.createElement("p")
			createPWind.innerText= weatherDay.wind
			createDiv.appendChild(createPWind)

		
			container.appendChild(createDiv)

			if (hour==initHour){
				createDiv.style.display="initial"
			}
			else {
				createDiv.style.display="none"
			}

		
			if (hour==1){
				const createDivSwitchLeft=document.createElement("div")
				createDivSwitchLeft.className="divSwitchLeft"
				container.insertBefore(createDivSwitchLeft,createDiv)
				createDivSwitchLeft.addEventListener("click",selectPreviousHour)
				hour++
			}
			else if (hour<8){
				hour++
			}
			else {
				const createDivSwitchRight=document.createElement("div")
				createDivSwitchRight.className="divSwitchRight"
				container.appendChild(createDivSwitchRight)
				createDivSwitchRight.addEventListener("click",selectNextHour)
				day++
				hour=1
			}
			}

		})

	}



	selectCountry.addEventListener("change",chooseState)
	searchBarCity.addEventListener("keyup",chooseCountry)
	submit.addEventListener("click",getWeatherInformations)