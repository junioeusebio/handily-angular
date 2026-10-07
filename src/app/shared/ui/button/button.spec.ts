import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Button } from './button';

@Component({
  imports: [Button],
  template: `<app-button variant="primary" (pressed)="clicked = true">Go</app-button>`,
})
class Host {
  clicked = false;
}

describe('Button', () => {
  it('should render and emit pressed', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.textContent).toContain('Go');
    expect(button.disabled).toBe(false);
    button.click();
    expect(fixture.componentInstance.clicked).toBe(true);
  });

  it('should use the shared keyboard focus ring on every variant', () => {
    @Component({
      imports: [Button],
      template: `<app-button variant="primary">A</app-button>
        <app-button variant="outline">B</app-button>
        <app-button variant="ghost">C</app-button>`,
    })
    class VariantsHost {}

    const fixture = TestBed.createComponent(VariantsHost);
    fixture.detectChanges();
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>,
    );
    expect(buttons.length).toBe(3);
    for (const button of buttons) {
      expect(button.classList).toContain('focus-visible:outline-focus');
      expect(button.classList).toContain('focus-visible:outline-2');
      expect(button.classList).toContain('focus-visible:outline-offset-2');
    }
  });

  it('should honor disabled', () => {
    @Component({
      imports: [Button],
      template: `<app-button [disabled]="true">X</app-button>`,
    })
    class DisabledHost {}

    const fixture = TestBed.createComponent(DisabledHost);
    fixture.detectChanges();
    expect((fixture.nativeElement.querySelector('button') as HTMLButtonElement).disabled).toBe(
      true,
    );
  });
});
