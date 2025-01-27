import { Injectable } from '@nestjs/common';
import { SessionStrategy } from '../strategies/session.strategy';

@Injectable()
export class AuthGuard extends SessionStrategy {}
