import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

type SupportedLanguage = 'fr' | 'en' | 'es';

interface SeoTranslation {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  jobTitle: string;
  ogLocale: string;
}

const SITE_URL = 'https://christopher-bondier.com';
const IMAGE_URL = `${SITE_URL}/assets/img/me.JPEG`;
const JSON_LD_ID = 'structured-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private isInitialized = false;

  init(): void {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
    this.applySeo(this.resolveLanguage(this.translate.currentLang || this.translate.getDefaultLang() || 'en'));
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.applySeo(this.resolveLanguage(event.lang));
    });
  }

  private applySeo(language: SupportedLanguage): void {
    const locale = this.toLocale(language);
    const seo = this.translate.instant('seo') as SeoTranslation;

    this.document.documentElement.lang = locale;
    this.title.setTitle(seo.title);

    this.updateNameTag('description', seo.description);
    this.updateNameTag('keywords', seo.keywords);
    this.updateNameTag('author', 'Christopher Bondier');
    this.updateNameTag('robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    this.updateNameTag('twitter:card', 'summary_large_image');
    this.updateNameTag('twitter:title', seo.title);
    this.updateNameTag('twitter:description', seo.description);
    this.updateNameTag('twitter:image', IMAGE_URL);

    this.updatePropertyTag('og:type', 'website');
    this.updatePropertyTag('og:url', SITE_URL);
    this.updatePropertyTag('og:site_name', seo.siteName);
    this.updatePropertyTag('og:title', seo.title);
    this.updatePropertyTag('og:description', seo.description);
    this.updatePropertyTag('og:image', IMAGE_URL);
    this.updatePropertyTag('og:image:alt', 'Christopher Bondier portrait');
    this.updatePropertyTag('og:locale', seo.ogLocale);

    this.updateCanonicalLink(SITE_URL);
    this.updateStructuredData(language, seo);
  }

  private updateNameTag(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private updatePropertyTag(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private updateCanonicalLink(href: string): void {
    let link = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.href = href;
  }

  private updateStructuredData(language: SupportedLanguage, seo: SeoTranslation): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: seo.siteName,
          inLanguage: this.toLocale(language),
        },
        {
          '@type': 'Person',
          '@id': `${SITE_URL}/#person`,
          name: 'Christopher Bondier',
          url: SITE_URL,
          image: IMAGE_URL,
          jobTitle: seo.jobTitle,
          description: seo.description,
          email: 'mailto:christopher.bondier@gmail.com',
          telephone: '+33615925832',
          knowsAbout: ['Angular', 'Node.js', 'TypeScript', 'MySQL', 'Web development'],
          worksFor: {
            '@type': 'Organization',
            name: 'UBIKAP',
          },
          alumniOf: [
            {
              '@type': 'CollegeOrUniversity',
              name: 'CPE Lyon',
            },
            {
              '@type': 'CollegeOrUniversity',
              name: 'Universite Claude Bernard Lyon 1',
            },
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lyon',
            addressRegion: 'Auvergne-Rhone-Alpes',
            addressCountry: 'FR',
          },
          mainEntityOfPage: {
            '@id': `${SITE_URL}/#website`,
          },
        },
      ],
    };

    let script = this.document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = JSON_LD_ID;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(structuredData);
  }

  private resolveLanguage(language: string): SupportedLanguage {
    if (language === 'fr' || language === 'en' || language === 'es') {
      return language;
    }

    return 'en';
  }

  private toLocale(language: SupportedLanguage): string {
    switch (language) {
      case 'en':
        return 'en-GB';
      case 'es':
        return 'es-ES';
      default:
        return 'fr-FR';
    }
  }
}