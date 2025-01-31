import SendResetPasswordEmailForm from '../forms/send-reset-password-form';
import { SendResetPasswordEmailContainer } from '../ui/send-reset-passowrd-email.container';

export const SendResetPasswordEmailPage = () => {
  return (
    <SendResetPasswordEmailContainer>
      <SendResetPasswordEmailForm />
    </SendResetPasswordEmailContainer>
  );
};
