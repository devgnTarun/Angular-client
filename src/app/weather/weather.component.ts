import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';

interface ForecastDay {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string; // Assuming 'icon' is a property in the weather object
  }[];
}

interface ForecastData {
  list: ForecastDay[];
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  cityName: string = '';
  recentLocations: any[] = [];
  selectedLocation: { city: string; forecast: ForecastData } | undefined;


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    // Call the getForecast method with a default city (replace 'DefaultCity' with an actual city)
    this.getForecast('DefaultCity');
  }

  addCity(): void {
    if (!this.cityName.trim()) {
      alert('Please enter a city name.');
      return;
    }

    this.weatherService.getWeather(this.cityName).subscribe(
      (data) => {
        const location = {
          name: this.cityName,
          temperature: data.main.temp,
          weather: data.weather[0].description,
          icon: data.weather[0].icon
        };
        console.log(data)
        // Keep only the latest 8 locations
        if (this.recentLocations.length >= 8) {
          this.recentLocations.pop(); // Remove the last location
        }

        // Add the new location to the top of the list
        this.recentLocations.unshift(location);

        // Clear the input field after adding a city
        this.cityName = '';

        // Call getForecast after adding the city
        this.getForecast(location.name);
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        alert(`Error fetching weather data for ${this.cityName}. Please try again.`);
      }
    );
  }

  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString); // Convert the string to a Date object
    const dayIndex = date.getDay(); // Get the day index (0-6)
    const dayOfMonth = date.getDate(); // Get the day of the month (1-31)
    return `${dayOfMonth} ${daysOfWeek[dayIndex]}`; // Return the corresponding day from the array
  }


  refreshWeather(location: any): void {
    this.weatherService.getWeather(location.name).subscribe(
      (data) => {
        location.temperature = data.main.temp;
        location.weather = data.weather[0].description;
      },
      (error) => {
        console.error('Error refreshing weather data:', error);
        alert(`Error refreshing weather data for ${location.name}. Please try again.`);
      }
    );
  }

  removeLocation(index: number): void {
    // Remove the location from the list
    this.recentLocations.splice(index, 1);
  }

  getForecast(city: string): void {
    this.weatherService.getForecast(city).subscribe(
      (data: ForecastData) => {
        this.selectedLocation = { city, forecast: data };
        console.log('Selected Location:', this.selectedLocation);
      },
      (error) => {
        console.error('Error fetching forecast data:', error);
      }
    );
  }

  clearLocations(): void {
    // Clear all locations from the list
    this.recentLocations = [];
    this.selectedLocation = undefined;
  }

  castToForecastDay(data: any): ForecastData {
    return data as ForecastData;
  }
  formatTemperature(temp: number): string {
    // Convert temperature to Celsius and round to two decimal places
    const celsius = temp - 273.15;
    return celsius.toFixed(2);
  }

}
