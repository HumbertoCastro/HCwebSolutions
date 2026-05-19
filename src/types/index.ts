export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  metric: string;
  accent: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
};

export type ContactFormValues = {
  plan: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  description: string;
};

export type ContactFormData = {
  name: string;
  company: string;
  phone: string;
  email: string;
  solutionType: string;
  goal: string;
  description: string;
  deadline: string;
  budget: string;
};

export type ContactBriefingValues = ContactFormData;
