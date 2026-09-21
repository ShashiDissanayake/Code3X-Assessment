import { createTheme } from '@mui/material/styles'

export const brandColors = {
  black: '#111111',
  panel: '#EEF5E8',
  panelAccent: '#C9DEBB',
  green: '#4E9A3A',
  inputBorder: '#E2E2E2',
  dotInactive: '#B4CCA5',
} as const

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: brandColors.black, contrastText: '#FFFFFF' },
    secondary: { main: brandColors.green, contrastText: '#FFFFFF' },
    text: { primary: '#141414', secondary: '#6F6F6F' },
    background: { default: '#FFFFFF', paper: '#FFFFFF' },
    divider: '#E7E7E7',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Poppins", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          '&.Mui-focusVisible': {
            outline: `2px solid ${brandColors.green}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `2px solid ${brandColors.green}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${brandColors.green}`,
            outlineOffset: 2,
            borderRadius: 4,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 999,
          backgroundColor: '#FFFFFF',
          fontSize: 14,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: brandColors.inputBorder,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#BDBDBD',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 1.5,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
          '&.MuiInputBase-adornedEnd': {
            paddingRight: 10,
          },
          '& .MuiInputBase-inputAdornedEnd': {
            paddingRight: 0,
          },
        }),
        input: {
          padding: '15px 24px',
          '&::placeholder': {
            color: '#9A9A9A',
            opacity: 1,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 24,
          marginRight: 24,
          marginTop: 6,
          fontSize: 12,
        },
      },
    },
  },
})

export default theme
