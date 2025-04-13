import Image from "next/image";
import styles from "@/modules/DetailedForecast/DetailedForecast.module.scss";
import cn from "classnames";
import {Humidity, TempMin, Waves, Wind} from "@/assets/icons";
import {FC} from "react";
import {IweatherData} from "@/modules/DetailedForecast/types";

export const WeatherCard: FC<{
    weather: IweatherData | null
}> = ({weather}) => {

    if(!weather) return <p>loading...</p>;

    return (
        <>
            <div className="bg-default-background p-3 rounded-4 d-flex gap-4 justify-content-between">
                <div className="d-flex gap-3">
                    <div className="d-flex gap-3 position-relative">
                        <Image
                            src="https://openweathermap.org/img/wn/04d@2x.png"
                            alt="пасмурно"
                            width={80}
                            height={80}
                            className={styles.temp__img}
                        />
                        <strong className={cn('font-weight-bold', styles.temp)}>
                            {weather.main.temp < 1
                                ? `- ${weather.main.temp.toFixed()}°`
                                : `+${weather.main.temp.toFixed()}°`}
                        </strong>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        {weather.weather.map((e) => (
                            <p key={e.id} className="text-capitalize pb-1 fw-bold">
                                {e.description}
                            </p>
                        ))}
                        <p>Ощущается как {weather.main.feels_like.toFixed()}°</p>
                    </div>
                </div>
                <div>
                    <h2 className="fw-bold pe-4 d-block gothic-font text-end">{weather.name}</h2>
                    <ul className="d-flex gap-3">
                        <li className="d-flex gap-1 align-items-center">
                            <div className={styles.icon}>
                                <TempMin />
                            </div>
                            <span>{weather.main.temp_min} °</span>
                        </li>
                        <li className="d-flex gap-1 align-items-center">
                            <div className={styles.icon}>
                                <Humidity />
                            </div>
                            <span>{weather.main.humidity}%</span>
                        </li>
                        <li className="d-flex gap-1 align-items-center">
                            <div className={styles.icon}>
                                <Wind />
                            </div>
                            {weather.wind.speed} м/с
                        </li>
                        <li className="d-flex gap-1 align-items-center">
                            <div className={styles.icon}>
                                <Waves />
                            </div>
                            {weather.clouds.all} %
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
