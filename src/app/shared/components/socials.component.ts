import { provideIcons } from "@ng-icons/core";
import { NgIcon } from "@ng-icons/core";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import {
  lucideGithub,
  lucideInstagram,
  lucideLinkedin,
  lucideTwitter,
  lucideYoutube,
} from "@ng-icons/lucide";
import { HlmIconDirective } from "@spartan-ng/ui-icon-helm";

@Component({
  selector: "app-socials",
  imports: [NgIcon, HlmIconDirective],
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
          <ng-icon hlm size="20px" [name]="item.icon"></ng-icon>
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
