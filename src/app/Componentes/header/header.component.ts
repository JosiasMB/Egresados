import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isActive: boolean = false;

  toggleMenu() {
    const maxWidth = 800;
    const screenWidth = window.innerWidth;
    if (screenWidth <= maxWidth) {
      this.isActive = !this.isActive;
    }
  }
}
