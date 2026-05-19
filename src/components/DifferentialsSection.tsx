import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { Container, Typography } from '@mui/material';
import styled from 'styled-components';
import { Reveal } from './Reveal';
import { palette } from '../theme';

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

  @media (max-width: 899px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  min-height: 244px;
  border: 1px solid rgba(7, 10, 18, 0.1);
  border-radius: 22px;
  padding: clamp(22px, 3vw, 32px);
  background: rgba(255, 255, 255, 0.72);
  transition:
    transform 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(8, 203, 0, 0.34);
    box-shadow: 0 24px 60px rgba(7, 10, 18, 0.08);
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
  margin-bottom: clamp(28px, 4vw, 46px);

  svg {
    font-size: 30px;
  }
`;

const differentials = [
  {
    icon: <CodeOutlinedIcon />,
    title: 'Desenvolvimento Full Stack Sênior',
    text: 'Arquitetura, frontend, backend e integrações pensados para produção.',
  },
  {
    icon: <DevicesOutlinedIcon />,
    title: 'Design responsivo e moderno',
    text: 'Interfaces que funcionam bem em mobile, tablet e desktop sem perder presença.',
  },
  {
    icon: <CloudDoneOutlinedIcon />,
    title: 'Deploy, domínio e infraestrutura',
    text: 'Publicação, DNS, cloud e ambiente configurados com cuidado técnico.',
  },
  {
    icon: <SecurityOutlinedIcon />,
    title: 'Segurança e boas práticas',
    text: 'Cuidados com autenticação, validações, headers, dados e manutenção.',
  },
  {
    icon: <SupportAgentOutlinedIcon />,
    title: 'Suporte e manutenção contínua',
    text: 'Acompanhamento após entrega para evoluir a solução com tranquilidade.',
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    title: 'Soluções escaláveis',
    text: 'Bases técnicas preparadas para crescer junto com a operação do negócio.',
  },
];

export function DifferentialsSection() {
  return (
    <Section aria-labelledby="diferenciais-title">
      <Container maxWidth="lg">
        <Reveal>
          <Intro>
            <Eyebrow>
              <AutoAwesomeIcon sx={{ fontSize: 15, verticalAlign: '-2px', mr: 0.8 }} />
              boutique técnica web
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
                <Typography variant="h3" fontSize="1.25rem" mb={1.2} color={palette.ink}>
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
