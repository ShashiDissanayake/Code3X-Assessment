import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import AppleIcon from '@mui/icons-material/Apple'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IllustrationPanel from '../components/IllustrationPanel'
import { getAuthErrorNotice, signInWithGoogle } from '../services/authService'
import { brandColors } from '../theme'
import type { Notice } from '../types/notice'
import './LoginPage.css'

interface LoginFormValues {
  email: string
  password: string
}

type LoginField = keyof LoginFormValues
type LoginFormErrors = Partial<Record<LoginField, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_PASSWORD_LENGTH = 6
const SOCIAL_UNAVAILABLE_MESSAGE =
  'Only Google authentication is enabled for this assessment.'

function validate({ email, password }: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}
  const trimmedEmail = email.trim()

  if (!trimmedEmail) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
  }

  return errors
}

const socialButtonSx = {
  width: 50,
  height: 50,
  bgcolor: brandColors.black,
  color: '#FFFFFF',
  transition: 'transform 0.15s ease, background-color 0.15s ease',
  '&:hover': { bgcolor: '#2B2B2B', transform: 'translateY(-1px)' },
  '&.Mui-disabled': { bgcolor: brandColors.black, color: '#FFFFFF', opacity: 0.7 },
  '& .MuiSvgIcon-root': { fontSize: 24 },
} as const

function LoginPage() {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' })
  const [touched, setTouched] = useState<Record<LoginField, boolean>>({
    email: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [noticeOpen, setNoticeOpen] = useState(false)

  const errors = validate(values)
  const emailError = touched.email ? errors.email : undefined
  const passwordError = touched.password ? errors.password : undefined

  const showNotice = (next: Notice) => {
    setNotice(next)
    setNoticeOpen(true)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleBlur = (field: LoginField) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched({ email: true, password: true })

    if (errors.email) {
      emailRef.current?.focus()
      return
    }
    if (errors.password) {
      passwordRef.current?.focus()
      return
    }

    showNotice({
      message:
        'Looks good! Email/password sign-in is not enabled for this assessment. Please continue with Google.',
      severity: 'success',
    })
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    try {
      const session = await signInWithGoogle()
      navigate('/auth-success', { replace: true, state: session })
    } catch (error) {
      showNotice(getAuthErrorNotice(error))
      setGoogleLoading(false)
    }
  }

  const showUnavailable = (message: string) => () => {
    showNotice({ message, severity: 'info' })
  }

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '100svh',
        p: { xs: 0, md: 2.5, lg: 3 },
        gap: { md: 2, lg: 3 },
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          flex: { xs: '1 1 auto', md: '0 0 45%', lg: '0 0 43%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 4, lg: 6 },
          py: { xs: 6, md: 4 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 30, sm: 34, lg: 38 },
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                mb: 1.5,
              }}
            >
              Welcome back!
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 13.5, sm: 14 },
                lineHeight: 1.6,
                color: 'text.secondary',
                maxWidth: 360,
                textWrap: 'balance',
                mx: 'auto',
              }}
            >
              Simplify your workflow and boost your productivity with Tuga&apos;s App.
              Get started for free.
            </Typography>
          </Box>

          <Box component="form" noValidate onSubmit={handleSubmit} aria-label="Login form">
            <Stack spacing={2}>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                fullWidth
                required
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur('email')}
                error={Boolean(emailError)}
                helperText={emailError}
                inputRef={emailRef}
                slotProps={{
                  htmlInput: { 'aria-label': 'Email', inputMode: 'email' },
                }}
              />

              <TextField
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                autoComplete="current-password"
                fullWidth
                required
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur('password')}
                error={Boolean(passwordError)}
                helperText={passwordError}
                inputRef={passwordRef}
                slotProps={{
                  htmlInput: { 'aria-label': 'Password' },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          aria-controls="password"
                          aria-pressed={showPassword}
                          onClick={() => setShowPassword((visible) => !visible)}
                          onMouseDown={(event) => event.preventDefault()}
                          sx={{ color: '#8A8A8A', mr: 0.5 }}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5, mb: 4 }}>
              <Link
                component="button"
                type="button"
                underline="hover"
                onClick={showUnavailable('Password reset is not part of this assessment.')}
                sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: 52,
                fontSize: 15,
                '&:hover': { bgcolor: '#2B2B2B' },
              }}
            >
              Login
            </Button>
          </Box>

          <Divider
            sx={{
              my: { xs: 4, md: 4.5 },
              fontSize: 13,
              color: 'text.secondary',
              '&::before, &::after': { borderColor: 'divider' },
            }}
          >
            or continue with
          </Divider>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <IconButton
              aria-label="Continue with Google"
              aria-busy={googleLoading}
              disabled={googleLoading}
              onClick={handleGoogleLogin}
              sx={socialButtonSx}
            >
              {googleLoading ? (
                <CircularProgress size={22} thickness={5} sx={{ color: '#FFFFFF' }} />
              ) : (
                <GoogleIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="Continue with Apple"
              onClick={showUnavailable(SOCIAL_UNAVAILABLE_MESSAGE)}
              sx={socialButtonSx}
            >
              <AppleIcon />
            </IconButton>
            <IconButton
              aria-label="Continue with Facebook"
              onClick={showUnavailable(SOCIAL_UNAVAILABLE_MESSAGE)}
              sx={socialButtonSx}
            >
              <FacebookIcon />
            </IconButton>
          </Stack>

          <Typography
            sx={{ mt: { xs: 5, md: 6 }, textAlign: 'center', fontSize: 13.5, color: 'text.secondary' }}
          >
            Not a member?{' '}
            <Link
              component="button"
              type="button"
              underline="hover"
              onClick={showUnavailable('Registration is not part of this assessment.')}
              sx={{ fontSize: 'inherit', fontWeight: 600, color: 'secondary.main', verticalAlign: 'baseline' }}
            >
              Register now
            </Link>
          </Typography>
        </Box>
      </Box>

      <IllustrationPanel />

      <Snackbar
        open={noticeOpen}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason !== 'clickaway') setNoticeOpen(false)
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setNoticeOpen(false)}
          severity={notice?.severity ?? 'info'}
          variant="filled"
          sx={{ width: '100%', maxWidth: 480, alignItems: 'center' }}
        >
          {notice?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default LoginPage
