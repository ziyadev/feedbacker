import { Injectable } from '@nestjs/common';
import { CompositeAuthStrategy } from '../strategies/composite-auth.strategy';

@Injectable()
export class AuthGuard extends CompositeAuthStrategy {}
