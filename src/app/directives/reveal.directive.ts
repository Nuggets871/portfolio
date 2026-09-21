import { Directive, ElementRef, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
    selector: '[appReveal]',
    standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
    private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly platformId = inject(PLATFORM_ID);
    private observer?: IntersectionObserver;

    ngOnInit() {
        // On the server (prerender) we skip the animation entirely so the content
        // stays visible in the generated HTML and remains crawlable.
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.el.nativeElement.classList.add('reveal');

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.observer?.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.observer.observe(this.el.nativeElement);
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }
}
