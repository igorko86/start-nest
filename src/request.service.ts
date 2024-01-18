import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST }) // TODO find out about this value
export class RequestService {
  private _userId: string;

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }
}
