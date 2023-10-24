var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var shortDesc = document.querySelector('.short-desc');
var visible = document.querySelector('.visible span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var time = document.querySelector('.time');
var content = document.querySelector('.content');
var bodyEL = document.querySelector('body');

async function changeWeather() {
    let contryValue = search.value.trim();
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${contryValue}&appid=d78fd1588e1b7c0c2813576ba183a667`;
    let data = await fetch(API).then(res => res.json());
    console.log(data);
    if (data) {
        content.classList.remove('hide');
        city.innerText = data.name + ', ';
        let countryName = data.sys.country;
        country.innerText = countryName;
        visible.innerText = data.visibility + ' m';
        wind.innerText = data.wind.speed + ' m/s';
        sun.innerText = data.main.humidity + ' %';
        let temp = Math.round(data.main.temp - 273.15);
        value.innerHTML = temp + `<sup>o</sup>C`;
        shortDesc.innerHTML = data.weather[0].main;

        // Lấy thông tin múi giờ của thành phố
        let cityTimeZoneOffset = data.timezone;

        // Tạo đối tượng Date cho thời gian hiện tại
        let currentTime = new Date();

        // Tính thời gian ở thành phố theo sự chênh lệch múi giờ 
        let cityCurrentTime = new Date(currentTime.getTime() + cityTimeZoneOffset * 1000);

        // Hiển thị thời gian và ngày của thành phố theo múi giờ của nó
        let cityDateTimeOptions = { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        time.innerText = cityCurrentTime.toLocaleString('vi', cityDateTimeOptions);






















        if (temp >= 30) {
            bodyEL.setAttribute('class', 'hot');
        } else if (temp < 30 && temp >= 25) {
            bodyEL.setAttribute('class', 'cool');
        } else if (temp < 25 && temp >= 16) {
            bodyEL.setAttribute('class', 'warm');
        } else if (temp < 16) {
            bodyEL.setAttribute('class', 'cold');
        }
    }
    search.blur();
}

search.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        changeWeather();
    }
});
