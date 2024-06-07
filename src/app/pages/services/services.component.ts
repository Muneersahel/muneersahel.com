import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <h1>Services</h1>
    <p>Welcome to the services page!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ServicesComponent {}
