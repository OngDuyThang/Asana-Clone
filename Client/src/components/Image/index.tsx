import { type FC, useState } from 'react'
import { default as NextImage } from "next/image"
import { MAX_LIMIT_NUMBER } from 'utils/constants'
import { Div, SkeletonElement } from 'components';
import clsx from 'clsx';

interface ImageProps {
    src: string;
    alt: string;
    fit?: 'contain' | 'cover' | 'fill';
    className?: string;
}

const Image: FC<ImageProps> = ({
    src,
    alt,
    fit = 'contain',
    className
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)

    return (
        <Div className={clsx('w-full h-full relative overflow-hidden', className)}>
            {isLoading || isError ? <SkeletonElement type='thumbnail' /> : null}
            <NextImage
                src={src}
                alt={alt}
                width={MAX_LIMIT_NUMBER}
                height={MAX_LIMIT_NUMBER}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: fit,
                    visibility: isLoading || isError ? 'hidden' : 'visible',
                    position: 'absolute'
                }}
                loading='lazy'
                onLoad={() => setIsLoading(false)}
                onError={() => setIsError(true)}
            />
        </Div>
    )
}

export default Image
