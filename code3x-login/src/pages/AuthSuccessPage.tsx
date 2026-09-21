import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { isAuthSession, signOutUser } from '../services/authService'
import { brandColors } from '../theme'

type CopyStatus = 'idle' | 'copied' | 'failed'

function AuthSuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')
  const [signingOut, setSigningOut] = useState(false)

  const session: unknown = location.state
  const backToLogin = () => navigate('/', { replace: true })

  if (!isAuthSession(session)) {
    return (
      <Container component="main" maxWidth="sm" sx={pageSx}>
        <Paper variant="outlined" sx={cardSx}>
          <Avatar sx={{ ...iconAvatarSx, bgcolor: '#F2F2F2', color: 'text.primary' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" sx={titleSx}>
            No active session
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 4 }}>
            Please sign in with Google to view your Firebase access token.
          </Typography>
          <Button variant="contained" onClick={backToLogin} sx={{ height: 48, px: 5 }}>
            Back to login
          </Button>
        </Paper>
      </Container>
    )
  }

  const displayName = session.displayName ?? session.email ?? 'there'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(session.accessToken)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('failed')
    }
    window.setTimeout(() => setCopyStatus('idle'), 2500)
  }

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOutUser()
    } finally {
      backToLogin()
    }
  }

  return (
    <Container component="main" maxWidth="md" sx={pageSx}>
      <Paper variant="outlined" sx={cardSx}>
        <Avatar sx={{ ...iconAvatarSx, bgcolor: brandColors.panel, color: brandColors.green }}>
          <CheckCircleRoundedIcon sx={{ fontSize: 34 }} />
        </Avatar>
        <Typography component="h1" sx={titleSx}>
          Authentication Successful
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          {session.photoURL && (
            <Avatar
              src={session.photoURL}
              alt=""
              slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
              sx={{ width: 36, height: 36 }}
            />
          )}
          <Box sx={{ textAlign: 'left', minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600, fontSize: 15, overflowWrap: 'anywhere' }}>
              Welcome, {displayName}
            </Typography>
            {session.email && session.displayName && (
              <Typography sx={{ color: 'text.secondary', fontSize: 13, overflowWrap: 'anywhere' }}>
                {session.email}
              </Typography>
            )}
          </Box>
        </Stack>

        <Box sx={{ textAlign: 'left' }}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1.5 }}
          >
            <Typography component="h2" id="token-label" sx={{ fontWeight: 600, fontSize: 16 }}>
              Firebase Access Token
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ContentCopyRoundedIcon fontSize="small" />}
              onClick={handleCopy}
              aria-describedby="token-label"
              sx={{ borderColor: 'divider', px: 2, flexShrink: 0 }}
            >
              {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
            </Button>
          </Stack>

          <Box
            component="pre"
            tabIndex={0}
            aria-labelledby="token-label"
            sx={{
              m: 0,
              p: 2.5,
              maxHeight: 260,
              overflowY: 'auto',
              borderRadius: '16px',
              bgcolor: '#F7F7F7',
              border: '1px solid',
              borderColor: 'divider',
              fontFamily: 'ui-monospace, "SFMono-Regular", Consolas, monospace',
              fontSize: 12.5,
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              '&:focus-visible': { outline: `2px solid ${brandColors.green}`, outlineOffset: 2 },
            }}
          >
            {session.accessToken}
          </Box>
          <Typography sx={{ mt: 1.5, fontSize: 12, color: 'text.secondary' }}>
            Firebase ID token (JWT) issued by Firebase Authentication via{' '}
            <Box component="code" sx={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>
              user.getIdToken()
            </Box>
            . It expires after one hour.
          </Typography>

          {copyStatus === 'failed' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Could not access the clipboard. Please select and copy the token manually.
            </Alert>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<LogoutRoundedIcon />}
          onClick={handleSignOut}
          disabled={signingOut}
          sx={{ mt: 4, height: 48, px: 5 }}
        >
          Sign out
        </Button>
      </Paper>
    </Container>
  )
}

const pageSx = {
  minHeight: '100svh',
  display: 'flex',
  alignItems: 'center',
  py: { xs: 3, sm: 6 },
  px: { xs: 2, sm: 3 },
} as const

const cardSx = {
  width: '100%',
  p: { xs: 3, sm: 5 },
  borderRadius: '28px',
  textAlign: 'center',
  borderColor: 'divider',
} as const

const iconAvatarSx = {
  width: 64,
  height: 64,
  mx: 'auto',
  mb: 2.5,
} as const

const titleSx = {
  fontSize: { xs: 24, sm: 30 },
  fontWeight: 700,
  letterSpacing: '-0.02em',
  mb: 1.5,
} as const

export default AuthSuccessPage
