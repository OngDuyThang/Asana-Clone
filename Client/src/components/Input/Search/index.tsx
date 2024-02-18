import { type FC } from 'react'
import { AntdSearch } from 'components/Input'
import { SearchProps as AntdSearchProps } from 'antd/es/input'
import { TSearchProps } from 'types/input'
import styles from 'components/Input/index.module.less'
import clsx from 'clsx'
import { headerTheme, lightTheme, darkTheme } from 'components/Input/theme'
import { useValueByTheme } from 'hooks'
import { ConfigProvider as AntdConfigProvider } from 'antd'

interface SearchProps extends
    Pick<Required<AntdSearchProps>, TSearchProps>,
    Omit<AntdSearchProps, TSearchProps> {
    isHeaderInput?: boolean
}

const Search: FC<SearchProps> = ({
    enterButton = false,
    loading = false,
    onSearch,
    className,
    placeholder,
    defaultValue,
    onChange,
    bordered = true,
    prefix,
    suffix,
    disabled = false,
    size = 'middle',
    isHeaderInput = false,
    ...props
}) => {
    const theme = useValueByTheme(lightTheme, darkTheme)

    return (
        <AntdConfigProvider theme={isHeaderInput ? headerTheme : theme}>
            <AntdSearch
                className={clsx(styles.root, className)}
                enterButton={enterButton}
                loading={loading}
                onSearch={onSearch}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                bordered={bordered}
                prefix={prefix}
                suffix={suffix}
                disabled={disabled}
                size={size}
                {...props}
            />
        </AntdConfigProvider>
    )
}

export default Search
