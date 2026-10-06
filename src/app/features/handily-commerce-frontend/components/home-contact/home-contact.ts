import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Button } from '@shared';

@Component({
  selector: 'app-home-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  templateUrl: './home-contact.html',
})
export class HomeContact {
  readonly contactEmail = input('ajksys@protonmail.com');
  readonly requestLead = output<MouseEvent>();
}
