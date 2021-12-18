import { Component, OnInit } from '@angular/core';
import { SummaryServiceService } from 'src/app/shared/services/summary/summary-service.service';
import { Summary } from 'src/app/shared/models/summary';
// import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
// import { Label } from 'ng2-charts';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';

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
    c: '#1287A5',
  };

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //     }
  //   }
  // };
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataset[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  constructor(private summaryService: SummaryServiceService) {}

  ngOnInit(): void {
    this.getSummary();
  }

  initChart() {
    // this.barChartData = [];
    // this.barChartLabels = [];
    let productSummary =
      this.summary.result.last30DaysSummary.productWise30DaySummary;
    let sales: number[] = [];
    let quantities: number[] = [];

    // productSummary.forEach((element) => {
    // let name = element.product.name;
    // if(name.length > 15) {
    // name = name.substr(0, 15);
    // }
    //   this.barChartLabels.push(name);
    //   quantities.push(element.quantity);
    //   sales.push(element.totalSale);
    // });

    // this.barChartData = [
    //   { data: sales, label: 'Sales' },
    //   { data: quantities, label: 'Quantity' },
    // ];
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

  // changeChart(chartType: ChartType){
  //   this.barChartType = chartType;
  // }
}
