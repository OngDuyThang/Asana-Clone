import { Container } from 'components'
import { type FC } from 'react'
import { TColumn } from 'types/column'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import styles from './index.module.less'
import { useValueByTheme } from 'hooks'
import { DarkColor, LightColor } from 'types/theme'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cloneDeep } from 'lodash'

interface ColumnProps {
    columnData: TColumn,
}

const Column: FC<ColumnProps> = ({
    columnData
}) => {
    const columnBg = useValueByTheme(LightColor.board_column, DarkColor.board_column)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: columnData.id,
        data: cloneDeep(columnData)
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: 'none',
        opacity: isDragging ? '0.5' : '1'
    };

    return (
        <Container
            className={styles.wrapper}
            style={style}
            ref={setNodeRef}
            {...attributes}
        >
            <Container
                className={styles.column}
                style={{ background: columnBg }}
                {...listeners}
            >
                <Header title={columnData.title} />
                <Content
                    cardList={columnData.cards}
                    cardOrder={columnData.cardOrderIds}
                />
                <Footer />
            </Container>
        </Container>
    )
}

export default Column
