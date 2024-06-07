import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  standalone: true,
  template: `
    <h1>Resume</h1>
    <p>Welcome to the resume page!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResumeComponent {}
