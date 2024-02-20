import { Upload } from 'antd'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { Button } from 'components'
import { capitalize } from 'lodash'
import { type FC } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

interface IProps {
    setImg: (img: File) => void;
    disable?: boolean
}

const ImageUpload: FC<IProps> = ({
    setImg,
    disable = false
}) => {
    const handleChange = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.originFileObj) {
            setImg(info.file.originFileObj)
        }
    }

    return (
        <Upload
            name='cover'
            listType="picture"
            maxCount={1}
            multiple={false}
            onChange={handleChange}
        >
            <Button
                fontSize='12px'
                fontWeight={600}
                icon={<AiOutlineUpload />}
                disabled={disable}
            >
                {capitalize('image')}
            </Button>
        </Upload>
    )
}

export default ImageUpload
