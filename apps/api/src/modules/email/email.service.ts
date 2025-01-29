import { Injectable } from '@nestjs/common';
import { ResendService } from 'nestjs-resend';
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
      text: url,
    });
    return !!send_email.data;
  }
  async sendResetPasswordEmail({
    email,
    url,
  }: {
    email: string;
    url: string;
  }): Promise<boolean> {
    const send_email = await this.resendService.send({
      to: email,
      from: 'Acme <onboarding@resend.dev>',
      subject: 'Reset Password Link',
      text: url,
    });
    return !!send_email.data;
  }
}
