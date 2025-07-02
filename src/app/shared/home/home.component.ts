import {NgFor, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  heroImage: any = {};
  categories: any[] = [];
  isLoading: boolean = true;

 
  ngOnInit(): void {
    const bannerPromise = fetch('https://talabat-backend-filmy.ondigitalocean.app/coupon/banner/')
      .then(response => response.json())
      .then((data: any) => {
        this.heroImage = {
          src: data.image || '/images/home_banner_img.jpg',
          alt: data.title || 'Landing Page Banner'
        };
      })
      .catch(() => {
        this.heroImage = {
          src: '/images/home_banner_img.jpg',
          alt: 'Default hero image'
        };
      });

    const categoriesPromise = fetch('https://talabat-backend-filmy.ondigitalocean.app/coupon/categories/')
      .then(response => response.json())
      .then((data: any[]) => {
        this.categories = (data || []).map(item => ({
          title: item.service_type_name?.trim() || '',
          label: item.label || '',
          description: item.description || '',
          image: item.image || '/images/home/default.jpg',
          alt: item.service_type_name || '',
          slug: item.slug || '',
          isActive: item.slug === 'restaurant' // Only restaurant is active
        }));
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        this.categories = [];
      });

    Promise.all([bannerPromise, categoriesPromise])
      .finally(() => {
        this.isLoading = false;
      });
  }

  // Add this method to handle category clicks
  handleCategoryClick(category: any, event: Event) {
    if (!category.isActive) {
      event.preventDefault();
      // You can show a toast or alert here
      alert('This category is coming soon!');
    }
    // If it's active, the routerLink will handle the navigation
  }
}



