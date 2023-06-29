const apiKey="f8353102e9a1f92a8cea887213238ec0"
const apiKeyUnsplash="q40pIj613wOdwKiKuvDC6JauZkH97SAjAe1ZnC3k-Ag"
const navBar=document.getElementById("research")
const reset=document.getElementById("reset")
const searchBarCity=document.getElementById("city")
const selectCountry=document.getElementById("country")
selectCountry.style.display="none"
const selectState=document.getElementById("state")
const submit=document.getElementById("submit")
let actualData=[]
let weatherData=[]
let allPrevision=[]
let date=new Date()


// function to retrieve Day
const wichDay=(myDay)=>{
	console.log("wichDay")
	switch(myDay){
	case(1):
		return "monday"
		break
	case(2):
		return "Thuesday"
		break
	case(3):
		return "Wednesday"
		break
	case(4):
		console.log("thursday")
		return "Thursday"
		break
	case(5):
		return "Friday"
		break
	case(6):
		return "Saturday"
		break
	case(0):
		return "Sunday"
		break
	}
}

//function to retrieve month 
const wichMonth=(myMonth)=>{
	let month=myMonth-1

	return month.toLocaleString('en-US', { month: 'long' });
}



const chooseCountry=(event)=>{
	/*if (event.key=="Enter"){*/
	selectCountry.style.display="initial"
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
		}})
		/*})*/
	const createCountryOption=document.createElement("option")
	createCountryOption.value=""
	createCountryOption.innerText="select a country"
	selectCountry.insertBefore(createCountryOption,selectCountry.firstElementChild)}
	


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
		let parent= event.target.parentElement.parentElement
		let children=parent.children
		console.log(children)

		for (let i=0;i<children.length;i++)
			if (children[i].checkVisibility()){
				if (children[i].id!="" && children[i].previousSibling.id!="" ){
					children[i].previousSibling.style.display='flex'
					children[i].style.display="none"
				}
			}
		}

		const selectNextHour=(event)=>{
			let parent= event.target.parentElement.parentElement
			let children=parent.children
			console.log(children)

			for (let i=0;i<children.length;i++)
				if (children[i].checkVisibility()){
					if (children[i].id!="" && children[i].nextSibling.id!="" ){
						console.log(children[i])
						children[i].nextSibling.style.display='flex'
						children[i].style.display="none"
						i=children.length
					}
				}
			}


			const getWeatherInformations=(event)=>{
				console.log(event)
				if (event.key=='Enter'|| event.type=='click'){
					if (selectCountry.value==""){
						alert("please choose a country")
						chooseCountry()
						return
					}


					navBar.style.display="none"
					reset.style.display="flex"
					document.body.style.backgroundImage=`none`
					document.getElementById("displayCity").innerText=searchBarCity.value


					let allDisplays=document.querySelector("section").children

					for (let i=0;i<allDisplays.length;i++){
						allDisplays[i].replaceChildren()
					}

					let actualCity=searchBarCity.value
					let actualCountry=selectCountry.value
					let actualState=selectState.value

					fetch ("https://api.openweathermap.org/data/2.5/forecast?q="+actualCity+","+actualState+","+actualCountry+"&appid="+apiKey+"&units=metric")
					.then(response=> response.json())
					.then(data=>{

						weatherData=data
						console.log(weatherData.list.length)
						let actualDate= new Date (data.list[0].dt_txt)
						let day=1
						console.log(actualDate.getHours())
						let hour=1+(actualDate.getHours()/3)

						let initHour=hour
						let container=document.getElementById(`displayDay${day}`)

						const createDivSwitchLeft=document.createElement("div")
						createDivSwitchLeft.className="divSwitchLeft"
						let newImg=document.createElement("img")
						newImg.src=`assets/img/right1.svg`
						createDivSwitchLeft.appendChild(newImg)
						container.appendChild(createDivSwitchLeft)
						newImg.addEventListener("click",selectPreviousHour)


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

							const createPDay=document.createElement("p")
							const createPDate=document.createElement("p")
							const createPHour=document.createElement("p")
							let dateOfPrevision=new Date(weatherDay.date)
							createPDay.innerText= wichDay(dateOfPrevision.getDay())
							createPDate.innerText=dateOfPrevision.getDate()+" "+ dateOfPrevision.toLocaleString('en-US', { month: 'long' })+" "+dateOfPrevision.getFullYear()
							createPHour.innerText=dateOfPrevision.getHours()+":00"

							createPDay.className="day"
							createPDate.className="date"
							createPHour.className="hours"

							createDiv.appendChild(createPDay)
							createDiv.appendChild(createPDate)
							createDiv.appendChild(createPHour)

							const figure=document.createElement("figure")
							const createPIcon=document.createElement("img")
							const createCaption=document.createElement("figcaption")
							createPIcon.src= "https://openweathermap.org/img/wn/"+weatherDay.weatherIcon+"@2x.png"
							createCaption.innerText=weatherDay.weather
							figure.appendChild(createPIcon)
							figure.appendChild(createCaption)
							createDiv.appendChild(figure)


/*						const createPSunrise=document.createElement("p")
						let sunrise= new Date(weatherDay.sunrise*1000)
						createPSunrise.innerText= sunrise.toString()
						createDiv.appendChild(createPSunrise)

						const createPSunset=document.createElement("p")
						let sunset=new Date(weatherDay.sunset*1000)
						createPSunset.innerText= sunset.toString()
						createDiv.appendChild(createPSunset)*/

							const createPWeatherDescription=document.createElement("p")
							createPWeatherDescription.innerText= "Expected weather : "+weatherDay.weatherDescription
							createPWeatherDescription.className="description"
							createDiv.appendChild(createPWeatherDescription)

							const createPTemperature=document.createElement("p")
							createPTemperature.innerText= " "+ weatherDay.temperature+" °C"
							createPTemperature.className="temperature"
							createDiv.appendChild(createPTemperature)

							const createPHumidity=document.createElement("p")
							createPHumidity.innerText= " "+weatherDay.humidity+" %"
							createPHumidity.className="humidity"
							createDiv.appendChild(createPHumidity)

					/*	const createPWeather=document.createElement("p")
						createPWeather.innerText= weatherDay.weather
						createDiv.appendChild(createPWeather)*/



							const createPWind=document.createElement("p")
							createPWind.innerText= " "+weatherDay.wind+" m/s"
							createPWind.className="wind"
							createDiv.appendChild(createPWind)

							createDiv.className="hour"
							container.appendChild(createDiv)
							container.style.display="flex"

							if (hour==initHour){
								createDiv.style.display="flex"
							}
							else {
								createDiv.style.display="none"
							}


							if (hour==1){
								const createDivSwitchLeft=document.createElement("div")
								createDivSwitchLeft.className="divSwitchLeft"
								let newImg=document.createElement("img")
								newImg.src=`assets/img/right1.svg`
								createDivSwitchLeft.appendChild(newImg)
								container.insertBefore(createDivSwitchLeft,createDiv)
								newImg.addEventListener("click",selectPreviousHour)
								hour++
							}
							else if (hour<8){
								hour++
							}
							else {
								const createDivSwitchRight=document.createElement("div")
								createDivSwitchRight.className="divSwitchRight"

								let newImg=document.createElement("img")
								newImg.src=`assets/img/right1.svg`
								createDivSwitchRight.appendChild(newImg)
								container.appendChild(createDivSwitchRight)
								newImg.addEventListener("click",selectNextHour)
								day++
								hour=1
							}
						}

					})

}}

resetNavBar=(event)=>{
	navBar.style.display='flex'
	reset.style.display='none'
	searchBarCity.value=""
	selectCountry.replaceChildren()
	selectCountry.style.display="none"
	selectState.replaceChildren()
	selectState.style.display="none"
	let allDisplays=document.querySelector("section").children
	document.body.style.backgroundImage=`url("./assets/img/background.png")`

	for (let i=0;i<allDisplays.length;i++){
		allDisplays[i].replaceChildren()
	}

}


selectCountry.addEventListener("change",chooseState)
document.body.addEventListener("keyup",getWeatherInformations)
submit.addEventListener("click",getWeatherInformations)
reset.addEventListener("click",resetNavBar)