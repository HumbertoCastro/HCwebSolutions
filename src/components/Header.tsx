import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import styled from 'styled-components';
import { palette } from '../theme';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cases', href: '#projetos' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '/contato' },
];

const HeaderShell = styled.header<{ $scrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid
    ${(props) => (props.$scrolled ? 'rgba(255, 255, 255, 0.14)' : 'rgba(255, 255, 255, 0.08)')};
  background: ${(props) =>
    props.$scrolled ? 'rgba(5, 7, 13, 0.92)' : 'rgba(5, 7, 13, 0.72)'};
  backdrop-filter: blur(22px);
  box-shadow: ${(props) => (props.$scrolled ? '0 18px 60px rgba(0, 0, 0, 0.22)' : 'none')};
  transition:
    background 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
`;

const HeaderInner = styled.div`
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(22px, 3vw, 46px);

  @media (max-width: 1099px) {
    min-height: 72px;
  }
`;

const Logo = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: ${palette.text};
  text-decoration: none;
  font-size: clamp(1.08rem, 1.7vw, 1.34rem);
  font-weight: 900;
  letter-spacing: 0;
  white-space: nowrap;

  span {
    color: ${palette.accent};
  }

  @media (max-width: 430px) {
    font-size: 1rem;
  }
`;

const LogoIcon = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  object-fit: cover;
  box-shadow: 0 14px 36px rgba(8, 203, 0, 0.2);

  @media (max-width: 430px) {
    width: 38px;
    height: 38px;
    border-radius: 12px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);

  @media (max-width: 1099px) {
    display: none;
  }
`;

const NavLink = styled.a`
  position: relative;
  color: ${palette.textMuted};
  text-decoration: none;
  font-size: 0.94rem;
  font-weight: 720;
  padding: 10px 16px;
  border-radius: 999px;
  transition:
    color 180ms ease,
    background 180ms ease;

  &::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 6px;
    height: 2px;
    border-radius: 999px;
    background: ${palette.accent};
    transform: scaleX(0);
    transform-origin: center;
    opacity: 0;
    transition:
      transform 220ms ease,
      opacity 220ms ease;
  }

  &:hover,
  &:focus-visible {
    color: ${palette.text};
    background: rgba(255, 255, 255, 0.07);
    outline: none;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
    transform: scaleX(1);
  }
`;

const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1099px) {
    display: none;
  }
`;

const MobileButton = styled(IconButton)`
  && {
    display: none;
    width: 48px;
    height: 48px;
    color: ${palette.text};
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.04);

    @media (max-width: 1099px) {
      display: inline-flex;
    }
  }
`;

const DrawerPanel = styled(Box)`
  width: min(86vw, 360px);
  min-height: 100%;
  background:
    radial-gradient(circle at top right, rgba(8, 203, 0, 0.14), transparent 34%),
    ${palette.background};
  color: ${palette.text};
  padding: 24px 20px;
`;

type HeaderProps = {
  onContactClick: () => void;
};

export function Header({ onContactClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    if (href === '/contato') {
      onContactClick();
      return;
    }

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HeaderShell $scrolled={isScrolled}>
      <Container maxWidth="xl">
        <HeaderInner>
          <Logo href="#inicio" aria-label="HC Web Solutions - início">
            <LogoIcon src="/icon.png" alt="" aria-hidden="true" />
            HC Web <span>Solutions</span>
          </Logo>

          <Nav aria-label="Navegação principal">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  if (item.href === '/contato') {
                    event.preventDefault();
                    onContactClick();
                  }
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </Nav>

          <DesktopActions>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={onContactClick}
              sx={{ minHeight: 52, px: 2.8 }}
            >
              Começar briefing
            </Button>
          </DesktopActions>

          <MobileButton aria-label="Abrir menu" onClick={() => setIsOpen(true)}>
            <MenuIcon />
          </MobileButton>
        </HeaderInner>
      </Container>

      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerPanel role="presentation">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
            <Logo href="#inicio" onClick={() => setIsOpen(false)}>
              <LogoIcon src="/icon.png" alt="" aria-hidden="true" />
              HC Web <span>Solutions</span>
            </Logo>
            <IconButton aria-label="Fechar menu" onClick={() => setIsOpen(false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </Stack>

          <List disablePadding>
            {navItems.map((item) => (
              <ListItemButton
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  minHeight: 52,
                  color: palette.text,
                  border: '1px solid rgba(255,255,255,0.08)',
                  bgcolor: 'rgba(255,255,255,0.035)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(8,203,0,0.35)' },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            onClick={() => {
              setIsOpen(false);
              onContactClick();
            }}
            sx={{ mt: 3 }}
          >
            Começar briefing
          </Button>
        </DrawerPanel>
      </Drawer>
    </HeaderShell>
  );
}
