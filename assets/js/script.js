document.querySelector('.busca').addEventListener('click', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9d02e2fdf12914e6e92a20549d472c02&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();


        if (json.cod === 200) {
            showInfo({

                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                feels: json.main.feels_like,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg


            });

        } else {
            clearInfo();
            showWarning('Está localização não foi encontratada')
        }

    };

});

let clearInfo = () => {

    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

};

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    // document.querySelector('sensacaoInfo').innerHTML = `${json.feels}`;
    document.querySelector('.maxMinInfo').innerHTML = `${json.tempMax} / ${json.tempMin}`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
};

let showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
};