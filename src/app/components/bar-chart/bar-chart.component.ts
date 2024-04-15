import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  template: `
    <div class="barChart mt-5">
      <canvas
        baseChart
        class="chart"
        [data]="barChartData"
        [options]="barChartOptions"
        [plugins]="barChartPlugins"
        [type]="barChartType"
      >
      </canvas>
    </div>
  `,
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() barChartOptions: ChartConfiguration['options'] = {
    scales: { x: {}, y: {} },
    plugins: {
      legend: { display: true },
      datalabels: { anchor: 'end', align: 'end' },
    },
  };
  @Input() barChartType: ChartType = 'bar';
  @Input() barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };
  @Input() barChartPlugins = [DataLabelsPlugin];
}
