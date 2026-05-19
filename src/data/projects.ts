import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'Clínica local com agenda mais cheia',
    segment: 'Clínica e saúde',
    problem:
      'O negócio dependia de indicações e redes sociais, mas não tinha uma página clara para explicar serviços e converter visitantes em contatos.',
    solution:
      'Landing page com proposta direta, botões de WhatsApp, prova de confiança, perguntas frequentes e estrutura pronta para campanhas.',
    result: '+38% pedidos de contato',
    tags: ['Landing Page', 'WhatsApp', 'Campanhas', 'Conversão'],
    accent: 'Captação',
  },
  {
    title: 'Prestador de serviço com presença profissional',
    segment: 'Serviços especializados',
    problem:
      'O atendimento era bom, mas a apresentação digital não transmitia o mesmo nível de confiança antes da conversa comercial.',
    solution:
      'Site institucional enxuto com serviços, diferenciais, depoimentos simulados, chamada para orçamento e visual responsivo.',
    result: 'Mais confiança no primeiro contato',
    tags: ['Institucional', 'Autoridade', 'SEO', 'Contato'],
    accent: 'Autoridade',
  },
  {
    title: 'Negócio local recebendo pedidos com menos atrito',
    segment: 'Comércio e atendimento',
    problem:
      'Clientes chegavam pelo Instagram, mas as informações ficavam espalhadas e o pedido de orçamento demorava para acontecer.',
    solution:
      'Página de captação com catálogo resumido, benefícios, CTA fixo no mobile e mensagem de WhatsApp mais organizada.',
    result: 'Briefings mais completos',
    tags: ['Captação', 'Mobile', 'Pedidos', 'WhatsApp'],
    accent: 'Pedidos',
  },
  {
    title: 'Operação interna saindo da planilha',
    segment: 'Processos internos',
    problem:
      'A equipe controlava clientes e status manualmente, gerando retrabalho, perda de histórico e dificuldade para acompanhar demandas.',
    solution:
      'Sistema web com login, cadastro, painel administrativo, filtros por status e base preparada para evoluções futuras.',
    result: 'Processo mais organizado',
    tags: ['Sistema Web', 'Dashboard', 'Login', 'Processos'],
    accent: 'Operação',
  },
];
