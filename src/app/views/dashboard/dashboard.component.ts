import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard,component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) {}

  protected toGuests() {
    this.navigate('/hospedes', 'listar');
  }

  protected toFinanceiro() {
    this.navigate('/financeiro', 'listar');
  }

  protected toRooms() {
    this.navigate('/quartos', 'listar');
  }

  protected toReservations() {
    this.navigate('/reservas', 'listar');
  }

  protected navigate(path: string, subPath: string) {
    this.router.navigate([path, subPath]);
  }

}
