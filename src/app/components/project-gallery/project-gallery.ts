import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-project-gallery',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="gallery-container" [class.is-modal]="isModal">
        <!-- Main Image -->
        <div class="main-image-wrapper">
            @if (images && images.length > 0) {
                <img [src]="images[currentIndex]" 
                     [alt]="alt" 
                     class="gallery-image"
                     (error)="handleError($event)">
            } @else {
                <div class="placeholder-fallback">No image available</div>
            }

            <!-- Navigation Arrows (only if multiple images) -->
            @if (images && images.length > 1) {
                <button class="nav-btn prev" (click)="prev($event)" aria-label="Previous image">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button class="nav-btn next" (click)="next($event)" aria-label="Next image">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <!-- Dots Indicators -->
                <div class="dots-container">
                    @for (img of images; track $index) {
                        <button class="dot" 
                                [class.active]="$index === currentIndex"
                                (click)="setIndex($event, $index)"
                                [attr.aria-label]="'Go to image ' + ($index + 1)">
                        </button>
                    }
                </div>
            }
        </div>
    </div>
  `,
    styles: [`
    .gallery-container {
        width: 100%;
        height: 100%;
        position: relative;
        background: transparent;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main-image-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gallery-image {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
    }

    .gallery-container:not(.is-modal) .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Navigation Buttons */
    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(8px);
        border: 1px solid var(--color-border);
        color: var(--color-accent-1);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: all var(--transition-medium);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .gallery-container:hover .nav-btn,
    .is-modal .nav-btn {
        opacity: 1;
    }

    .nav-btn:hover {
        background: var(--color-accent-1);
        color: var(--color-white);
        border-color: var(--color-accent-1);
        transform: translateY(-50%) scale(1.1);
    }

    .prev { left: var(--space-lg); }
    .next { right: var(--space-lg); }

    .placeholder-fallback {
        color: rgba(255, 255, 255, 0.5);
        font-family: var(--font-mono);
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    /* Dots */
    .dots-container {
        position: absolute;
        bottom: var(--space-lg);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 8px;
        z-index: 10;
        padding: 8px 14px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        border-radius: 30px;
        opacity: 0;
        transition: opacity var(--transition-medium);
    }

    .gallery-container:hover .dots-container,
    .is-modal .dots-container {
        opacity: 1;
    }

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .dot.active {
        background: var(--color-white);
        transform: scale(1.2);
    }

    @media (max-width: 768px) {
        .nav-btn {
            width: 36px;
            height: 36px;
        }
        .prev { left: var(--space-md); }
        .next { right: var(--space-md); }
    }
  `]
})
export class ProjectGalleryComponent {
    @Input() images: string[] = [];
    @Input() alt: string = '';
    @Input() isModal: boolean = false;
    @Input() fallbackCategory: string = '';

    currentIndex = 0;

    next(event: MouseEvent) {
        event.stopPropagation();
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }

    prev(event: MouseEvent) {
        event.stopPropagation();
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }

    setIndex(event: MouseEvent, index: number) {
        event.stopPropagation();
        this.currentIndex = index;
    }

    handleError(event: any) {
        const category = this.fallbackCategory?.toLowerCase() || '';
        let fallback = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800';

        if (category.includes('fullstack')) {
            fallback = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
        } else if (category.includes('web')) {
            fallback = 'https://images.unsplash.com/photo-1547658719-da2b81169141?auto=format&fit=crop&q=80&w=800';
        } else if (category.includes('data') || category.includes('bi')) {
            fallback = 'https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800';
        } else if (category.includes('algo') || category.includes('système') || category.includes('system')) {
            fallback = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800';
        }

        event.target.src = fallback;
    }
}
