import type { PricingPlan } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Landing Page Profissional',
    price: 'A partir de R$ 2.500',
    description:
      'Ideal para campanhas, prestadores de serviço, negócios locais e empresas que precisam captar contatos com uma página rápida, bonita e confiável.',
    features: [
      'Design responsivo',
      'Desenvolvimento em React',
      'Deploy e publicação',
      'Configuração básica de domínio/DNS',
      'Página de contato',
      'Integração com WhatsApp',
      'Integração com Google Analytics',
      'Boas práticas de segurança',
      'Suporte inicial pós-entrega',
      'Suporte contínuo disponível em plano mensal',
    ],
    cta: 'Quero uma landing page',
  },
  {
    name: 'Solução Web Especializada',
    price: 'A partir de R$ 6.000',
    badge: 'Mais indicado',
    highlighted: true,
    description:
      'Para negócios que precisam de uma aplicação web específica para organizar processos, captar dados, automatizar tarefas ou atender clientes.',
    features: [
      'Sistema de cadastro de clientes',
      'Área administrativa',
      'Formulários inteligentes',
      'Upload de arquivos',
      'Controle de status',
      'Gestão de leads ou pedidos',
      'Integração com WhatsApp, e-mail, planilhas, CRMs ou APIs',
      'Autenticação de usuários',
      'Banco de dados',
      'Dashboard simples',
      'Relatórios básicos',
      'Deploy e infraestrutura',
    ],
    cta: 'Quero uma solução web',
  },
  {
    name: 'Sistema Web Completo',
    price: 'Sob orçamento',
    description:
      'Para operações que exigem um sistema robusto, escalável e construído sob medida para regras de negócio específicas.',
    features: [
      'Arquitetura full stack',
      'Painel administrativo avançado',
      'Múltiplos perfis de usuário',
      'Controle de permissões',
      'APIs próprias',
      'Integrações externas',
      'Banco de dados estruturado',
      'Armazenamento de arquivos',
      'Segurança e LGPD',
      'Logs e auditoria',
      'Deploy em cloud',
      'Monitoramento',
      'Manutenção evolutiva',
    ],
    cta: 'Solicitar diagnóstico',
  },
];
