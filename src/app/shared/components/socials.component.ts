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
        <a [href]="item.url" target="_blank" [class]="iconStyles()">
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
      url: "",
    },
    {
      name: "Linkedin",
      icon: "lucideLinkedin",
      url: "",
    },
    {
      name: "Youtube",
      icon: "lucideYoutube",
      url: "",
    },
    {
      name: "Twitter",
      icon: "lucideTwitter",
      url: "",
    },
    {
      name: "Instagram",
      icon: "lucideInstagram",
      url: "",
    },
  ];
}
