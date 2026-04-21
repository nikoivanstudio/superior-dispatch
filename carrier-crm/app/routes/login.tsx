import { SigninView } from '@/views/signin';

export {
  signinLoader as loader,
  signinAction as action
} from '@/features/auth';

export default function LoginRoute() {
  return <SigninView />;
}
