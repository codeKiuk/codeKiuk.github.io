import { Theme } from 'theme-ui'
import { breakpoints } from '../constants/breakpoints'
import texts from '../constants/texts'
import colors from '../constants/colors'
import sizes from 'constants/sizes'

const makeTheme = <T extends Theme>(t: T) => t

const theme = makeTheme({
  breakpoints,
  text: { ...texts },
  colors: { ...colors },
  sizes: sizes,
})

export type ExactTheme = typeof theme

export default theme
