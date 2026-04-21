import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { input as ZodInput, output as ZodOutput, ZodTypeAny } from 'zod';

@Injectable()
export class ZodValidationPipe<
  TSchema extends ZodTypeAny,
> implements PipeTransform<ZodInput<TSchema>, ZodOutput<TSchema>> {
  constructor(private readonly schema: TSchema) {}

  public transform(value: ZodInput<TSchema>): ZodOutput<TSchema> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(result.error.issues);
    }

    return result.data;
  }
}
