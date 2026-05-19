import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Container, Typography } from "@mui/material";
import { type ReactNode } from "react";
import styled from "styled-components";
import { palette } from "../theme";
import { Reveal } from "./Reveal";

const Section = styled.section`
  background: #f4f6f8;
  color: ${palette.ink};
  padding: clamp(74px, 8vw, 124px) 0;
`;

const Intro = styled.div`
  max-width: 990px;
  margin: 0 auto clamp(34px, 5vw, 58px);
  text-align: center;
`;

const Eyebrow = styled.p`
  margin: 0 0 16px;
  color: ${palette.accentDark};
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled(Typography)`
  && {
    font-size: clamp(2.45rem, 5.2vw, 5.8rem);
    line-height: 0.98;
    color: ${palette.ink};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;

  > div {
    display: flex;
    min-width: 0;
  }

  @media (max-width: 899px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  width: 100%;
  height: 100%;
  min-height: 236px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(7, 10, 18, 0.1);
  border-radius: 22px;
  padding: clamp(22px, 3vw, 32px);
  background: rgba(255, 255, 255, 0.76);
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.34);
    box-shadow: 0 24px 60px rgba(7, 10, 18, 0.08);
  }

  &:hover svg {
    transform: translateY(-2px) rotate(-4deg);
  }
`;

const IconCircle = styled.div`
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: ${palette.ink};
  background: #eef1f4;
  margin-bottom: clamp(24px, 4vw, 40px);

  svg {
    font-size: 30px;
    transition: transform 260ms ease;
  }
`;

const Highlight = styled.span`
  color: ${palette.accentDark};
  font-weight: 850;
`;

type Differential = {
  icon: ReactNode;
  title: string;
  text: ReactNode;
};

const differentials = [
  {
    icon: <CodeOutlinedIcon />,
    title: "Equipe técnica e experiente",
    text: (
      <>
        Desenvolvedores web com <Highlight>anos de experiência</Highlight> em projetos de
        diversos portes e segmentos. <Highlight>Soluções técnicas</Highlight> e complexas para
        grandes e pequenos negócios.
      </>
    ),
  },
  {
    icon: <DevicesOutlinedIcon />,
    title: "Design responsivo e moderno",
    text: (
      <>
        Interfaces que funcionam bem em <Highlight>mobile</Highlight>, tablet e{" "}
        <Highlight>desktop</Highlight> sem perder presença.
      </>
    ),
  },
  {
    icon: <CloudDoneOutlinedIcon />,
    title: "Deploy, domínio e infraestrutura",
    text: (
      <>
        Publicação, <Highlight>DNS</Highlight>, <Highlight>cloud</Highlight> e ambiente
        configurados com cuidado técnico.
      </>
    ),
  },
  {
    icon: <SecurityOutlinedIcon />,
    title: "Segurança e boas práticas",
    text: (
      <>
        Cuidados com <Highlight>autenticação</Highlight>, validações, headers, dados e{" "}
        <Highlight>manutenção</Highlight>.
      </>
    ),
  },
  {
    icon: <SupportAgentOutlinedIcon />,
    title: "Suporte e evolução contínua",
    text: (
      <>
        Acompanhamento <Highlight>após entrega</Highlight> para evoluir a solução com
        tranquilidade.
      </>
    ),
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    title: "Soluções preparadas para crescer",
    text: (
      <>
        Bases técnicas que acompanham o <Highlight>crescimento</Highlight> da operação do negócio.
      </>
    ),
  },
] satisfies Differential[];

export function DifferentialsSection() {
  return (
    <Section aria-labelledby="diferenciais-title">
      <Container maxWidth="lg">
        <Reveal>
          <Intro>
            <Eyebrow>
              <AutoAwesomeIcon
                sx={{ fontSize: 15, verticalAlign: "-2px", mr: 0.8 }}
              />
              Nossos diferenciais
            </Eyebrow>
            <Title id="diferenciais-title" variant="h2">
              Tecnologia, design e operação no mesmo lugar
            </Title>
          </Intro>
        </Reveal>

        <Grid>
          {differentials.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card>
                <IconCircle>{item.icon}</IconCircle>
                <Typography
                  variant="h3"
                  fontSize="1.25rem"
                  mb={1.2}
                  color={palette.ink}
                >
                  {item.title}
                </Typography>
                <Typography color="#4d5868" lineHeight={1.65}>
                  {item.text}
                </Typography>
              </Card>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
