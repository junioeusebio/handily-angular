import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HomeFooter } from './home-footer';

@Component({
  imports: [HomeFooter],
  template: `<app-home-footer
    feVersion="0.11.1"
    [apiVersionLabel]="apiVersion()"
    [apiStatusLabel]="apiStatus()"
    (requestLead)="count = count + 1"
  />`,
})
class Host {
  readonly apiVersion = signal('—');
  readonly apiStatus = signal('—');
  count = 0;
}

describe('HomeFooter', () => {
  it('should expose the API status as a polite live region', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    const status = root.querySelector('.app-api-status') as HTMLElement;
    expect(status).toBeTruthy();
    expect(status.getAttribute('aria-live')).toBe('polite');
    expect(status.getAttribute('aria-atomic')).toBe('true');
    expect(status.getAttribute('role')).toBe('status');
    expect(status.textContent).toContain('API: — · —');
    expect(root.querySelector('.app-versions')?.textContent).toContain('WEB: 0.11.1');
  });

  it('should update the live region text when the API status changes', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    fixture.componentInstance.apiVersion.set('v1');
    fixture.componentInstance.apiStatus.set('ok');
    fixture.detectChanges();

    const status = fixture.nativeElement.querySelector('.app-api-status') as HTMLElement;
    expect(status.textContent).toContain('API: v1 · ok');
    // Only the API part is live, so the copyright/WEB version is not re-announced.
    expect(status.textContent).not.toContain('COPYRIGHT');
  });

  it('should emit requestLead from the footer CTA', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    expect(fixture.componentInstance.count).toBe(1);
  });
});
