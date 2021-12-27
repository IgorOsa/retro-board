import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'retro-board-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title!: string;
  public isLoggedIn!: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe((user) => {
      this.isLoggedIn = !!user.access_token;
    });
  }

  goToRoute(link: string = '/'): void {
    this.router.navigateByUrl(link);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
