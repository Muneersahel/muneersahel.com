import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  lucideGithub,
  lucideInstagram,
  lucideLinkedin,
  lucideTwitter,
  lucideYoutube,
} from "@ng-icons/lucide";
import { HlmIconComponent, provideIcons } from "@spartan-ng/ui-icon-helm";

@Component({
  selector: "app-socials",
  imports: [HlmIconComponent],
  providers: [
    provideIcons({
      lucideGithub,
      lucideLinkedin,
      lucideYoutube,
      lucideTwitter,
      lucideInstagram,
    }),
  ],
  template: `
    <div [class]="containerStyles()">
      @for (item of socials; track item.name) {
        <a
          [href]="item.url"
          target="_blank"
          [class]="iconStyles()"
          [attr.aria-label]="item.name"
        >
          <hlm-icon [name]="item.icon" class="h-5 w-5"></hlm-icon>
        </a>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsComponent {
  containerStyles = input("flex items center gap-4");
  iconStyles = input("text-accent hover:text-accent-dark");

  socials = [
    {
      name: "Github",
      icon: "lucideGithub",
      url: "https://github.com/Muneersahel",
    },
    {
      name: "Linkedin",
      icon: "lucideLinkedin",
      url: "https://linkedin.com/in/munir-said-847347184",
    },
    {
      name: "Youtube",
      icon: "lucideYoutube",
      url: "https://www.youtube.com/@muneersahel",
    },
    {
      name: "Twitter",
      icon: "lucideTwitter",
      url: "https://x.com/Muneersahel",
    },
    {
      name: "Instagram",
      icon: "lucideInstagram",
      url: "https://instagram.com/muneersahel",
    },
  ];
}
