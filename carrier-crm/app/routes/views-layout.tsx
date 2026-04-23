import { GroupViewsLayout } from '../../src/app/group-views-layout';

export default function ViewsLayoutRoute() {
  return (
    <GroupViewsLayout
      title="TMS"
      backTo="/dashboard"
      groups={[
        {
          id: 'settings-group',
          items: [
            {
              id: 'settings',
              label: 'Settings',
              to: '/settings',
              end: true
            },
            {
              id: 'carrier-profile',
              label: 'Carrier Profile',
              to: '/settings/carrier-profile'
            },
            {
              id: 'subscription',
              label: 'Subscription',
              to: '/settings/subscription'
            }
          ]
        },
        {
          id: 'support-group',
          items: [
            {
              id: 'help-center',
              label: 'Help Center',
              to: '/help-center'
            },
            {
              id: 'logout',
              type: 'logout',
              label: 'Logout',
              action: '/logout',
              method: 'post'
            }
          ]
        }
      ]}
    />
  );
}
