const apiKey="f8353102e9a1f92a8cea887213238ec0"
const searchBarCity=document.getElementById("city")
const selectCountry=document.getElementById("country")
const selectState=document.getElementById("state")
const submit=document.getElementById("submit")
const displayData=document.getElementById("display")
let actualData=[]
let weatherData=[]


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
		for (let i=0;i<actualData.length;i++){
			if(actualData[i].name==actualCity){
				if(actualData[i].country==actualCountry)
					if (actualData[i].state==actualState || actualState==""){
						longitude=actualData[i].lon
						latitude=actualData[i].lat					}

				} 
			}
			fetch ("https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longitude+"&appid="+apiKey)
			.then(response=> response.json())
			.then(data=>{

				weatherData=data
				console.log(weatherData.list.length)
				weatherData.list.forEach(element=>{
					const createP=document.createElement("p")
					displayData.innerText=element
					displayData.appendChild(createP)
				})
				
			})

		}


		selectCountry.addEventListener("change",chooseState)
		searchBarCity.addEventListener("keyup",chooseCountry)
		submit.addEventListener("click",getWeatherInformations)