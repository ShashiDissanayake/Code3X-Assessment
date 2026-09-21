import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { brandColors } from '../theme'

interface FloatingAvatar {
  initials: string
  color: string
  size: number
  position: { top?: string; right?: string; bottom?: string; left?: string }
  delayed?: boolean
}

const FLOATING_AVATARS: FloatingAvatar[] = [
  { initials: 'AN', color: '#F6C9A8', size: 46, position: { top: '4%', left: '10%' } },
  { initials: 'KP', color: '#BFD9F2', size: 38, position: { top: '0%', right: '16%' }, delayed: true },
  { initials: 'SM', color: '#F4D88C', size: 50, position: { top: '44%', right: '-2%' } },
  { initials: 'RJ', color: '#D9C8F2', size: 36, position: { bottom: '22%', left: '2%' }, delayed: true },
]

const CAROUSEL_DOTS = 3
const ACTIVE_DOT = 0

function WorkerIllustration() {
  return (
    <Box
      component="svg"
      viewBox="0 0 420 380"
      aria-hidden="true"
      focusable="false"
      sx={{ display: 'block', width: '100%', height: 'auto' }}
    >
      <ellipse cx="210" cy="198" rx="196" ry="160" fill="none" stroke={brandColors.panelAccent} strokeWidth="1.5" strokeDasharray="4 9" />
      <circle cx="210" cy="206" r="138" fill="#FFFFFF" opacity="0.75" />
      <ellipse cx="210" cy="352" rx="160" ry="12" fill="#D6E7CC" />

      {/* Left plant */}
      <path d="M68 300 V236" stroke="#4E7F3B" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="54" cy="262" rx="12" ry="32" transform="rotate(-28 54 262)" fill="#7DB765" />
      <ellipse cx="84" cy="256" rx="12" ry="34" transform="rotate(22 84 256)" fill="#5E9A48" />
      <ellipse cx="68" cy="238" rx="10" ry="30" fill="#8DC574" />
      <path d="M42 298 H96 L89 350 H49 Z" fill={brandColors.black} />

      {/* Right plant */}
      <path d="M356 318 V272" stroke="#4E7F3B" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="344" cy="290" rx="9" ry="24" transform="rotate(-30 344 290)" fill="#5E9A48" />
      <ellipse cx="368" cy="286" rx="9" ry="26" transform="rotate(26 368 286)" fill="#8DC574" />
      <path d="M334 316 H378 L372 350 H340 Z" fill="#E0B489" />

      {/* Person */}
      <path d="M116 348 C110 308 150 292 210 292 C270 292 310 308 304 348 Z" fill="#1F2937" />
      <ellipse cx="140" cy="342" rx="17" ry="8" fill="#EDB98F" />
      <ellipse cx="280" cy="342" rx="17" ry="8" fill="#EDB98F" />
      <path d="M164 198 C186 184 234 184 256 198 C266 232 270 264 272 302 H148 C150 264 154 232 164 198 Z" fill={brandColors.green} />
      <rect x="199" y="160" width="22" height="32" rx="9" fill="#E3A87D" />
      <circle cx="210" cy="140" r="32" fill="#F2C29B" />
      <path d="M177 140 C174 110 194 96 213 97 C236 98 247 114 244 136 C236 123 222 117 206 119 C193 121 183 129 177 140 Z" fill="#1F2937" />
      <circle cx="214" cy="94" r="13" fill="#1F2937" />
      <path d="M195 143 q5 4 10 0 M215 143 q5 4 10 0" stroke="#1F2937" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M203 156 q7 5 14 0" stroke="#B5654A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M168 208 C146 238 150 266 176 278 M252 208 C274 238 270 266 244 278" stroke={brandColors.green} strokeWidth="20" strokeLinecap="round" fill="none" />

      {/* Laptop */}
      <rect x="156" y="222" width="108" height="66" rx="7" fill="#E7EAEE" />
      <circle cx="210" cy="255" r="7" fill="#C7D0DA" />
      <rect x="146" y="286" width="128" height="9" rx="4.5" fill="#A1A9B4" />
      <circle cx="174" cy="282" r="9" fill="#F2C29B" />
      <circle cx="246" cy="282" r="9" fill="#F2C29B" />

      {/* Sparkles */}
      <path d="M118 84 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#F2C94C" />
      <path d="M318 96 l2.5 6 6 2.5 -6 2.5 -2.5 6 -2.5 -6 -6 -2.5 6 -2.5 Z" fill={brandColors.green} />
      <path d="M338 206 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 Z" fill="#F2C94C" />
      <circle cx="96" cy="170" r="4" fill={brandColors.panelAccent} />
      <circle cx="300" cy="150" r="3" fill="#F2C94C" />
    </Box>
  )
}

function IllustrationPanel() {
  return (
    <Box
      component="aside"
      aria-labelledby="illustration-heading"
      sx={{
        flex: 1,
        minWidth: 0,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { md: 4, lg: 5 },
        minHeight: { md: 'calc(100svh - 40px)', lg: 'calc(100svh - 48px)' },
        px: { md: 4, lg: 6 },
        py: { md: 5, lg: 6 },
        borderRadius: { md: '28px', lg: '36px' },
        bgcolor: brandColors.panel,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { md: 360, lg: 470, xl: 520 },
        }}
      >
        <WorkerIllustration />

        {FLOATING_AVATARS.map(({ initials, color, size, position, delayed }) => (
          <Avatar
            key={initials}
            aria-hidden="true"
            className={delayed ? 'login-float login-float--delayed' : 'login-float'}
            sx={{
              position: 'absolute',
              ...position,
              width: size,
              height: size,
              fontSize: size * 0.32,
              fontWeight: 600,
              color: brandColors.black,
              bgcolor: color,
              border: '3px solid #FFFFFF',
              boxShadow: '0 8px 20px rgba(17, 17, 17, 0.08)',
            }}
          >
            {initials}
          </Avatar>
        ))}

        <Paper
          elevation={0}
          aria-hidden="true"
          className="login-float login-float--delayed"
          sx={{
            position: 'absolute',
            top: '30%',
            left: { md: '-4%', lg: '-8%' },
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            py: 1.25,
            pl: 1.25,
            pr: 2,
            borderRadius: '16px',
            boxShadow: '0 12px 30px rgba(17, 17, 17, 0.08)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              placeItems: 'center',
              width: 32,
              height: 32,
              borderRadius: '10px',
              bgcolor: brandColors.green,
              color: '#FFFFFF',
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
              Project done
            </Typography>
            <Typography sx={{ fontSize: 10.5, color: 'text.secondary', lineHeight: 1.3 }}>
              12 tasks completed
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Box
          aria-hidden="true"
          sx={{ display: 'flex', justifyContent: 'center', gap: 0.75, mb: { md: 2.5, lg: 3 } }}
        >
          {Array.from({ length: CAROUSEL_DOTS }, (_, index) => (
            <Box
              key={index}
              sx={{
                width: index === ACTIVE_DOT ? 24 : 8,
                height: 8,
                borderRadius: 999,
                bgcolor: index === ACTIVE_DOT ? brandColors.black : brandColors.dotInactive,
              }}
            />
          ))}
        </Box>
        <Typography
          id="illustration-heading"
          component="h2"
          sx={{
            fontSize: { md: 20, lg: 24, xl: 26 },
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            color: 'text.primary',
          }}
        >
          Make your work easier and organized
          <br />
          with Tuga&apos;s App
        </Typography>
      </Box>
    </Box>
  )
}

export default IllustrationPanel
