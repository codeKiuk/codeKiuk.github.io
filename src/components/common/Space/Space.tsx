import { FC } from 'react'
import { Box, ThemeUICSSProperties } from 'theme-ui'

type SpaceProps = Pick<ThemeUICSSProperties, 'width' | 'height'>

export const Space: FC<SpaceProps> = ({ width = 'auto', height = 'auto' }) => {
  return <Box sx={{ width, height }} />
}
