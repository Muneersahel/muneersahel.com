import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lucideArrowDownRight } from '@ng-icons/lucide';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { BlogService } from './data';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, HlmIconComponent, RouterLink],
  providers: [provideIcons({ lucideArrowDownRight })],
  template: `
    <section class="min-h-[80dvh] flex flex-col justify-center py-12 xl:pt-0">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
          @for (blog of blogs$ | async; track blog.title) {
            <div class="flex-1 flex flex-col justify-center gap-6 group">
              <div class="w-full flex justify-between items-center">
                <div
                  class="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500"
                >
                  {{ blog.num }}
                </div>
                <a
                  [routerLink]="['/blogs', blog.slug]"
                  class="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                >
                  <hlm-icon
                    name="lucideArrowDownRight"
                    class="w-8 h-8 text-primary"
                  ></hlm-icon>
                </a>
              </div>
              <h2
                class="text-4xl font-bold text-white group-hover:text-accent transition-all duration-500"
              >
                {{ blog.title }}
              </h2>
              <p class="text-white/60 ">{{ blog.brief }}</p>
              <div class="border-b border-white/20 w-full"></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogsComponent {
  private _blogService = inject(BlogService);

  blogs$ = this._blogService.getBlogs();
}
