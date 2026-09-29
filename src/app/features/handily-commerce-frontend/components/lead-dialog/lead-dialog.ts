import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { Button, Modal } from '@shared';

@Component({
  selector: 'app-lead-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Modal],
  templateUrl: './lead-dialog.html',
})
export class LeadDialog {
  private readonly modal = viewChild.required(Modal);

  readonly open = model(false);
  readonly contactEmail = input('ajksys@protonmail.com');

  readonly submitted = output<{ nome: string; contato: string; solicitacao: string }>();

  /** Texto atual do campo Solicitação (pode ser pré-preenchido ao abrir). */
  protected readonly solicitacao = signal('');

  /**
   * Abre o diálogo a partir de um gatilho.
   * @param prefill quando informado, substitui o texto de Solicitação (ex.: curso escolhido).
   */
  openFrom(event?: Event, prefill?: string): void {
    if (prefill !== undefined) {
      this.solicitacao.set(prefill);
    }
    this.modal().openFrom(event);
  }

  close(): void {
    this.modal().close();
  }

  protected onSolicitacaoInput(event: Event): void {
    this.solicitacao.set((event.target as HTMLTextAreaElement).value);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const nome = String(data.get('nome') ?? '').trim();
    const contato = String(data.get('contato') ?? '').trim();
    const solicitacao = String(data.get('solicitacao') ?? '').trim();
    if (!nome || !contato || !solicitacao) {
      return;
    }
    this.submitted.emit({ nome, contato, solicitacao });
  }
}
