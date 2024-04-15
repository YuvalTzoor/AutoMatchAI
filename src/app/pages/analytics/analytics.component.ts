import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ChartType } from 'angular-google-charts'; // Ensure this is the correct path
import { GoogleChartsConfigService } from '../../app.component'; // Ensure this is the correct path

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  displayedColumns: string[] = [
    'birthday',
    'email',
    'firstName',
    'lastName',
    'gender',
    'address',
    'city',
    'country',
    'hobbies',
    'favoriteColor',
    'seats',
    'motorType',
  ];
  dataSource: any[] = [];

  pieChartType: ChartType = ChartType.PieChart;
  pieChartData: any[] | undefined;
  pieChartOptions = {
    title: 'Most Picked Engine Type by Gender',
    width: 400,
    height: 300,
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.dataSource = data;
      this.processDataForChart(data);
    });
  }

  processDataForChart(users: any[]) {
    let Fuel_male = 0;
    let Electric_male = 0;
    let Fuel_female = 0;
    let Electric_female = 0;
    users.forEach((user) => {
      if (
        user.gender.toLowerCase() === 'male' &&
        user.motorType.toLowerCase() === 'fuel'
      ) {
        Fuel_male++;
      }
      if (
        user.gender.toLowerCase() === 'male' &&
        user.motorType.toLowerCase() === 'electric'
      ) {
        Electric_male++;
      }
      if (
        user.gender.toLowerCase() === 'female' &&
        user.motorType.toLowerCase() === 'fuel'
      ) {
        Fuel_female++;
      }
      if (
        user.gender.toLowerCase() === 'female' &&
        user.motorType.toLowerCase() === 'electric'
      ) {
        Electric_female++;
      }
    });

    this.pieChartData = [
      ['Engine Type', 'Count'],
      ['Male Electric', Electric_male],
      ['Male Fuel', Electric_male],
      ['Female Electric', Electric_female],
      ['Female Fuel', Fuel_female],
    ];
  }
}
