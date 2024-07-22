import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faSun as faSunRegular } from '@fortawesome/free-regular-svg-icons';

interface WeatherData {
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
    };
}

const WeatherApp = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<string>('');

    useEffect(() => {
        axios
            .get('https://ipapi.co/json/')
            .then((response) => {
                setLocation(response.data.city);
            })
            .catch(() => {
                setError('Unable to get location. Please enter your city.');
            });
    }, []);

    useEffect(() => {
        if (location) {
            const API_KEY = 'dd1820356c3e4d6293410533243006';
            const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`;

            axios
                .get(URL)
                .then((response) => {
                    setWeather(response.data);
                    setError(null);
                })
                .catch(() => {
                    setError('Error fetching weather data. Please try again later.');
                });
        }
    }, [location]);

    const renderWeatherIcon = (conditionText: string) => {
        switch (conditionText.toLowerCase()) {
            case 'sunny':
            case 'clear':
                return (
                    <FontAwesomeIcon
                        icon={faSunRegular}
                        style={{ color: '#FFD43B' }}
                        size="2x"
                    />
                );
            case 'cloudy':
            case 'partly cloudy':
                return (
                    <FontAwesomeIcon
                        icon={faCloud}
                        style={{ color: '#74C0FC' }}
                        size="2x"
                    />
                );
            case 'rain':
            case 'light rain':
            case 'moderate rain':
            case 'heavy rain':
            case 'light rain shower':
                return (
                    <FontAwesomeIcon
                        icon={faCloudRain}
                        style={{ color: '#B197FC' }}
                        size="2x"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {error && <p>{error}</p>}
            {weather ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                    }}
                >
                    {renderWeatherIcon(weather.current.condition.text)}
                    <p>{weather.current.temp_c}°C</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default WeatherApp;