import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentFormat',
})
export class PercentFormatPipe implements PipeTransform {
  transform(value: number, digits?: number): string {
    if (value == null) return ''; // handle null and undefined
    const factor = Math.pow(10, digits ?? 3); // default to 3 decimal places if not specified
    return `${(Math.round(value * factor) / factor).toFixed(digits ?? 3)}%`;
  }
}
