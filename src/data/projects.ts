import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Landing Page de Captação',
    description:
      'Página focada em conversão, integração com WhatsApp, formulário de contato e métricas de campanha.',
    tags: ['Landing Page', 'WhatsApp', 'Analytics', 'Conversão'],
    metric: '+38% leads',
    accent: 'Campanha',
  },
  {
    title: 'Site Institucional Profissional',
    description:
      'Site responsivo para apresentação de serviços, fortalecimento de marca e geração de contatos qualificados.',
    tags: ['Institucional', 'SEO', 'Responsivo', 'Contato'],
    metric: 'SEO ready',
    accent: 'Marca',
  },
  {
    title: 'Sistema Web de Cadastro',
    description:
      'Aplicação com autenticação, cadastro de clientes, painel administrativo e controle de informações.',
    tags: ['Sistema Web', 'Dashboard', 'Auth', 'Banco de Dados'],
    metric: 'Auth + DB',
    accent: 'Operacao',
  },
  {
    title: 'Portal Sob Medida',
    description:
      'Solução web personalizada com integrações, área logada, gestão de dados e infraestrutura escalável.',
    tags: ['Full Stack', 'API', 'Cloud', 'Escalável'],
    metric: 'Cloud',
    accent: 'Escala',
  },
];
