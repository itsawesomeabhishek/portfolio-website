export interface Identity {
  readonly name: string;
  readonly handle: string;
  readonly logo: string;
  readonly headline: { readonly solid: string; readonly outlined: string };
  readonly heroStatus: string;
  readonly roleBanner: { readonly intro: string; readonly skills: string };
  readonly whoami: readonly string[];
  readonly terminalTitle: string;
  readonly location: string;
  readonly status: string;
  readonly bio: readonly string[];
  readonly avatar: string;
  readonly resume: string;
  readonly siteUrl: string;
  readonly description: string;
  readonly copyrightYear: number;
}

export interface StackNode {
  readonly label: string;
  readonly tech: string;
  readonly icon?: string;
}

export interface Education {
  readonly school: string;
  readonly degree: string;
  readonly start: string;
  readonly end: string;
  readonly facts: readonly string[];
}

export interface Certificate {
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly image: string;
  readonly alt: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly image: string;
  readonly alt: string;
  readonly live?: string;
  readonly github?: string;
  readonly placeholder: boolean;
}

export interface StatCard {
  readonly label: string;
  readonly value: string;
  readonly note?: string;
}

export interface Quote {
  readonly text: string;
  readonly author: string;
}

export interface Service {
  readonly title: string;
  readonly summary: string;
  readonly points: readonly string[];
}

export interface Social {
  readonly label: string;
  readonly href: string;
}

export interface ContactInfo {
  readonly email: string;
  readonly socials: readonly Social[];
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

