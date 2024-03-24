import React from "react";
import { Button } from "react-bootstrap";

export const WeatherButton = ({
  onCityChange,
  cities,
  setCity,
  selectedCity,
  isLoading,
}) => {
  //   const cities = ["current", "Seoul", "Paris", "New york", "London"];
  //   console.log("cities?", cities);
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  if (isLoading) {
    return null;
  }
  return (
    <>
      <div className="btnBoxSX">
        {cities.map((item) => (
          //   <Button
          //     key={item}
          //     variant="warning"
          //     className="btnSX"
          //     onClick={() => onCityChange(item)}
          //   >
          //     {item === "current" ? "Current Location" : item}
          //   </Button>
          <Button
            // key={item}
            // variant="warning"
            variant={item === selectedCity ? "warning" : "primary"}
            // className="btnSX"
            className={`btnSX ${item === selectedCity ? "active" : ""}`}
            onClick={() => onCityChange(item)} // Me
            // isLoading={isLoading}

            // onClick={() => setCity(item)}
            // 다른 나라 날씨 가져오기 선생님 설명 S (2번) **
            // setCity라는 함수를 props를 호출하면서
            // 이 setCity에 머를 세팅해준다 ? 이 item값을 세팅해준다
            // : 버튼을 클릭하면은 city정보를 설정해준다. 내가 어떤 city를 설정했는지
            // 근데 이 state는 app에 있다.
            // 결론은 app에 있는 city가 바뀌는 것이다.
            // : 즉 weatherButton은 어떠한 state도 없다 (app이 주는것만 사용)
            // 다른 나라 날씨 가져오기 선생님 설명 E (2번) **
          >
            {item === "current" ? "Current Location" : item}
          </Button>
        ))}
        {/* <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("current")}
        >
          Current Location
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("Seoul")}
        >
          Seoul
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("Paris")}
        >
          Paris
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("New York")}
        >
          New york
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("London")}
        >
          London
        </Button> */}
      </div>
    </>
  );
};
