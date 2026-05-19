import { createTheme } from '@mui/material/styles';

export const palette = {
  background: '#05070d',
  backgroundSoft: '#090d15',
  surface: '#101620',
  surfaceElevated: '#151d29',
  surfaceMuted: '#dfe3e8',
  border: 'rgba(255, 255, 255, 0.12)',
  borderStrong: 'rgba(8, 203, 0, 0.38)',
  text: '#f7f9fb',
  textMuted: '#aab3c2',
  textSoft: '#6f7a8c',
  accent: '#08CB00',
  accentDark: '#069b00',
  ink: '#070a12',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: palette.accent,
      dark: palette.accentDark,
      contrastText: palette.ink,
    },
    background: {
      default: palette.background,
      paper: palette.surface,
    },
    text: {
      primary: palette.text,
      secondary: palette.textMuted,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 0.95,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: 0,
      lineHeight: 1,
    },
    h3: {
      fontWeight: 760,
      letterSpacing: 0,
    },
    button: {
      textTransform: 'none',
      fontWeight: 750,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 48,
          borderRadius: 999,
          paddingInline: 22,
          boxShadow: 'none',
          transition:
            'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, background-color 220ms ease',
          '& .MuiButton-endIcon': {
            transition: 'transform 220ms ease',
          },
          '&:hover': {
            transform: 'scale(1.018)',
          },
          '&:hover .MuiButton-endIcon': {
            transform: 'translateX(3px)',
          },
          '&:active': {
            transform: 'scale(0.985)',
          },
          '&:focus-visible': {
            outline: `2px solid ${palette.accent}`,
            outlineOffset: 3,
          },
        },
        containedPrimary: {
          boxShadow: '0 0 0 1px rgba(8, 203, 0, 0.25), 0 16px 42px rgba(8, 203, 0, 0.18)',
          '&:hover': {
            boxShadow: '0 0 0 1px rgba(8, 203, 0, 0.36), 0 20px 54px rgba(8, 203, 0, 0.22)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
  },
});
