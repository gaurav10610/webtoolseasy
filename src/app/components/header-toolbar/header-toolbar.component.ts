import { Component } from '@angular/core';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss'],
})
export class HeaderToolbarComponent {
  navigateSocialLink(url: string) {
    window.open(url, '_blank');
  }
}
