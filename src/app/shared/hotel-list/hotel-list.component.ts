import { Component } from '@angular/core';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [HotelCardComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css'
})
export class HotelListComponent {


  heroImage = {
    src: '/images/restaurent/restaurant-banner_1920_700.jpg',
    alt: 'Restaurents list banner'
  };

 
}
