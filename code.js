const input = document.querySelector("input");
const img = document.querySelectorAll("img");
getWeather("minsk");

input.addEventListener('keyup', (e)=>{
    if (e.key=="Enter") {
        getWeather(input.value)
    }
})

async function getWeather(place) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=66b3c3e1676ddd60a73d8a3160445061`;
    const res = await fetch(url);
    const data = await res.json();
    render(data);
    setDate();
}

function render(data){
    document.querySelector("body > div > div.city > div.lagos").innerHTML = data.city.name;
    document.querySelector("body > div > div.moon > div").innerHTML = data.list[0].main.temp + "C";
    document.querySelector("body > div > div.properties > div:nth-child(1) > div.gradus").innerHTML = data.list[0].main.temp + "c";
    document.querySelector("body > div > div.properties > div:nth-child(2) > div.gradus").innerHTML = data.list[0].main.humidity + "%";
    document.querySelector("body > div > div.properties > div:nth-child(3) > div.gradus").innerHTML =  data.list[0].wind.speed + "km/h";
    document.querySelector("body > div > div.aboba > div:nth-child(1) > div > div.am").innerHTML = data.list[1].dt_txt.slice(-8, -3);
    document.querySelector("body > div > div.aboba > div:nth-child(2) > div > div.am").innerHTML = data.list[2].dt_txt.slice(-8, -3);
    document.querySelector("body > div > div.aboba > div:nth-child(1) > div > div.cek").innerHTML = data.list[1].main.temp.toFixed(1) + " °C";
    document.querySelector("body > div > div.aboba > div:nth-child(2) > div > div.cek").innerHTML = data.list[2].main.temp.toFixed(1) + " °C";
    dayTime(data.list[0],data.city.sunrise,data.city.sunset,img[0]);
    dayTime(data.list[1],data.city.sunrise,data.city.sunset,img[1]);
    dayTime(data.list[2],data.city.sunrise,data.city.sunset,img[2]);
}

function setDate(){
    let date = new Date();
    document.querySelector("body > div > div.city > div.month").innerHTML = date.toLocaleDateString("en-US", {month:"long", day:"numeric", year:"numeric"});
}


function dayTime(data, sunrise, sunset, img) {
    if (data.dt> sunrise && data.dt < sunset) {
        dayPic(data.clouds.all,img)
    } else {
        nightPic(data.clouds.all,img);
        console.log('ni');
    }
}

function dayPic(clouds,img) {
    if (clouds < 30) {
        img.src = "./pictures/sun.png"
    }
    else if (clouds < 60) {
        img.src = "./pictures/sun_clouds.png"
    }
    else if (clouds <= 100) {
        img.src = "./pictures/cloud.png"
    }
}

function nightPic(clouds,img) {
    if (clouds < 40) {
        img.src = "./pictures/Moon.png"
    }
    else if (clouds <= 100) {
       img.src = "./pictures/Moon_clouds.png"
    }
}