import { theme as chakraTheme } from '@chakra-ui/core'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { ...chakraTheme.fonts, mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '485px',
  md: '720px',
  lg: '1024px',
  xl: '1240px',
})

export const theme = {
  ...chakraTheme,
  fonts,
  breakpoints,
  textStyles: {
    h1: {
      fontSize: ['48px', '72px'],
      fontWeight: 'bold',
      lineHeight: '110%',
    },
    h2: {
      fontSize: ['36px', '48px'],
      fontWeight: 'semibold',
    },
  },
}
