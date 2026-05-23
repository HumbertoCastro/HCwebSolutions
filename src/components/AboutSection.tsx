import { useEffect, useRef } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Container, Typography } from "@mui/material";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import styled from "styled-components";
import { motionTokens } from "../motion";
import { palette } from "../theme";
import { Reveal } from "./Reveal";

const Section = styled.section`
  background: #f4f6f8;
  color: ${palette.ink};
  padding: clamp(76px, 9vw, 136px) 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(320px, 0.58fr);
  gap: clamp(32px, 6vw, 86px);
  align-items: center;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(Typography)`
  && {
    max-width: 920px;
    font-size: clamp(2.5rem, 5.7vw, 6.1rem);
    line-height: 0.96;
    color: ${palette.ink};

    > span {
      color: #aeb6c3;
    }
  }
`;

const TitleWord = styled(motion.span)`
  display: inline-flex;
  white-space: pre;
`;

const TitleLetter = styled(motion.span)`
  display: inline-block;
`;

const Copy = styled(Typography)`
  && {
    max-width: 780px;
    color: #465160;
    font-size: clamp(1rem, 1.4vw, 1.16rem);
    line-height: 1.85;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 820px;
  margin-top: 32px;

  @media (max-width: 699px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  min-height: 132px;
  border-radius: 20px;
  border: 1px solid rgba(7, 10, 18, 0.11);
  background: rgba(255, 255, 255, 0.72);
  padding: 20px;
  box-shadow: 0 18px 48px rgba(7, 10, 18, 0.07);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent, rgba(8, 203, 0, 0.08), transparent);
    transform: translateX(-100%);
    transition: transform 720ms ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const StatValue = styled.strong`
  display: block;
  color: ${palette.ink};
  font-size: clamp(1.8rem, 3vw, 2.55rem);
  line-height: 1;
  font-weight: 920;
  letter-spacing: 0;
  margin-bottom: 10px;
`;

const StatLabel = styled.span`
  display: block;
  color: #556170;
  font-size: 0.95rem;
  font-weight: 720;
  line-height: 1.35;
`;

const ProfileCard = styled.aside`
  border-radius: 28px;
  border: 1px solid rgba(7, 10, 18, 0.12);
  background:
    radial-gradient(circle at 50% 0%, rgba(8, 203, 0, 0.12), transparent 36%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 28%),
    ${palette.ink};
  color: ${palette.text};
  padding: clamp(22px, 3vw, 34px);
  box-shadow: 0 24px 80px rgba(7, 10, 18, 0.16);
  transition:
    transform 320ms ease,
    border-color 320ms ease,
    box-shadow 320ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.34);
    box-shadow: 0 30px 90px rgba(7, 10, 18, 0.22);
  }
`;

const Avatar = styled.figure`
  position: relative;
  overflow: hidden;
  height: clamp(340px, 37vw, 470px);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    radial-gradient(circle at 50% 28%, rgba(8, 203, 0, 0.22), transparent 34%),
    #050505;
  margin-bottom: 24px;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 12px;
    z-index: 1;
    border: 1px solid rgba(8, 203, 0, 0.16);
    border-radius: 18px;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    z-index: 1;
    height: 36%;
    background: linear-gradient(180deg, transparent, rgba(5, 5, 5, 0.78));
    pointer-events: none;
  }

  @media (max-width: 899px) {
    height: min(104vw, 520px);
  }
`;

const ProfilePhoto = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transform: scale(1.015);
  filter: saturate(1.04) contrast(1.03);
`;

const CredentialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 14px;

  li {
    display: grid;
    grid-template-columns: 22px 1fr;
    gap: 10px;
    align-items: start;
    color: ${palette.textMuted};
    line-height: 1.45;
  }

  svg {
    color: ${palette.accent};
    font-size: 20px;
    margin-top: 1px;
  }
`;

type AnimatedKpiProps = {
  prefix: string;
  target: number;
  suffix: string;
  label: string;
  delay: number;
};

function AnimatedKpi({ prefix, target, suffix, label, delay }: AnimatedKpiProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const value = useMotionValue(0);
  const spring = useSpring(value, { stiffness: 70, damping: 18, mass: 0.7 });
  const display = useTransform(spring, (latest) => {
    const formatted = Math.round(latest).toLocaleString("pt-BR");
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (prefersReducedMotion || isInView) {
      value.set(target);
    }
  }, [isInView, prefersReducedMotion, target, value]);

  return (
    <StatCard
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{
        duration: motionTokens.duration.slow,
        delay,
        ease: motionTokens.softEase,
      }}
    >
      <StatValue>
        <motion.span>{display}</motion.span>
      </StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
}

type AnimatedTitleTextProps = {
  text: string;
  accent?: boolean;
  delay?: number;
};

function AnimatedTitleText({ text, accent = false, delay = 0 }: AnimatedTitleTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <span style={{ color: accent ? palette.accent : undefined }}>{text}</span>;
  }

  return (
    <span style={{ color: accent ? palette.accent : undefined }}>
      {words.map((word, wordIndex) => (
        <TitleWord key={`${word}-${wordIndex}`}>
          {word.split("").map((letter, letterIndex) => (
            <TitleLetter
              key={`${letter}-${letterIndex}`}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: 0.46,
                delay: delay + wordIndex * 0.065 + letterIndex * 0.018,
                ease: motionTokens.softEase,
              }}
            >
              {letter}
            </TitleLetter>
          ))}
          {wordIndex < words.length - 1 ? "\u00A0" : ""}
        </TitleWord>
      ))}
    </span>
  );
}

export function AboutSection() {
  const credentials = [
    "+6 anos de experiência",
    "Desenvolvedor full stack sênior",
    "React, TypeScript, Node.js, cloud e DevOps",
    "Soluções web completas",
    "Foco em pequenos negócios e operações digitais",
  ];

  const stats = [
    {
      prefix: "+",
      target: 20,
      suffix: "",
      label: "projetos web entregues entre sites, landing pages e sistemas",
    },
    {
      prefix: "+",
      target: 65,
      suffix: " mil",
      label: "clientes e usuários passando por soluções desenvolvidas",
    },
    {
      prefix: "+",
      target: 6,
      suffix: " anos",
      label: "de experiência no mercado de desenvolvimento web",
    },
  ];

  return (
    <Section id="quem-somos" aria-labelledby="about-title">
      <Container maxWidth="xl">
        <Grid>
          <Reveal>
            <div>
              <Title id="about-title" variant="h2" mb={3}>
                <AnimatedTitleText text="Quem está por trás" />
                {" "}
                <AnimatedTitleText text="da" delay={0.28} />
                {" "}
                <AnimatedTitleText text="HC Web Solutions" accent delay={0.34} />
              </Title>
              <Copy mb={2.2}>
                A HC Web Solutions é liderada por Humberto Castro, desenvolvedor
                full stack sênior com mais de 6 anos de experiência criando
                landing pages, sites profissionais, integrações, infraestrutura
                e sistemas sob medida.
              </Copy>
              <Copy>
                A proposta é unir clareza comercial, design e desenvolvimento
                técnico para tirar ideias do improviso e transformar presença
                digital em um canal mais confiável de captação, atendimento e
                operação.
              </Copy>
              <StatsGrid aria-label="Números da HC Web Solutions">
                {stats.map((stat, index) => (
                  <AnimatedKpi
                    key={stat.label}
                    prefix={stat.prefix}
                    target={stat.target}
                    suffix={stat.suffix}
                    label={stat.label}
                    delay={index * 0.08}
                  />
                ))}
              </StatsGrid>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ProfileCard>
              <Avatar>
                <ProfilePhoto
                  src="/about/humberto-hc-portrait.png"
                  alt="Retrato de Humberto Castro, fundador da HC Web Solutions"
                  loading="lazy"
                />
              </Avatar>
              <Typography
                color={palette.accent}
                fontWeight={850}
                fontSize="0.82rem"
                mb={1}
              >
                Humberto Castro
              </Typography>
              <Typography
                variant="h3"
                fontSize="clamp(1.6rem, 3vw, 2.35rem)"
                lineHeight={1.1}
              >
                Desenvolvedor full stack sênior
              </Typography>
              <CredentialList>
                {credentials.map((item) => (
                  <li key={item}>
                    <CheckCircleOutlineIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </CredentialList>
            </ProfileCard>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
