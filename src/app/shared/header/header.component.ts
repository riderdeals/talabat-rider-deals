import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {  ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showBackButton = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
      // Listen to route changes
      this.router.events.subscribe(() => {
          // Check if the current route is "restaurant"
          this.showBackButton = this.router.url.includes('hotel-list');
      });
  }

  goBack() {
      this.router.navigate(['']); // Navigate to home or previous page
  }

}
