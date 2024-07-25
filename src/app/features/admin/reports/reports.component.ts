import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  constructor() { }

  ngOnInit(): void {
    this.renderEventOverviewChart();
    this.renderAttendeesEngagementChart();
    this.renderEarningsChart();
  }

  renderEventOverviewChart() {
    // Replace with actual charting library or implementation
    Highcharts.chart('eventOverviewChart', {
      title: {
        text: 'Event Overview'
      },
      series: [{
        type: 'column',
        name: 'Events',
        data: [5, 10, 15, 20, 25]
      }]
    });
  }

  renderAttendeesEngagementChart() {
    // Replace with actual charting library or implementation
    Highcharts.chart('attendeesEngagementChart', {
      title: {
        text: 'Attendees Engagement'
      },
      series: [{
        type: 'line',
        name: 'Attendees',
        data: [100, 200, 300, 400, 500]
      }]
    });
  }

  renderEarningsChart() {
    // Replace with actual charting library or implementation
    Highcharts.chart('earningsChart', {
      title: {
        text: 'Earnings from Tickets'
      },
      series: [{
        type: 'area',
        name: 'Revenue',
        data: [5000, 10000, 15000, 20000, 25000]
      }]
    });
  }
}
