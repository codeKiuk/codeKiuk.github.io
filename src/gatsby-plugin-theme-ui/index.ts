import { breakpoints } from "../constants/breakpoints"
import colors from "../constants/colors"

const theme = {
  breakpoints,
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  colors: {
    text: colors.gray[900],
    background: colors.gray[100],
    primary: colors.primary[500],
    secondary: colors.gray[700],
    muted: colors.gray[500],
    modes: {
      dark: {
        text: colors.gray[100],
        background: colors.gray[900],
        primary: colors.primary[500],
        secondary: colors.gray[300],
        muted: colors.gray[600],
      },
    },
  },
}

export default theme
