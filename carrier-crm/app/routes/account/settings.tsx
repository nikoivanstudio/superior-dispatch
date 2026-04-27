import { SettingsView } from '@/views/settings';

export default function SettingsRoute() {
  return (
    <section className='flex flex-1 flex-col gap-4 px-6 py-8 md:px-10'>
      <SettingsView />
    </section>
  );
}
