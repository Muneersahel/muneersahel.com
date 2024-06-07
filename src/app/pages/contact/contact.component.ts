import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <h1>Contact</h1>
    <p>Welcome to the contact page!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent {}
