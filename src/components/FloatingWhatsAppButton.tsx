import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import styled from 'styled-components';
import { palette } from '../theme';

const WHATSAPP_NUMBER = '5531975863351';
const WHATSAPP_MESSAGE = 'Ola, Humberto! Vamos construir junto? Vim pelo site da HC Web Solutions.';

const FloatingLink = styled.a`
  position: fixed;
  right: clamp(18px, 3vw, 32px);
  bottom: clamp(18px, 3vw, 32px);
  z-index: 60;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  color: ${palette.ink};
  background: ${palette.accent};
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    0 18px 44px rgba(8, 203, 0, 0.28),
    0 0 0 8px rgba(8, 203, 0, 0.1);
  text-decoration: none;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-3px) scale(1.04);
    background: #12e20a;
    box-shadow:
      0 22px 58px rgba(8, 203, 0, 0.34),
      0 0 0 10px rgba(8, 203, 0, 0.12);
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${palette.text};
    outline-offset: 4px;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 599px) {
    right: 16px;
    bottom: 16px;
    width: 54px;
    height: 54px;

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const Bubble = styled.span`
  position: absolute;
  right: calc(100% + 14px);
  bottom: 50%;
  width: max-content;
  max-width: min(280px, calc(100vw - 104px));
  padding: 12px 14px;
  border-radius: 16px;
  color: ${palette.text};
  background: rgba(16, 22, 32, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.13);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.28);
  font-size: 0.92rem;
  font-weight: 780;
  line-height: 1.25;
  opacity: 0;
  pointer-events: none;
  transform: translate(8px, 50%) scale(0.96);
  transform-origin: right center;
  transition:
    opacity 180ms ease,
    transform 180ms ease;

  &::after {
    content: '';
    position: absolute;
    right: -6px;
    bottom: calc(50% - 6px);
    width: 12px;
    height: 12px;
    background: inherit;
    border-right: 1px solid rgba(255, 255, 255, 0.13);
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
    transform: rotate(-45deg);
  }

  ${FloatingLink}:hover &,
  ${FloatingLink}:focus-visible & {
    opacity: 1;
    transform: translate(0, 50%) scale(1);
  }

  @media (max-width: 420px) {
    max-width: calc(100vw - 96px);
    font-size: 0.84rem;
  }
`;

export function FloatingWhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <FloatingLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
    >
      <Bubble>Vamos construir junto! Me chame no WhatsApp</Bubble>
      <WhatsAppIcon aria-hidden="true" />
    </FloatingLink>
  );
}
