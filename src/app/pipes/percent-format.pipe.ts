import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentFormat',
})
export class PercentFormatPipe implements PipeTransform {
  transform(value: number, digits?: number): string {
    if (value == null) return '';
    const factor = Math.pow(10, digits ?? 3);
    return `${(Math.round(value * factor) / factor).toFixed(digits ?? 3)}%`;
  }
}
