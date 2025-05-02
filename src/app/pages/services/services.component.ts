import { ChangeDetectionStrategy, Component } from "@angular/core";
import { lucideArrowDownRight } from "@ng-icons/lucide";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";

@Component({
  selector: "app-services",
  imports: [HlmIconComponent],
  providers: [provideIcons({ lucideArrowDownRight })],
  template: `
    <section class="min-h-[80dvh] flex flex-col justify-center py-12 xl:pt-0">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[60px] ">
          @for (service of services; track service.title) {
            <div class="flex-1 flex flex-col justify-center gap-6 group">
              <div class="w-full flex justify-between items-center">
                <div
                  class="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500"
                >
                  {{ service.num }}
                </div>
                <a
                  [href]="service.href"
                  class="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                >
                  <hlm-icon
                    name="lucideArrowDownRight"
                    class="w-8 h-8 text-primary"
                  ></hlm-icon>
                </a>
              </div>
              <h2
                class="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500"
              >
                {{ service.title }}
              </h2>
              <p class="text-white/60 ">{{ service.description }}</p>
              <div class="border-b border-white/20 w-full"></div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ServicesComponent {
  services = [
    {
      num: "01",
      title: "Web Development",
      description:
        "Crafting beautiful and functional websites that are easy to use and navigate.",
      href: "/services/web-development",
    },
    {
      num: "02",
      title: "Mobile Applications",
      description:
        "Building mobile apps that are fast, secure, and easy to use.",
      href: "/services/mobile-applications",
    },
    {
      num: "03",
      title: "UI/UX Design",
      description:
        "Creating user-friendly interfaces that are easy to navigate and use.",
      href: "/services/ui-ux-design",
    },
    {
      num: "04",
      title: "Technical Writing",
      description:
        "Creating technical documentation that is clear, concise, and easy to understand.",
      href: "/services/technical-writing",
    },
    {
      num: "05",
      title: "E-Commerce Solutions",
      description:
        "Building e-commerce websites that are secure, fast, and easy to use.",
      href: "/services/e-commerce-solutions",
    },
  ];
}
