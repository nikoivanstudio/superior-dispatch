import type { FC } from 'react';
import { Link } from 'react-router';


import { useAuth } from '@/features/auth';
import { NotificationsBtn } from '@/features/notifications';

import { APP_SETTINGS } from '@/shared/constants/app-settings';
import { Bell } from '@/shared/icons/bell';

import { AppHeaderLayout } from '../ui/app-header-layout';
import { NavBar } from '../ui/nav-bar';
import { UserMenu } from '../ui/user-menu';

export const AppMainHeader: FC = () => {
  const user = useAuth();

  return (
    <AppHeaderLayout
      navBar={
        <NavBar
          logo={<Link to="/">SuperiorDispatch</Link>}
          contactPhone={APP_SETTINGS.CONTACT_PHONE}
          actions={
            <>
              {user ? (
                <>
                  <Bell width={80} height={130} />
                  <UserMenu />
                </>
              ) : (
                <NotificationsBtn
                  action={() => console.log('On notifications click')}
                />
              )}
            </>
          }
        />
      }
    />
  );
};
