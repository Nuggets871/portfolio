import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

type SupportedLanguage = 'fr' | 'en' | 'es';

interface SeoTranslation {
  title: string;
  description: string;
  keywords: string;
  siteName: string;
  jobTitle: string;
  ogLocale: string;
}

interface ProjectItem {
  title?: string;
  description?: string;
  link?: string;
  github?: string;
  tech?: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

const SITE_URL = 'https://christopher-bondier.com';
const IMAGE_URL = `${SITE_URL}/assets/img/me.JPEG`;
const OG_IMAGE_URL = `${SITE_URL}/assets/img/og-image.jpg`;
const JSON_LD_ID = 'structured-data';
const LAST_UPDATED = '2026-09-21';
const SOCIAL_PROFILES = [
  'https://github.com/Nuggets871',
  'https://www.linkedin.com/in/christopher-bondier-15884623a/',
];
const KNOWS_ABOUT = [
  'Angular',
  'Node.js',
  'TypeScript',
  'JavaScript',
  'MySQL',
  'PostgreSQL',
  'NestJS',
  'Web development',
];

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);

  apply(language: SupportedLanguage): void {
    const locale = this.toLocale(language);
    const pageUrl = this.toPageUrl(language);
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
    this.updateNameTag('twitter:image', OG_IMAGE_URL);

    this.updatePropertyTag('og:type', 'website');
    this.updatePropertyTag('og:url', pageUrl);
    this.updatePropertyTag('og:site_name', seo.siteName);
    this.updatePropertyTag('og:title', seo.title);
    this.updatePropertyTag('og:description', seo.description);
    this.updatePropertyTag('og:image', OG_IMAGE_URL);
    this.updatePropertyTag('og:image:alt', 'Christopher Bondier — Full-Stack Developer');
    this.updatePropertyTag('og:image:width', '1200');
    this.updatePropertyTag('og:image:height', '630');
    this.updatePropertyTag('og:locale', seo.ogLocale);

    this.updateCanonicalLink(pageUrl);
    this.updateStructuredData(language, seo, pageUrl);
  }

  private toPageUrl(language: SupportedLanguage): string {
    switch (language) {
      case 'fr':
        return `${SITE_URL}/fr/`;
      case 'es':
        return `${SITE_URL}/es/`;
      default:
        return `${SITE_URL}/`;
    }
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

  private updateStructuredData(
    language: SupportedLanguage,
    seo: SeoTranslation,
    pageUrl: string,
  ): void {
    const projects = this.translate.instant('projects.items') as ProjectItem[];
    const faq = this.translate.instant('faq.items') as FaqItem[];

    const graph: unknown[] = [
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
        image: {
          '@type': 'ImageObject',
          url: IMAGE_URL,
          caption: 'Christopher Bondier',
        },
        jobTitle: seo.jobTitle,
        description: seo.description,
        email: 'mailto:christopher.bondier@gmail.com',
        sameAs: SOCIAL_PROFILES,
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: ['fr', 'en', 'es'],
        hasOccupation: {
          '@type': 'Occupation',
          name: seo.jobTitle,
          occupationLocation: {
            '@type': 'City',
            name: 'Lyon',
          },
        },
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
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profilepage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: this.toLocale(language),
        dateModified: LAST_UPDATED,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#person`,
        },
        mainEntity: {
          '@id': `${SITE_URL}/#person`,
        },
      },
    ];

    if (Array.isArray(projects) && projects.length > 0) {
      graph.push({
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#projects`,
        name: 'Projects',
        itemListElement: projects
          .filter((project) => Boolean(project.title))
          .map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareApplication',
              name: project.title,
              description: project.description,
              applicationCategory: 'WebApplication',
              url: project.link,
              codeRepository: project.github,
              programmingLanguage: project.tech,
              author: {
                '@id': `${SITE_URL}/#person`,
              },
            },
          })),
      });
    }

    if (Array.isArray(faq) && faq.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: this.toLocale(language),
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': graph,
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
