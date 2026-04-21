import type { signinAction } from '../actions/signin-action';
import type { FC } from 'react';
import { useActionData, useNavigation } from 'react-router';


import { SignInForm } from '../ui/sign-in-form';
import { SigninLayout } from '../ui/signin-layout';

export const Signin: FC = () => {
  const actionData = useActionData<typeof signinAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const username = actionData?.values?.username ?? '';
  const redirectTo = actionData?.values?.redirectTo ?? '/loads';

  return (
    <SigninLayout
      form={
        <SignInForm
          redirectTo={redirectTo}
          isSubmitting={isSubmitting}
          username={username}
        />
      }
      actions={null}
    />
  );
};
