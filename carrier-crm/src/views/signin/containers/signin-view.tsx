
import { AppFooter } from '@/widgets/app-footer';
import { AppMainHeader } from '@/widgets/app-header';

import { Signin } from '@/features/auth';

import { SigninViewLayout } from '../ui/signin-view-layout';

export const SigninView = () => (
  <SigninViewLayout
    header={<AppMainHeader />}
    main={<Signin />}
    footer={<AppFooter />}
  />
);
