import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-works',
  standalone: true,
  template: `
    <h1>Works</h1>
    <p>Welcome to the works page!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WorksComponent {}
