import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Token = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const c = ctx.switchToHttp().getRequest()

    return c.headers.authorization
  }
)
