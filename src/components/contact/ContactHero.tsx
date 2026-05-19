import { Typography } from '@mui/material';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import { palette } from '../../theme';

const Hero = styled(motion.div)`
  margin-bottom: clamp(20px, 3.4vw, 34px);
`;

const Breadcrumb = styled.a`
  display: inline-flex;
  width: fit-content;
  color: ${palette.textMuted};
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 760;
  margin-bottom: 18px;
  transition: color 200ms ease;

  &:hover,
  &:focus-visible {
    color: ${palette.accent};
    outline: none;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  width: fit-content;
  min-height: 38px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid rgba(8, 203, 0, 0.32);
  background: rgba(8, 203, 0, 0.08);
  color: ${palette.text};
  padding: 7px 13px;
  font-size: 0.78rem;
  font-weight: 820;
`;

const Title = styled(Typography)`
  && {
    max-width: 820px;
    font-size: clamp(2.15rem, 4vw, 4.15rem);
    line-height: 1;
    margin-top: 18px;
    text-wrap: balance;
  }
`;

type ContactHeroProps = {
  variants: Variants;
};

export function ContactHero({ variants }: ContactHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Hero variants={variants} initial={prefersReducedMotion ? false : 'hidden'} animate="visible">
      <motion.div variants={variants}>
        <Breadcrumb href="/">Início / Contato</Breadcrumb>
      </motion.div>
      <motion.div variants={variants}>
        <Badge>Orçamento personalizado • Atendimento direto • Solução sob medida</Badge>
      </motion.div>
      <motion.div variants={variants}>
        <Title variant="h1">Vamos construir algo profissional para o seu negócio?</Title>
      </motion.div>
      <motion.div variants={variants}>
        <Typography color={palette.textMuted} fontSize="clamp(0.98rem, 1.15vw, 1.1rem)" lineHeight={1.65} mt={1.8}>
          Conte sua ideia e receba uma análise inicial sobre o melhor caminho para criar sua
          landing page, site ou sistema web.
        </Typography>
      </motion.div>
      <motion.div variants={variants}>
        <Typography color={palette.textMuted} lineHeight={1.65} mt={1.4}>
          Você não precisa ter tudo definido. O objetivo é entender seu momento e indicar uma
          solução sob medida.
        </Typography>
      </motion.div>
    </Hero>
  );
}
