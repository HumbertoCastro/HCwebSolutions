import { FormEvent, useEffect, useMemo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button, FormHelperText, MenuItem, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import styled from 'styled-components';
import {
  budgetOptions,
  deadlineOptions,
  goalOptions,
  solutionOptions,
} from '../../data/contactOptions';
import { palette } from '../../theme';
import type { ContactFormData } from '../../types';
import { ContactSummaryPanel } from './ContactSummaryPanel';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '55SEUNUMEROAQUI';
const totalSteps = 4;

const Form = styled.form`
  position: relative;
`;

const ProgressTrack = styled.div`
  height: 4px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 18px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  width: ${(props) => props.$progress}%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${palette.accent}, rgba(8, 203, 0, 0.58));
  transition: width 260ms ease;
`;

const StepMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
`;

const StepLabel = styled.span`
  color: ${palette.accent};
  font-size: 0.78rem;
  font-weight: 880;
`;

const Dots = styled.div`
  display: flex;
  gap: 7px;
`;

const Dot = styled.span<{ $active?: boolean }>`
  width: ${(props) => (props.$active ? '22px' : '7px')};
  height: 7px;
  border-radius: 999px;
  background: ${(props) => (props.$active ? palette.accent : 'rgba(255, 255, 255, 0.18)')};
  transition:
    width 260ms ease,
    background 260ms ease;
`;

const StepViewport = styled.div`
  min-height: 390px;
  overflow: hidden;

  @media (max-width: 599px) {
    min-height: 430px;
  }
`;

const StepContent = styled(motion.div)`
  display: grid;
  gap: 16px;
`;

const StepHeader = styled.div`
  display: grid;
  gap: 8px;
`;

const FieldGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const OptionGrid = styled(motion.div)<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$compact ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))'};
  gap: 10px;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const SelectableOption = styled(motion.button)<{ $active?: boolean }>`
  position: relative;
  width: 100%;
  min-height: 70px;
  border-radius: 16px;
  border: 1px solid ${(props) => (props.$active ? 'rgba(8, 203, 0, 0.78)' : 'rgba(255, 255, 255, 0.13)')};
  background: ${(props) =>
    props.$active
      ? 'linear-gradient(135deg, rgba(8, 203, 0, 0.2), rgba(255, 255, 255, 0.055))'
      : 'rgba(255, 255, 255, 0.045)'};
  color: ${palette.text};
  padding: 14px 38px 14px 14px;
  text-align: left;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 820;
  cursor: pointer;
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;

  &::after {
    content: '';
    position: absolute;
    right: 14px;
    top: 14px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => (props.$active ? palette.accent : 'rgba(255, 255, 255, 0.2)')};
    box-shadow: ${(props) => (props.$active ? '0 0 18px rgba(8, 203, 0, 0.58)' : 'none')};
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(8, 203, 0, 0.5);
    outline: none;
  }

  @media (max-width: 599px) {
    min-height: 58px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;

  @media (max-width: 599px) {
    display: grid;
    grid-template-columns: 1fr;

    button {
      width: 100%;
    }
  }
`;

const FinalNote = styled.p`
  color: ${palette.textMuted};
  line-height: 1.55;
  font-size: 0.9rem;
  margin: 2px 0 0;
`;

const MobileSummary = styled.div`
  display: none;

  @media (max-width: 1023px) {
    display: block;
    margin-top: 10px;
  }
`;

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    minHeight: 54,
    color: palette.text,
    bgcolor: 'rgba(255,255,255,0.05)',
    borderRadius: '14px',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.14)' },
    '&:hover fieldset': { borderColor: 'rgba(8,203,0,0.45)' },
    '&.Mui-focused fieldset': { borderColor: palette.accent },
  },
  '& .MuiInputLabel-root': { color: palette.textMuted },
  '& .MuiInputLabel-root.Mui-focused': { color: palette.accent },
  '& .MuiFormHelperText-root': { ml: 0 },
};

export const initialContactBriefingValues: ContactFormData = {
  name: '',
  company: '',
  phone: '',
  email: '',
  solutionType: '',
  goal: '',
  description: '',
  deadline: '',
  budget: '',
};

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

type ContactFormProps = {
  initialPlan?: string;
  values: ContactFormData;
  onValuesChange: (values: ContactFormData) => void;
};

export function validateStep(currentStep: number, values: ContactFormData) {
  const nextErrors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (currentStep === 0) {
    if (!values.name.trim()) nextErrors.name = 'Informe seu nome completo.';
    if (!values.phone.trim()) nextErrors.phone = 'Informe seu WhatsApp.';
    if (!values.email.trim()) nextErrors.email = 'Informe seu e-mail.';
    if (values.email.trim() && !emailRegex.test(values.email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
  }

  if (currentStep === 1 && !values.solutionType) {
    nextErrors.solutionType = 'Escolha uma opção para continuar.';
  }

  if (currentStep === 2 && !values.goal) {
    nextErrors.goal = 'Escolha o objetivo principal.';
  }

  if (currentStep === 3 && !values.description.trim()) {
    nextErrors.description = 'Conte rapidamente sua ideia.';
  }

  return nextErrors;
}

const getFirstInvalidStep = (values: ContactFormData) => {
  for (let index = 0; index < totalSteps; index += 1) {
    if (Object.keys(validateStep(index, values)).length > 0) return index;
  }

  return -1;
};

const getSolutionFromPlan = (plan?: string) => {
  if (!plan) return '';
  const normalized = plan.toLowerCase();
  if (normalized.includes('landing')) return 'Landing Page';
  if (normalized.includes('capta')) return 'Página de Captação';
  if (normalized.includes('sistema') || normalized.includes('web')) return 'Sistema Web';
  return 'Site Institucional';
};

export function ContactForm({ initialPlan, values, onValuesChange }: ContactFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mappedPlan = getSolutionFromPlan(initialPlan);
    if (mappedPlan && !values.solutionType) {
      onValuesChange({ ...values, solutionType: mappedPlan });
    }
  }, [initialPlan, onValuesChange, values]);

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;

  const fieldVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const stepVariants: Variants = {
    enter: (stepDirection: number) =>
      prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: stepDirection > 0 ? 52 : -52 },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.44,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: prefersReducedMotion ? 0 : 0.055,
      },
    },
    exit: (stepDirection: number) =>
      prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 0,
            x: stepDirection > 0 ? -42 : 42,
            transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
          },
  };

  const setValue = (field: keyof ContactFormData, value: string) => {
    onValuesChange({ ...values, [field]: value });
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, values);
    setErrors(stepErrors);

    if (Object.keys(stepErrors).length > 0) return;

    setDirection(1);
    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
  };

  const handleBack = () => {
    setErrors({});
    setDirection(-1);
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const invalidStep = getFirstInvalidStep(values);
    if (invalidStep >= 0) {
      setDirection(invalidStep > currentStep ? 1 : -1);
      setCurrentStep(invalidStep);
      setErrors(validateStep(invalidStep, values));
      return;
    }

    const company = values.company.trim() || 'Não informado';
    const deadline = values.deadline || 'Não informado';
    const budget = values.budget || 'Não informado';

    const message = `Olá, Humberto! Vim pelo site da HC Web Solutions e gostaria de solicitar um orçamento.

Dados do contato:
Nome: ${values.name.trim()}
Empresa/negócio: ${company}
WhatsApp: ${values.phone.trim()}
E-mail: ${values.email.trim()}

Sobre o projeto:
Tipo de solução desejada: ${values.solutionType}
Objetivo principal: ${values.goal}
Prazo desejado: ${deadline}
Orçamento estimado: ${budget}

Descrição:
${values.description.trim()}

Aguardo seu retorno.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  const step = useMemo(() => {
    if (currentStep === 0) {
      return (
        <>
          <StepHeader>
            <Typography variant="h2" fontSize="clamp(1.5rem, 2.7vw, 2.25rem)" lineHeight={1.08}>
              Primeiro, preciso saber com quem vou falar.
            </Typography>
          </StepHeader>
          <FieldGrid>
            <motion.div variants={fieldVariants}>
              <TextField
                label="Nome completo"
                value={values.name}
                onChange={(event) => setValue('name', event.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
                sx={fieldSx}
                fullWidth
              />
            </motion.div>
            <motion.div variants={fieldVariants}>
              <TextField
                label="WhatsApp"
                value={values.phone}
                onChange={(event) => setValue('phone', event.target.value)}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                sx={fieldSx}
                fullWidth
              />
            </motion.div>
            <motion.div variants={fieldVariants}>
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
            </motion.div>
            <motion.div variants={fieldVariants}>
              <TextField
                label="Empresa ou negócio (opcional)"
                value={values.company}
                onChange={(event) => setValue('company', event.target.value)}
                sx={fieldSx}
                fullWidth
              />
            </motion.div>
          </FieldGrid>
        </>
      );
    }

    if (currentStep === 1) {
      return (
        <>
          <StepHeader>
            <Typography variant="h2" fontSize="clamp(1.5rem, 2.7vw, 2.25rem)" lineHeight={1.08}>
              O que você quer criar?
            </Typography>
            <Typography color={palette.textMuted} lineHeight={1.55}>
              Escolha a opção mais próxima do que você imagina. Se tiver dúvida, selecione
              "Ainda não sei".
            </Typography>
          </StepHeader>
          <OptionGrid role="radiogroup" aria-label="Tipo de solução desejada">
            {solutionOptions.map((option) => (
              <SelectableOption
                key={option}
                type="button"
                variants={fieldVariants}
                $active={values.solutionType === option}
                aria-pressed={values.solutionType === option}
                onClick={() => setValue('solutionType', option)}
              >
                {option}
              </SelectableOption>
            ))}
          </OptionGrid>
          {errors.solutionType && (
            <FormHelperText error sx={{ ml: 0 }}>
              {errors.solutionType}
            </FormHelperText>
          )}
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <StepHeader>
            <Typography variant="h2" fontSize="clamp(1.5rem, 2.7vw, 2.25rem)" lineHeight={1.08}>
              Qual é o objetivo?
            </Typography>
            <Typography color={palette.textMuted} lineHeight={1.55}>
              O objetivo ajuda a definir o melhor formato para o seu projeto.
            </Typography>
          </StepHeader>
          <OptionGrid $compact role="radiogroup" aria-label="Objetivo principal">
            {goalOptions.map((option) => (
              <SelectableOption
                key={option}
                type="button"
                variants={fieldVariants}
                $active={values.goal === option}
                aria-pressed={values.goal === option}
                onClick={() => setValue('goal', option)}
              >
                {option}
              </SelectableOption>
            ))}
          </OptionGrid>
          {errors.goal && (
            <FormHelperText error sx={{ ml: 0 }}>
              {errors.goal}
            </FormHelperText>
          )}
        </>
      );
    }

    return (
      <>
        <StepHeader>
          <Typography variant="h2" fontSize="clamp(1.5rem, 2.7vw, 2.25rem)" lineHeight={1.08}>
            Tudo pronto para eu analisar seu projeto?
          </Typography>
          <Typography color={palette.textMuted} lineHeight={1.55}>
            Revise o resumo e envie pelo WhatsApp. Eu vou receber as informações organizadas para
            entender melhor seu momento e responder com uma direção inicial.
          </Typography>
        </StepHeader>
        <motion.div variants={fieldVariants}>
          <TextField
            label="Descrição curta do projeto"
            placeholder="Exemplo: quero uma página para divulgar minha clínica e receber contatos pelo WhatsApp."
            value={values.description}
            onChange={(event) => setValue('description', event.target.value)}
            error={Boolean(errors.description)}
            helperText={errors.description}
            sx={fieldSx}
            multiline
            minRows={4}
            fullWidth
          />
        </motion.div>
        <FieldGrid>
          <motion.div variants={fieldVariants}>
            <TextField
              select
              label="Prazo desejado (opcional)"
              value={values.deadline}
              onChange={(event) => setValue('deadline', event.target.value)}
              sx={fieldSx}
              fullWidth
            >
              {deadlineOptions.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </motion.div>
          <motion.div variants={fieldVariants}>
            <TextField
              select
              label="Orçamento estimado (opcional)"
              value={values.budget}
              onChange={(event) => setValue('budget', event.target.value)}
              sx={fieldSx}
              fullWidth
            >
              {budgetOptions.map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </motion.div>
        </FieldGrid>
        <motion.div variants={fieldVariants}>
          <FinalNote>
            Você será direcionado ao WhatsApp com o resumo preenchido. A mensagem só será enviada
            depois da sua confirmação.
          </FinalNote>
        </motion.div>
        <MobileSummary>
          <ContactSummaryPanel values={values} compact />
        </MobileSummary>
      </>
    );
  }, [currentStep, errors, fieldVariants, values]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <ProgressTrack aria-hidden="true">
        <ProgressFill $progress={progress} />
      </ProgressTrack>

      <StepMeta>
        <StepLabel>
          Etapa {currentStep + 1} de {totalSteps}
        </StepLabel>
        <Dots aria-hidden="true">
          {Array.from({ length: totalSteps }, (_, index) => (
            <Dot key={index} $active={index <= currentStep} />
          ))}
        </Dots>
      </StepMeta>

      <StepViewport>
        <AnimatePresence mode="wait" custom={direction}>
          <StepContent
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {step}
          </StepContent>
        </AnimatePresence>
      </StepViewport>

      <Actions>
        <Button
          type="button"
          variant="outlined"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          disabled={currentStep === 0}
          sx={{
            color: palette.text,
            borderColor: 'rgba(255,255,255,0.18)',
            '&:hover': { borderColor: palette.accent, bgcolor: 'rgba(8,203,0,0.08)' },
          }}
        >
          Voltar
        </Button>

        {isLastStep ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendRoundedIcon />}
            sx={{ minHeight: 54 }}
          >
            Enviar briefing pelo WhatsApp
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
            sx={{ minHeight: 54 }}
          >
            Continuar
          </Button>
        )}
      </Actions>
    </Form>
  );
}
