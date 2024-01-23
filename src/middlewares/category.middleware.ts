import { Request, Response } from 'express';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import { SELECTED_CATEGORY_REQUIRED } from '@common/constants/error.constants';

import { RequestService } from '../request.service';

@Injectable()
export class CategoryMiddleware implements NestMiddleware {
  constructor(readonly requestService: RequestService) {}
  use(req: Request, res: Response, next: (error?: any) => void) {
    const selectedCategory = req.headers?.selectedcategory;

    if (!selectedCategory) {
      throw new BadRequestException(SELECTED_CATEGORY_REQUIRED);
    }

    this.requestService.selectedCategory = selectedCategory as string;

    next();
  }
}
