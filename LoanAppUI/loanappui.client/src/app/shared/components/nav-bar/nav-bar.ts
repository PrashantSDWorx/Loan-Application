import { Component } from '@angular/core';
import { Logo } from '../logo/logo';

@Component({
  imports: [Logo],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar { }
