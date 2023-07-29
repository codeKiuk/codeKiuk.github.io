import sizes from 'constants/sizes'
import { FC, PropsWithChildren } from 'react'
import { Container as ContainerComponent } from 'theme-ui'

type ContainerProps = {}

export const Container: FC<PropsWithChildren<ContainerProps>> = ({ children }) => {
  return <ContainerComponent sx={{ maxWidth: sizes.container, px: [20, 0] }}>{children} </ContainerComponent>
}
