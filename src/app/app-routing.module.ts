import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { CounterComponent } from './counter/counter.component';


const routes: Routes = [
  // { path: '', component :  },
  { path: 'weather', component: WeatherComponent },
  { path: 'counter', component: CounterComponent },
  // Other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
