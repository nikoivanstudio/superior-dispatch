import { AppFooter } from '@/widgets/app-footer';

import { Signin } from '@/features/auth';

import { SigninViewLayout } from '../ui/signin-view-layout';

export const SigninView = () => (
  <SigninViewLayout header={null} main={<Signin />} footer={<AppFooter />} />
);
