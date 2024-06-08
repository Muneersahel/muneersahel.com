import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private title = inject(Title);
  private meta = inject(Meta);

  baseUrl = 'https://muneersahel.com';
  private _keywords =
    'munir issa, software developer, full stack developer, web developer, angular developer, munir issa software developer, munir issa full stack developer, munir issa web developer, munir issa angular developer, ionic developer, munir issa ionic developer, munir issa telecom engineer, munir issa software engineer, munir issa web engineer, munir issa angular engineer, munir issa ionic engineer, munir issa telecom developer, munir issa software developer, munir issa web developer, munir issa angular developer, munir issa ionic developer, munir issa telecom engineer, munir issa software engineer, munir issa web engineer, munir issa angular engineer, munir issa ionic engineer, munir issa telecom developer';
  private _title = 'Munir Issa | Software Developer';
  private _description =
    'I am a Telecom Engineer and a Full Stack Developer. I have a passion for building beautiful and functional websites and applications.';

  private _metaTags = {
    title: this._title,
    description: this._description,
    image: this.baseUrl + '/images/profile/munir-issa.png',
    keywords: this._keywords,
    url: this.baseUrl,
  };

  updateMetaTags(params: Partial<typeof this._metaTags> = this._metaTags) {
    const { title, description, image, keywords, url } = params;
    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({
        property: 'og:title',
        content: title,
      });
      this.meta.updateTag({
        name: 'twitter:title',
        content: title,
      });
    }

    if (description) {
      this.meta.updateTag({
        name: 'description',
        content: description,
      });

      this.meta.updateTag({
        property: 'og:description',
        content: description,
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: description,
      });
    }

    if (keywords) {
      this.meta.updateTag({
        name: 'keywords',
        content: keywords,
      });
    }

    if (image) {
      this.meta.updateTag({
        property: 'og:image',
        content: image,
      });
      this.meta.updateTag({
        name: 'twitter:image',
        content: image,
      });
    }

    if (url) {
      this.meta.updateTag({
        property: 'og:url',
        content: url,
      });
    }

    this.meta.updateTag({
      name: 'twitter:creator',
      content: '@muneersahel',
    });
  }
}
