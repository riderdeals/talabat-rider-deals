import { Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { HotelListComponent } from './shared/hotel-list/hotel-list.component';

export const routes: Routes = [


    {path:'', component: HomeComponent},
    {path:'hotel-list', component: HotelListComponent},



];
