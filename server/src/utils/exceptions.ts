import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common"

export function throwException(e: any) {
    const { status, message } = e
    switch (status) {
        case 400: throw new BadRequestException(message)
        case 401: throw new UnauthorizedException(message)
        case 409: throw new ConflictException(message)
        case 403: throw new ForbiddenException(message)
        case 404: throw new NotFoundException(message)
        default: throw new InternalServerErrorException(message)
    }
}