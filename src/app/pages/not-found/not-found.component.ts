import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [TranslateModule],
  template: `
    <main class="not-found">
      <p class="not-found-code">404</p>
      <h1 class="not-found-title">{{ 'notFound.title' | translate }}</h1>
      <p class="not-found-text">{{ 'notFound.text' | translate }}</p>
      <a class="not-found-link" href="/">{{ 'notFound.back' | translate }}</a>
    </main>
  `,
  styles: [
    `
      .not-found {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-md);
        text-align: center;
        padding: var(--space-xl);
      }

      .not-found-code {
        font-family: var(--font-serif);
        font-size: clamp(4rem, 15vw, 8rem);
        font-weight: 700;
        color: var(--color-accent-1);
        line-height: 1;
      }

      .not-found-title {
        font-family: var(--font-serif);
        font-size: 1.75rem;
        color: var(--color-text);
      }

      .not-found-text {
        color: var(--color-text-secondary);
        max-width: 420px;
      }

      .not-found-link {
        margin-top: var(--space-md);
        padding: 0.85rem 1.75rem;
        border-radius: var(--radius-md);
        background: var(--color-accent-1);
        color: var(--color-white);
        font-weight: 600;
        text-decoration: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
