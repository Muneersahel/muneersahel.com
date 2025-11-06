import { provideIcons } from "@ng-icons/core";
import { NgIcon } from "@ng-icons/core";
import { SocialsComponent } from "@/shared/components";
import { CvService, MetaTagsService } from "@/shared/services";
import { NgOptimizedImage } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { lucideArrowRight, lucideDownload } from "@ng-icons/lucide";
import { HlmButtonDirective } from "@spartan-ng/ui-button-helm";
import { HlmIconDirective } from "@spartan-ng/ui-icon-helm";
import { map, startWith, timer } from "rxjs";
import { StatsComponent } from "./components";

@Component({
  selector: "app-home",
  imports: [
    HlmButtonDirective,
    NgIcon,
    HlmIconDirective,
    SocialsComponent,
    NgOptimizedImage,
    StatsComponent,
  ],
  providers: [provideIcons({ lucideDownload, lucideArrowRight })],
  template: `
    <section class="h-full">
      <div class="container">
        <div
          class="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24"
        >
          <div class="text-center xl:text-left order-2 xl:order-0">
            @if (isHeroVisible()) {
              <div
                class="mb-4 transition-all duration-300 ease-in-out"
                [class.opacity-100]="isHeroVisible()"
                [class.opacity-0]="!isHeroVisible()"
              >
                <span
                  class="inline-block py-1 px-3 bg-accent/10 text-accent rounded-md"
                >
                  Software Developer
                </span>
              </div>
            }

            <h1 class="mb-6 h1">
              Hello I'm <br /><span class="text-accent">Munir Issa</span>
            </h1>

            <p class="max-w-lg mb-9 text-white/80">
              I'm a Telecom Engineer and a Full Stack Developer with
              {{ yearsOfExperience() }}+ years of experience. I have a passion
              for building beautiful and functional websites and applications.
            </p>

            <div class="flex flex-col xl:flex-row items-center gap-8">
              <a
                hlmBtn
                variant="outline"
                size="lg"
                class="uppercase flex items-center gap-2 transition-all duration-300 hover:bg-accent hover:text-primary cursor-pointer"
                [href]="cvService.downloadUrl()"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
                <ng-icon hlm size="20px" name="lucideDownload"></ng-icon>
              </a>

              <div class="mb-8 xl:mb-0">
                <app-socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div class="order-1 xl:order-0 mb-8 xl:mb-0">
            <div
              class="relative w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten m-auto xl:mr-0"
            >
              <img
                ngSrc="/images/profile/munir-issa.png"
                alt="munir issa"
                class="object-contain hover:scale-105 transition-transform duration-500 cursor-pointer"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private metaTags = inject(MetaTagsService);
  protected cvService = inject(CvService);

  readonly isHeroVisible = toSignal(
    timer(300).pipe(
      map(() => true),
      startWith(false),
    ),
    { initialValue: false },
  );

  readonly yearsOfExperience = computed(() => {
    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  });

  ngOnInit() {
    this.metaTags.updateMetaTags();
  }
}
