import { Component, Input, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  template: `
    <div class="pieChart mt-5">
      <canvas
        baseChart
        class="chart"
        [data]="pieChartData"
        [type]="pieChartType"
        [options]="pieChartOptions"
        [plugins]="pieChartPlugins"
      >
      </canvas>
    </div>
  `,
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [],
  };

  @Input() pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: { display: true, position: 'top' },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return ''; // Return an empty string or a default value if labels are undefined
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
}
