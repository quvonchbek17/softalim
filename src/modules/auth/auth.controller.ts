import { AuthService } from "./auth.service";
import {
    Post,
    Get,
    Controller,
    Body,
    UseGuards,
    Request,
    BadRequestException
} from '@nestjs/common'

import {
    ApiTags,
    ApiOkResponse,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiHeader,
    ApiBadRequestResponse
} from '@nestjs/swagger'
import { Sign } from "./dto/dto";
import { AuthResponse } from "src/interface/sign.interface";
import { JwtAuthGuard } from "./guards/jwt.auth.guard";

@Controller('auth')
@ApiTags('/api/v1/auth')
export class AuthController {
    constructor(
        private readonly AuthService: AuthService
    ) {}

    @Post('login')
    @ApiBadRequestResponse({description: "Tokenda muammo bor", status: 400})
    async SignIn(
        @Body() body: Sign
    ): Promise<AuthResponse| BadRequestException> {
        return await this.AuthService.Sign(body)
    }
}