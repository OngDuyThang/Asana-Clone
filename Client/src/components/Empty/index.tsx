import { Empty as AntdEmpty, ConfigProvider as AntdConfigProvider } from 'antd'
import { useValueByTheme } from 'hooks'
import { ReactNode, type FC } from 'react'
import { lightTheme, darkTheme } from './theme'

interface EmptyProps {
    description: ReactNode
}

const Empty: FC<EmptyProps> = ({
    description
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={theme}>
            <AntdEmpty
                description={description}
            />
        </AntdConfigProvider>
    )
}

export default Empty
