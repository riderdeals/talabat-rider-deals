import {CommonModule, NgFor, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RestaurentService } from 'app/services/restaurent.service';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule],
  providers: [RestaurentService],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})


export class HotelCardComponent implements OnInit {
  isModalOpen = false;
  qrCodeImage: string = '';
  selectedHotelName: string = '';
  selectedHotelDeal: string = '';
  searchTerm: string = '';
  hotelCards: any[] = [];
  filteredHotelCards: any[] = [];
  isLoading: boolean = true; // Initialize as true to show loader immediately
  errorMessage: string = '';
  loaderImage: string = '/images/restaurent/hotel-list-load.gif'; // Path to your loader GIF

  constructor(private restaurantService: RestaurentService) {}

  ngOnInit() {
    this.fetchRestaurants();
  }

  async fetchRestaurants() {
    try {
      const response = await fetch('https://talabat-backend-filmy.ondigitalocean.app/coupon/categories/restaurant/items');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      this.processRestaurantData(data.items || []);
      
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
      this.errorMessage = 'Failed to load restaurants. Please try again later.';
    } finally {
      this.isLoading = false;
    }
  }

  private processRestaurantData(items: any[]) {
    // Process data in batches to prevent UI freezing
    const batchSize = 10;
    let processedCount = 0;
    
    const processBatch = () => {
      const batch = items.slice(processedCount, processedCount + batchSize);
      
      batch.forEach(item => {
        this.hotelCards.push({
          restaurant_name: item.name || 'No name available',
          deals: item.deals || 'No deal available',
          description: item.description || '',
          slug: item.slug || '',
          image: item.image || 'assets/images/default-restaurant.jpg',
          qr_image: item.qr_code || '',
          menu: item.menu || null
        });
      });
      
      processedCount += batchSize;
      this.filteredHotelCards = [...this.hotelCards];
      
      if (processedCount < items.length) {
        setTimeout(processBatch, 0); // Allow UI to update between batches
      }
    };
    
    processBatch();
  }

  onSearchTermChange() {
    if (!this.searchTerm) {
      this.filteredHotelCards = [...this.hotelCards];
      return;
    }

    const normalizedSearchTerm = this.searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    this.filteredHotelCards = this.hotelCards.filter(
      (card) =>
        (card.restaurant_name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedSearchTerm) ||
        card.deals?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedSearchTerm) ||
        card.description?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedSearchTerm))
    );
  }

  openModal(card: any) {
    this.qrCodeImage = card.qr_image;
    this.selectedHotelName = card.restaurant_name;
    this.selectedHotelDeal = card.deals;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.qrCodeImage = '';
    this.selectedHotelName = '';
    this.selectedHotelDeal = '';
  }

  async openMenu(menuUrl: string | null) {
    if (!menuUrl) {
      alert('No menu available for this restaurant.');
      return;
    }

    try {
      const isPDF = menuUrl.toLowerCase().endsWith('.pdf');
      const link = document.createElement('a');
      link.href = menuUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // if (isPDF) {
      //   link.download = 'menu_' + (this.selectedHotelName || 'restaurant') + '.pdf';
      // }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => window.open(menuUrl, '_blank'), 100);
      
    } catch (error) {
      console.error('Error opening menu:', error);
      alert('Failed to open the menu. Please try again later.');
    }
  }
}
