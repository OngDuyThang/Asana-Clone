import { ParseUUIDPipe } from "@nestjs/common"

export const uuidPipe = new ParseUUIDPipe({ version: '4' })