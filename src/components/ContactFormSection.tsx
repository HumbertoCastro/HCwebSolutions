import { FormEvent, useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import { pricingPlans } from '../data/pricingPlans';
import { Reveal } from './Reveal';
import { palette } from '../theme';
import type { ContactFormValues } from '../types';

const WHATSAPP_NUMBER = '55SEUNUMEROAQUI';

const Section = styled.section`
  padding: clamp(76px, 9vw, 132px) 0;
  background: ${palette.background};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(340px, 0.78fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: start;

  @media (max-width: 899px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(Typography)`
  && {
    font-size: clamp(2.45rem, 5.5vw, 5.8rem);
    line-height: 0.96;
  }
`;

const ContactAside = styled.div`
  position: sticky;
  top: 112px;

  @media (max-width: 899px) {
    position: static;
  }
`;

const FormPanel = styled.form`
  border-radius: 28px;
  border: 1px solid ${palette.border};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.035));
  padding: clamp(20px, 3vw, 34px);
  transition:
    border-color 320ms ease,
    box-shadow 320ms ease;

  &:focus-within {
    border-color: rgba(8, 203, 0, 0.34);
    box-shadow: 0 24px 90px rgba(8, 203, 0, 0.08);
  }
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
  }
`;

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    minHeight: 56,
    color: palette.text,
    bgcolor: 'rgba(255,255,255,0.045)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.14)' },
    '&:hover fieldset': { borderColor: 'rgba(8,203,0,0.45)' },
    '&.Mui-focused fieldset': { borderColor: palette.accent },
  },
  '& .MuiInputLabel-root': { color: palette.textMuted },
  '& .MuiInputLabel-root.Mui-focused': { color: palette.accent },
  '& .MuiFormHelperText-root': { ml: 0 },
};

const initialValues: ContactFormValues = {
  plan: '',
  name: '',
  company: '',
  phone: '',
  email: '',
  description: '',
};

type ContactFormSectionProps = {
  selectedPlan: string;
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

export function ContactFormSection({ selectedPlan }: ContactFormSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (selectedPlan) {
      setValues((current) => ({ ...current, plan: selectedPlan }));
      setErrors((current) => ({ ...current, plan: undefined }));
    }
  }, [selectedPlan]);

  const setValue = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.plan) nextErrors.plan = 'Selecione um plano.';
    if (!values.name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!values.phone.trim()) nextErrors.phone = 'Informe um telefone.';
    if (!values.email.trim()) nextErrors.email = 'Informe seu e-mail.';
    if (values.email.trim() && !emailRegex.test(values.email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (!values.description.trim()) {
      nextErrors.description = 'Descreva brevemente o projeto.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    const company = values.company.trim() || 'Não informado';
    const message = `Olá, Humberto! Vim pelo site da HC Web Solutions e gostaria de solicitar um orçamento.

Plano desejado: ${values.plan}
Nome: ${values.name.trim()}
Empresa: ${company}
Telefone para contato: ${values.phone.trim()}
E-mail: ${values.email.trim()}

Descrição do projeto:
${values.description.trim()}

Aguardo seu retorno.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Section id="contato" aria-labelledby="contact-title">
      <Container maxWidth="xl">
        <Grid>
          <Reveal>
            <ContactAside>
              <Typography color={palette.accent} fontWeight={850} fontSize="0.82rem" mb={2}>
                Contato direto
              </Typography>
              <Title id="contact-title" variant="h2" mb={3}>
                Conte o que você precisa construir.
              </Title>
              <Typography color={palette.textMuted} fontSize="1.1rem" lineHeight={1.75}>
                O formulário monta uma mensagem organizada e abre o WhatsApp com o resumo do pedido.
                Assim a conversa começa com contexto, escopo inicial e próximo passo claro.
              </Typography>
            </ContactAside>
          </Reveal>

          <Reveal delay={0.12}>
            <FormPanel noValidate onSubmit={handleSubmit}>
              <FieldGrid>
                <FormControl fullWidth error={Boolean(errors.plan)} sx={fieldSx}>
                  <InputLabel id="plan-label">Plano desejado</InputLabel>
                  <Select
                    labelId="plan-label"
                    label="Plano desejado"
                    value={values.plan}
                    onChange={(event) => setValue('plan', event.target.value)}
                  >
                    {pricingPlans.map((plan) => (
                      <MenuItem key={plan.name} value={plan.name}>
                        {plan.name}
                      </MenuItem>
                    ))}
                    <MenuItem value="Ainda não sei, quero orientação">
                      Ainda não sei, quero orientação
                    </MenuItem>
                  </Select>
                  {errors.plan && <FormHelperText>{errors.plan}</FormHelperText>}
                </FormControl>

                <TextField
                  label="Nome completo"
                  value={values.name}
                  onChange={(event) => setValue('name', event.target.value)}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  sx={fieldSx}
                  fullWidth
                />

                <TextField
                  label="Nome da empresa"
                  value={values.company}
                  onChange={(event) => setValue('company', event.target.value)}
                  sx={fieldSx}
                  fullWidth
                />

                <TextField
                  label="Telefone do cliente"
                  value={values.phone}
                  onChange={(event) => setValue('phone', event.target.value)}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  sx={fieldSx}
                  fullWidth
                />

                <TextField
                  label="E-mail"
                  type="email"
                  value={values.email}
                  onChange={(event) => setValue('email', event.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={fieldSx}
                  fullWidth
                />
              </FieldGrid>

              <TextField
                label="Descrição do projeto"
                value={values.description}
                onChange={(event) => setValue('description', event.target.value)}
                error={Boolean(errors.description)}
                helperText={errors.description}
                sx={{ ...fieldSx, mt: 2.2 }}
                multiline
                minRows={6}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 3, width: { xs: '100%', sm: 'auto' } }}
              >
                Enviar pelo WhatsApp
              </Button>
            </FormPanel>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
