import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  ChartData,
  ChartTypeRegistry,
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'gender',
    'birthday',
    'email',
    'address',
    'city',
    'country',
    'favoriteColor',
    'hobbies',
    'motorType',
    'seats',
  ];

  dataSource: User[] = [];
  options1:
    | _DeepPartialObject<
        CoreChartOptions<keyof ChartTypeRegistry> &
          ElementChartOptions<keyof ChartTypeRegistry> &
          PluginChartOptions<keyof ChartTypeRegistry> &
          DatasetChartOptions<keyof ChartTypeRegistry> &
          ScaleChartOptions<keyof ChartTypeRegistry>
      >
    | undefined;
  options2:
    | _DeepPartialObject<
        CoreChartOptions<keyof ChartTypeRegistry> &
          ElementChartOptions<keyof ChartTypeRegistry> &
          PluginChartOptions<keyof ChartTypeRegistry> &
          DatasetChartOptions<keyof ChartTypeRegistry> &
          ScaleChartOptions<keyof ChartTypeRegistry>
      >
    | undefined;
  options3:
    | _DeepPartialObject<
        CoreChartOptions<keyof ChartTypeRegistry> &
          ElementChartOptions<keyof ChartTypeRegistry> &
          PluginChartOptions<keyof ChartTypeRegistry> &
          DatasetChartOptions<keyof ChartTypeRegistry> &
          ScaleChartOptions<keyof ChartTypeRegistry>
      >
    | undefined;
  data1: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }],
  };
  data2: ChartData<'bar', number[], string | string[]> = {
    labels: [],
    datasets: [],
  };
  data3: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }],
  };
  SubmitterCount: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.dataSource = users;
      this.data1 = this.processDataForEngineType(users);
      this.data2 = this.processDataForChart(users) as ChartData<
        'bar',
        number[],
        string | string[]
      >;
      this.data3 = this.processHobbiesData(users);
    });
    let SubmitterCountTemp: number = parseInt(
      localStorage.getItem('SubmitterCount') || '0'
    );
    let totalVisitorsTemp: number = parseInt(
      localStorage.getItem('TotalVisitors') || '0'
    );

    this.SubmitterCount =
      totalVisitorsTemp > 0
        ? (SubmitterCountTemp / totalVisitorsTemp) * 100
        : 0;
  
  }

  processDataForEngineType(
    users: User[]
  ): ChartData<'pie', number[], string | string[]> {
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

    return {
      labels: ['Fuel Male', 'Electric Male', 'Fuel Female', 'Electric Female'],
      datasets: [
        { data: [Fuel_male, Electric_male, Fuel_female, Electric_female] },
      ],
    };
  }

  processDataForChart(
    users: User[]
  ): ChartData<'bar', number[], string | string[]> {
    const colorCountsByAgeGroup: {
      [ageGroup: string]: { [color: string]: number };
    } = {};
    const ageGroups = ['20-29', '30-39', '40-49', '50-59', '60+'];


    ageGroups.forEach((group) => {
      colorCountsByAgeGroup[group] = {};
    });


    users.forEach((user) => {
      const age = this.calculateAge(user.birthday);
      let ageGroup = '';


      if (age >= 20 && age < 30) {
        ageGroup = '20-29';
      } else if (age >= 30 && age < 40) {
        ageGroup = '30-39';
      } else if (age >= 40 && age < 50) {
        ageGroup = '40-49';
      } else if (age >= 50 && age < 60) {
        ageGroup = '50-59';
      } else if (age >= 60) {
        ageGroup = '60+';
      }

      if (ageGroup) {
        const color = user.favoriteColor;
        if (!colorCountsByAgeGroup[ageGroup][color]) {
          colorCountsByAgeGroup[ageGroup][color] = 0;
        }
        colorCountsByAgeGroup[ageGroup][color]++;
      }
    });


    const labels = Object.keys(colorCountsByAgeGroup)
      .flatMap((group) => Object.keys(colorCountsByAgeGroup[group]))
      .filter((value, index, self) => self.indexOf(value) === index);

    const datasets = ageGroups.map((group) => {
      return {
        label: group,
        data: labels.map((color) => colorCountsByAgeGroup[group][color] || 0),
      };
    });

    return { labels, datasets };
  }

  processHobbiesData(
    users: User[]
  ): ChartData<'pie', number[], string | string[]> {
    const hobbyCounts: { [hobby: string]: number } = {};
    users.forEach((user) => {
      user.hobbies.forEach((hobby) => {
        hobbyCounts[hobby] = (hobbyCounts[hobby] || 0) + 1;
      });
    });

    const labels = Object.keys(hobbyCounts);
    const data = Object.values(hobbyCounts);

    return {
      labels: labels,
      datasets: [{ data: data }],
    };
  }

  calculateAge(birthday: string): number {
    const birthdayDate = new Date(birthday);
    const ageDifMs = Date.now() - birthdayDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
