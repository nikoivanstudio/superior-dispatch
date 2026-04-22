import { ProtectedLayout } from '@/app/protected-layout';

export {
  protectedLayoutLoader as loader,
  protectedLayoutmiddleware as middleware
} from '@/app/protected-layout';

export default function ProtectedLayoutRoute() {
  return <ProtectedLayout />;
}
