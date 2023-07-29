import { FC, PropsWithChildren } from 'react'
import { Flex, FlexProps } from 'theme-ui'

type ColumnProps = {} & Omit<FlexProps, 'flexDirection'>

export const Column: FC<PropsWithChildren<ColumnProps>> = ({ children, ...rest }) => {
  return (
    <Flex sx={{ flexDirection: 'column' }} {...rest}>
      {children}
    </Flex>
  )
}
