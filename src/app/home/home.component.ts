import { Component, OnInit } from '@angular/core';
import { NotFoundError } from 'rxjs';

import { WeatherData } from '../models/weather.models';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  cityName: string = 'Sao Paulo';
  weatherData?: WeatherData;

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
    
  }

  onSubmit() {
    let cityValue = this.cityName;

    if( cityValue.length == 0 ){
      alert('Digite uma cidade');
      return;
    } else {
      this.getWeatherData(this.cityName);
      this.cityName = '';  
      console.log(this.weatherData);
    }
    
  }

  private getWeatherData(cityName:string) {
    this.weatherService.getWheatherData(cityName)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
         
        },
        error(msg) {
          alert(`Sorry,but city ${cityName} no found`  );
        }
      
      });
  }
  

}
