import { FC, PropsWithChildren } from 'react'
import { Flex, FlexProps } from 'theme-ui'

type RowProps = {} & Omit<FlexProps, 'flexDirection'>

export const Row: FC<PropsWithChildren<RowProps>> = ({ children, ...rest }) => {
  return (
    <Flex
      sx={{
        flexDirection: 'row',
        ...rest.sx,
      }}
    >
      {children}
    </Flex>
  )
}
