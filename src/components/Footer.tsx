import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../theme';
import type { NavItem } from '../types';

const PHONE_PLACEHOLDER = '+55 (00) 00000-0000';
const EMAIL_PLACEHOLDER = 'contato@hcwebsolutions.com.br';

const footerLinks: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '/contato' },
];

const FooterShell = styled.footer`
  border-top: 1px solid ${palette.border};
  background: ${palette.ink};
  color: ${palette.text};
  padding: clamp(54px, 7vw, 92px) 0 34px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.55fr) minmax(240px, 0.55fr);
  gap: 34px;
  align-items: start;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: ${palette.text};
  text-decoration: none;
  font-size: clamp(2.1rem, 4vw, 3.35rem);
  font-weight: 900;
  letter-spacing: 0;
  margin-bottom: 18px;

  span {
    color: ${palette.textSoft};
  }
`;

const LogoIcon = styled.img`
  width: clamp(48px, 5vw, 64px);
  height: clamp(48px, 5vw, 64px);
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 18px 44px rgba(8, 203, 0, 0.18);
`;

const LinkList = styled.nav`
  display: grid;
  gap: 12px;
`;

const FooterLink = styled.a`
  color: ${palette.textMuted};
  text-decoration: none;
  width: fit-content;
  transition: color 160ms ease;

  &:hover,
  &:focus-visible {
    color: ${palette.accent};
    outline: none;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: clamp(46px, 6vw, 78px);
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
  color: ${palette.textSoft};
  font-size: 0.9rem;
`;

export function Footer() {
  return (
    <FooterShell>
      <Container maxWidth="xl">
        <FooterGrid>
          <div>
            <Logo href="#inicio">
              <LogoIcon src="/icon.png" alt="" aria-hidden="true" />
              HC Web&nbsp;<span>Solutions.</span>
            </Logo>
            <Typography color={palette.textMuted} maxWidth={620} lineHeight={1.75}>
              Desenvolvimento web profissional para negócios que querem crescer com tecnologia,
              design e segurança.
            </Typography>
          </div>

          <div>
            <Typography color={palette.text} fontWeight={850} mb={2}>
              Navegação
            </Typography>
            <LinkList aria-label="Links do rodapé">
              {footerLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label} <ArrowForwardIcon sx={{ fontSize: 14, verticalAlign: '-2px' }} />
                </FooterLink>
              ))}
            </LinkList>
          </div>

          <div>
            <Typography color={palette.text} fontWeight={850} mb={2}>
              Contato
            </Typography>
            <Typography color={palette.textMuted} mb={1}>
              Telefone: {PHONE_PLACEHOLDER}
            </Typography>
            <Typography color={palette.textMuted}>E-mail: {EMAIL_PLACEHOLDER}</Typography>
          </div>
        </FooterGrid>

        <Bottom>
          <span>© 2026 HC Web Solutions. Todos os direitos reservados.</span>
          <span>
            Made by Humberto Castro — Desenvolvedor Full Stack Sênior com mais de 5 anos de
            experiência no mercado.
          </span>
        </Bottom>
      </Container>
    </FooterShell>
  );
}
