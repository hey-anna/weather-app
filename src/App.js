import { useEffect, useState } from "react";
import { WeatherBox } from "./component/WeatherBox";
import { WeatherButton } from "./component/WeatherButton";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorPage from "./component/ErrorPage";

function App() {
  // 0. 스텝바이스텝으로 머부터할지, 멀해야할지 자세히 써라
  // 1. 앱이 실행되자마자(유즈이팩트?) 현재위치기반의 날씨가 보인다.
  // 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태
  // 3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른도시(여행가고싶은 도시))
  // 4. 도시버튼을 클릭할 대 마다 도시별 날씨가 나온다.
  // 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재위치 기반으로 돌아온다.
  // 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

  // useEffect 매개변수가 2개 (첫번째함수, 두번째배열)
  // Array 안에 아무것도 안주면 componentDidMount() 처럼 발동
  // get current location javascript 구글링
  // https://www.w3schools.com/html/html5_geolocation.asp

  //   <script>
  // const x = document.getElementById("demo");

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }
  // 매개변수 포지션
  // function showPosition(position) {
  //   x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  // }
  // </script>

  // 현재위치 가져오기 **
  // 필수!! 포지션이라는 매개변수 넣어줘야 한다.
  // position!! 얘한테서 매개변수가 오는거니깐,

  const API_KEY = "127ddf035270d1edf59d13bea8010ff6";
  // const API_KEY = "invalid_key";
  const [weather, setWeather] = useState(null);
  // const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("current");
  const [error, setError] = useState("");
  const cities = ["current", "Seoul", "Paris", "New york", "London"];

  const isLoading =
    !weather ||
    !weather.main ||
    !weather.weather ||
    weather.weather.length === 0;

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // 다른 나라 날씨 가져오기 선생님 설명 S (1번) **
  // App이 city까지 다지고 있다.
  // city정보를 바꿔주려면 setCity city정보를 바꿔줘야 한다.
  // setCity 에서 스테이트를 바꿔줘야 한다.
  // setCity를 weatherButton에 보내줍니다.
  // (setCity 함수를 보내준다)
  // (함수도 props로 보내줄 수 있다)

  // WeatherButton
  // WeatherButton은 onClick을 하면 함수를 호출할 거야 어떤함수를? setCity
  // 이 setCity라는 함수를 props를 호출하면서

  // 다른 나라 날씨 가져오기 선생님 설명 E (1번) **

  // 다른 나라 날씨 가져오기 선생님 설명 S (3번 끝.) **
  // 앱이 모든걸 다가지고 있고, 필요한 함수 다가지고, App은 단지 보내주기만 한다.
  // : 버튼은 받은 함수를 이용해서 city의 값을 바꿔준다. app이 그거를 확인해 줄 수 있다.
  // ** app이 무조건 들고 있어야하구나, 자식들은 받아쓰기만해야겠구나
  // 다른 나라 날씨 가져오기 선생님 설명 E (3번 끝.) **

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 이 정보를 가져오는 순간 ! 1
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        // 이 함수를 바로 불러오는 거야 ! 2
        // 부를 때 정보를 let, lon 정보를 넘겨줄거야 !~!
        getWeatherByCurrentLocation(lat, lon);
        console.log("현재 위치", lat, lon);
      },
      (error) => {
        setError(`Location error: ${error.message}. Please try again.`);
      }
    );
  };

  // useEffect를 통해서 getCurrentLocation를 호출되자마자, navigator를 이용해서, currentLocation을 가져올거고 가져오자마자 getWeatherByCurrentLocation 함수 호출해줘가지고 내가 받은 lat, lon 정볼르 패스를 해주는거야

  // with 코알누 현재위치 기반 날씨 갸져오기 **
  // 정보를 받은 함수를 매개 변수를 여기다 써줄거야, lat, lon (탁탁 캐치))
  // awiat 사용하려면 함수 async 함수를 써야 한다.

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url); //async 비동기적으로 처리해줄게요. 여기가 비동기
      let data = await response.json(); // let await에서 json을 추출하는것을 조금마 기다려 줄래?

      // 응답오류가 있는 경우 에러 강제 발생
      // if (!response.ok) {
      //   throw new Error("Failed to fetch weather data");
      // }

      setWeather(data);
      console.log("data", data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Failed to fetch weather by current location", err);
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  // 다른나라 날씨 겨자오기 ** 내가 S

  const getWeatherByCity = async (cityName) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      // let url = `https://api.openweathermap.org/data/2.5/weather?invalid_param`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      // // 응답오류가 있는 경우 에러 강제 발생
      // if (!response.ok) {
      //   throw new Error("Failed to fetch weather data");
      // }

      setWeather(data);
      console.log(`날씨 정보 (${cityName}):`, data);
      console.log("### data", data);
      // console.log("##response", response[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(`Failed to fetch weather for ${cityName}`, err);
      setError(
        `Failed to fetch weather for ${cityName}. Please try again later.`
      );
    }
  };

  const handleCityChange = (select) => {
    setSelectedCity(select);
    console.log("##select", select);
    if (select === "current") {
      getCurrentLocation();
    } else {
      getWeatherByCity(select);
    }
  };

  // const btnStyleChange = (selectedCity) => {

  // }
  // 다른나라 날씨 겨자오기 ** 내가 E

  // 현재 위치 날씨 가져오기 ** 내가 S
  // const API_KEY = "127ddf035270d1edf59d13bea8010ff6";
  // const getCurrentLocationWeather = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     let lat = position.coords.latitude;
  //     let lon = position.coords.longitude;

  //     console.log("현재 위치", lat, lon);

  //     //
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  //     )
  //       .then((response) => response.json())
  //       .then(
  //         (data) =>
  //           console.log(
  //             `온도 : ${data.main.temp}, 날씨 : ${data.weather[0].main}`
  //           )
  //         // console.log(`## data.weather ${data.weather}`)
  //       );

  //     //
  //   });
  // };

  // const getCurrentLocationWeatherError = () => {
  //   alert("Can't find you. No weather for you.");
  // };
  // navigator.geolocation.getCurrentPosition(
  //   getCurrentLocationWeather,
  //   getCurrentLocationWeatherError
  // );
  // 현재 위치 날씨 가져오기 ** 내가 E

  // 현재 위치 날씨 가져오기 **
  // const getCurrentLocationWeather = async () => {
  //   let url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={127ddf035270d1edf59d13bea8010ff6}`;
  //   let res = await fetch(url);
  //   setLoding(true);
  //   let data = await res.json();
  //   setWeather(data);
  //   setLoding(false);
  //   console.log("현재날씨 ?", data);
  // };

  useEffect(() => {
    getCurrentLocation(); // 현재위치를 가져와야 그기반의 날씨가 보이거든
    // getCurrentLocationWeather();
    // getWeatherByCity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   console.log("## city", city);
  //   getWeatherByCity()
  // }, [city]);
  // useEffect 실행이 언제된다 ? ui가 처음에 그려지고 나서
  // array에 값이 있다면은 ? 배열에 있는 state 값이 바뀔때 마다 호출
  // 날씨가져오는것은 성공했지만
  // city의 경우 초기값이 빈값이다
  // so, 그래서 useEffect를 두번 부르면 안된다.!! 정확히 말해서 앱이 맨처음 실행되었을 때 getCurrentLocation(); 이친구만 실행되어야 함  getWeatherByCity() 이친구는 실행되면 안됨
  // useEffect를 하나로 합쳐줘야 한다.
  // : 중요한것은 상황에 맞춰서 getCurrentLocation(); getWeatherByCity(); 이 두친구 들은 호출해줘야 한다. 의존성에 city를 넣어줘야한다. 왜냐하면 getWeatherByCity(); 이정보가 바뀔때마다 city정보를 넣어줘야 하기 때문

  // useEffect(() => {
  //   if(city==="") {
  //     getCurrentLocation();
  //   } else {
  //     getWeatherByCity()
  //   }
  // },[city]);

  return (
    <>
      {loading ? (
        <div className="container">
          <ClipLoader
            // color={color}
            color="#f88c6b"
            loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : error ? (
        <div className="container" role="alert">
          <ErrorPage message={error} />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} isLoading={isLoading} />
          {/* <WeatherBox weather={weather} /> */}
          <WeatherButton
            // variant={}
            onCityChange={handleCityChange}
            cities={cities}
            // setCity={setCity}
            selectedCity={selectedCity}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}

export default App;
