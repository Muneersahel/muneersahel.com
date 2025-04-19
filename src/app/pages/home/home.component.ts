import { SocialsComponent } from '@/shared/components';
import { MetaTagsService } from '@/shared/services';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { lucideDownload } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { StatsComponent } from './components';

@Component({
    selector: 'app-home',
    imports: [
        HlmButtonDirective,
        HlmIconComponent,
        SocialsComponent,
        NgOptimizedImage,
        StatsComponent,
    ],
    providers: [provideIcons({ lucideDownload })],
    template: `
    <section class="h-full">
      <div class="container">
        <div
          class="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24"
        >
          <div class="text-center xl:text-left order-2 xl:order-none">
            <span>Software Delever</span>
            <h1 class="mb-6 h1">
              Hello I'm <br /><span class="text-accent">Munir Issa</span>
            </h1>
            <p class="max-w-lg mb-9 text-white/80">
              I'm a Telecom Engineer and a Full Stack Developer. I have a
              passion for building beautiful and functional websites and
              applications.
            </p>

            <div class="flex flex-col xl:flex-row items-center gap-8">
              <a
                hlmBtn
                variant="outline"
                size="lg"
                class="uppercase flex items-center gap-2"
              >
                Download CV
                <hlm-icon name="lucideDownload" class="h-5 w-5"></hlm-icon>
              </a>

              <div class="mb-8 xl:mb-0">
                <app-socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div class="order-1 xl:order-none mb-8 xl-mb-0">
            <div
              class="relative w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten m-auto xl:mr-0"
            >
              <img
                ngSrc="images/profile/munir-issa.png"
                alt="munir issa"
                class="object-contain"
                priority
                fill
              />
            </div>
          </div>
        </div>
      </div>

      <app-stats />
    </section>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private metaTags = inject(MetaTagsService);

  constructor() {
    this.metaTags.updateMetaTags();
  }
}
