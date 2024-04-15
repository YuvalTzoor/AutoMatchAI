import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1; // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Output format: 17.1.1995
  }
}
