import { Component, OnInit } from '@angular/core';
import { SummaryServiceService } from 'src/app/services/summary/summary-service.service';
import { Summary } from 'src/app/models/summary';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  summary: Summary;
  users30: number;
  orders30: number;
  sales30: number;
  usersTotal: number;
  totalProduct: number;
  ordersTotal: number;

  colors = {
    a: '#EA7773',
    b: '#1BCA9B',
    c: '#1287A5'
  }

  constructor(private summaryService: SummaryServiceService) {}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.summaryService.getSummary().subscribe({
      next: (summary) => {
        console.log(summary);
        this.summary = summary;

        this.orders30 = summary.result.last30DaysSummary.orders;
        this.users30 = summary.result.last30DaysSummary.userRegistered;
        this.sales30 = summary.result.last30DaysSummary.sale;
        this.ordersTotal = summary.result.overAll.orders;
        this.totalProduct = summary.result.overAll.products;
        this.usersTotal = summary.result.overAll.users;
        
      },
    });
  }
}
