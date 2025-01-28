import { Injectable } from '@nestjs/common';
import { ResendService } from 'nestjs-resend';
import { LoginMagicLinkEmail } from '@repo/email';
@Injectable()
export class EmailService {
  constructor(private readonly resendService: ResendService) {}

  async sendLoginEmail({
    email,
    url,
  }: {
    email: string;
    url: string;
  }): Promise<boolean> {
    const send_email = await this.resendService.send({
      to: email,
      from: 'Acme <onboarding@resend.dev>',
      subject: 'Login Link',
      react: LoginMagicLinkEmail({
        url,
      }),
    });
    return !!send_email.data;
  }
}
