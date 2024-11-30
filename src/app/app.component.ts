import { CommonModule } from '@angular/common';
import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isLoggedIn = false;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('User') ? true : false;
  }

  logout(): void {
    localStorage.removeItem('User');
    this.router.navigateByUrl('login');
    this.snackBar.open('You have been successfully logged out.', 'X', {duration: 3000});
  }
}
