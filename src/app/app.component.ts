import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { GoogleChartsConfig } from 'angular-google-charts';
import { Observable, ReplaySubject, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AutoMatchAI';
}
export const googleChartsConfigSubject = new ReplaySubject<GoogleChartsConfig>(
  1
);
@Injectable()
export class GoogleChartsConfigService {
  private configSubject = new ReplaySubject<GoogleChartsConfig>(1);
  readonly config$ = this.configSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadLazyConfigValues(): void {
    this.http
      .post('https://special.config.api.com/getchartsconfig', {})
      .pipe(take(1))
      .subscribe((config) => this.configSubject.next(config));
  }
}
export function googleChartsConfigFactory(
  configService: GoogleChartsConfigService
): Observable<GoogleChartsConfig> {
  return configService.config$;
}
