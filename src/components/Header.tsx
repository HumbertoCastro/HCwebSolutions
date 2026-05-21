import { useEffect, useState } from 'react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Button, Container, IconButton } from '@mui/material';
import styled from 'styled-components';
import { palette } from '../theme';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Cases', href: '#cases' },
  { label: 'Sobre', href: '#quem-somos' },
  { label: 'Planos', href: '#planos' },
];

const HeaderShell = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  border-bottom: 1px solid
    ${(props) => (props.$scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)')};
  background: ${(props) => (props.$scrolled ? 'rgba(5, 5, 5, 0.82)' : 'rgba(5, 5, 5, 0)')};
  backdrop-filter: ${(props) => (props.$scrolled ? 'blur(18px)' : 'none')};
  transition:
    background 260ms ease,
    border-color 260ms ease,
    backdrop-filter 260ms ease,
    padding 260ms ease;
`;

const HeaderInner = styled.div<{ $scrolled: boolean }>`
  min-height: ${(props) => (props.$scrolled ? '72px' : '88px')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(18px, 3vw, 44px);
  transition: min-height 260ms ease;

  @media (max-width: 899px) {
    min-height: 74px;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${palette.text};
  text-decoration: none;
  font-size: clamp(1rem, 1.5vw, 1.22rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  white-space: nowrap;

  span {
    color: ${palette.accent};
  }
`;

const LogoIcon = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 14px 38px rgba(0, 229, 40, 0.2);

  @media (max-width: 430px) {
    width: 38px;
    height: 38px;
    border-radius: 12px;
  }
`;

const Nav = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(14px);

  @media (max-width: 899px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  color: ${palette.textMuted};
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0 15px;
  border-radius: 999px;
  transition:
    color 180ms ease,
    background-color 180ms ease;

  &:hover,
  &:focus-visible {
    color: ${palette.text};
    background: rgba(255, 255, 255, 0.07);
    outline: none;
  }
`;

const DesktopAction = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 899px) {
    display: none;
  }
`;

const MobileButton = styled(IconButton)`
  && {
    display: none;
    width: 46px;
    height: 46px;
    color: ${palette.text};
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.05);

    @media (max-width: 899px) {
      display: inline-flex;
    }
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 45;
  display: none;
  padding: 104px 24px 32px;
  background:
    radial-gradient(circle at 82% 18%, rgba(0, 229, 40, 0.14), transparent 28%),
    ${palette.background};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  pointer-events: ${(props) => (props.$open ? 'auto' : 'none')};
  transform: ${(props) => (props.$open ? 'scale(1)' : 'scale(0.98)')};
  transition:
    opacity 180ms ease,
    transform 180ms ease;

  @media (max-width: 899px) {
    display: block;
  }
`;

const MobileNav = styled.nav`
  display: grid;
  gap: 12px;
`;

const MobileLink = styled.a`
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: ${palette.text};
  text-decoration: none;
  padding: 0 18px;
  font-size: 1.22rem;
  font-weight: 760;
  letter-spacing: -0.02em;
  transition:
    color 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease;

  &:hover,
  &:focus-visible {
    color: ${palette.accent};
    border-color: rgba(0, 229, 40, 0.36);
    background: rgba(0, 229, 40, 0.08);
    outline: none;
  }
`;

type HeaderProps = {
  onContactClick: () => void;
};

export function Header({ onContactClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSectionNavigate = (href: string) => {
    setIsOpen(false);

    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContact = () => {
    setIsOpen(false);
    onContactClick();
  };

  return (
    <>
      <HeaderShell $scrolled={isScrolled}>
        <Container maxWidth="xl">
          <HeaderInner $scrolled={isScrolled}>
            <Logo
              href="#inicio"
              aria-label="HC Web Solutions - início"
              onClick={(event) => {
                event.preventDefault();
                handleSectionNavigate('#inicio');
              }}
            >
              <LogoIcon src="/icon.png" alt="" aria-hidden="true" />
              HC Web <span>Solutions</span>
            </Logo>

            <Nav aria-label="Navegação principal">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSectionNavigate(item.href);
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </Nav>

            <DesktopAction>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowOutwardRoundedIcon />}
                onClick={handleContact}
                sx={{ minHeight: 46, px: 2.7 }}
              >
                Iniciar Projeto
              </Button>
            </DesktopAction>

            <MobileButton
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
            </MobileButton>
          </HeaderInner>
        </Container>
      </HeaderShell>

      <MobileOverlay $open={isOpen} aria-hidden={!isOpen}>
        <MobileNav aria-label="Navegação mobile">
          {[...navItems, { label: 'Contato', href: '/contato' }].map((item) => (
            <MobileLink
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                if (item.href === '/contato') {
                  handleContact();
                } else {
                  handleSectionNavigate(item.href);
                }
              }}
            >
              {item.label}
              <ArrowOutwardRoundedIcon fontSize="small" />
            </MobileLink>
          ))}
        </MobileNav>
      </MobileOverlay>
    </>
  );
}
