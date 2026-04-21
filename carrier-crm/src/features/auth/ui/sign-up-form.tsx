import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import { Link } from 'react-router';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type Props = {};

type Step = 1 | 2 | 3;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  monthlyCars: string;
  referralSource: string;
  usdot: string;
};

const stepMeta = {
  1: { title: 'Create Account', progress: '33.33%' },
  2: { title: 'Additional Info', progress: '66.66%' },
  3: { title: 'USDOT Verification', progress: '100%' }
} as const satisfies Record<Step, { title: string; progress: string }>;

const roleOptions = ['Owner', 'Dispatcher', 'Driver', 'Billing'];
const carOptions = ['1-100', '101-500', '501-1.000', '1100+'];

const defaultValues: FormState = {
  firstName: 'Ivan',
  lastName: 'Niko',
  email: 'ndeikoidvadnsdededtudio@gmail.com',
  phone: '(201) 555-0123',
  password: 'password123',
  confirmPassword: 'password123',
  role: 'Owner',
  monthlyCars: '1-100',
  referralSource: 'Referral, facebook, news, ads and etc.',
  usdot: ''
};

const inputClassName =
  'h-12 w-full rounded-[9px] border border-[#d5dceb] bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-[#98a2b3] focus:border-[#2f58e0] focus:ring-3 focus:ring-[#2f58e0]/15';

const radioClassName =
  'size-5 appearance-none rounded-full border border-[#8b94aa] bg-white align-middle outline-none transition before:block before:size-2.5 before:translate-x-[4px] before:translate-y-[4px] before:rounded-full before:bg-[#2f58e0] before:content-[""] before:opacity-0 checked:border-[#2f58e0] checked:before:opacity-100';

export const SignUpForm: FC<Props> = () => {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(defaultValues);

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < 3) {
      setStep((current) => (current + 1) as Step);
    }
  };

  const handleVerify = () => {};

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom_left,_rgba(195,255,174,0.55),_transparent_30%),linear-gradient(180deg,_#f9fbfc_0%,_#f3fbef_100%)] px-6 py-8">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-12">
        <section className="max-w-[340px] pl-6 text-slate-950">
          <h1 className="text-[3.5rem] leading-[0.98] font-semibold tracking-[-0.05em]">
            Let&apos;s verify your company information and you&apos;ll be on your way.
          </h1>
        </section>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[720px] rounded-2xl bg-white px-7 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
        >
          <div className="space-y-7">
            <header className="space-y-4">
              <h2 className="text-[2.1rem] leading-none font-semibold tracking-[-0.03em] text-slate-950">
                Carrier
              </h2>
              <div className="space-y-3">
                <p className="text-[1.05rem] text-[#667085]">
                  <span className="font-semibold text-slate-950">Step {step} of 3:</span>{' '}
                  {stepMeta[step].title}
                </p>
                <div className="h-3 rounded-full bg-[#e4e8f0]">
                  <div
                    className="h-full rounded-full bg-[#2f58e0] transition-all duration-300"
                    style={{ width: stepMeta[step].progress }}
                  />
                </div>
              </div>
            </header>

            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <span className="text-base font-semibold text-slate-950">First name</span>
                    <Input
                      type="text"
                      value={form.firstName}
                      onChange={handleChange('firstName')}
                      className={`${inputClassName} bg-[#eaf1ff]`}
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-base font-semibold text-slate-950">Last name</span>
                    <Input
                      type="text"
                      value={form.lastName}
                      onChange={handleChange('lastName')}
                      className={`${inputClassName} bg-[#eaf1ff]`}
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-base font-semibold text-slate-950">Email</span>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    className={inputClassName}
                  />
                </label>

                <label className="block max-w-[246px] space-y-2">
                  <span className="text-base font-semibold text-slate-950">Phone Number</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-lg">
                      🇺🇸
                    </span>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </label>

                <label className="block space-y-2">
                  <span className="text-base font-semibold text-slate-950">Password</span>
                  <Input
                    type="password"
                    value={form.password}
                    onChange={handleChange('password')}
                    className={inputClassName}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-base font-semibold text-slate-950">Confirm Password</span>
                  <Input
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    className="h-12 w-full rounded-[9px] border border-[#2f58e0] bg-white px-4 text-base text-slate-950 outline-none ring-1 ring-[#2f58e0] transition"
                  />
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <fieldset className="space-y-3">
                  <legend className="text-[1.05rem] font-semibold text-slate-950">
                    Select your role
                  </legend>
                  <div className="space-y-3">
                    {roleOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 text-[1.05rem] text-[#667085]">
                        <Input
                          type="radio"
                          name="role"
                          value={option}
                          checked={form.role === option}
                          onChange={handleChange('role')}
                          className={radioClassName}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="text-[1.05rem] font-semibold text-slate-950">
                    How many cars do you move per month?
                  </legend>
                  <div className="space-y-3">
                    {carOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 text-[1.05rem] text-[#667085]">
                        <Input
                          type="radio"
                          name="monthlyCars"
                          value={option}
                          checked={form.monthlyCars === option}
                          onChange={handleChange('monthlyCars')}
                          className={radioClassName}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="block space-y-2">
                  <span className="text-[1.05rem] font-semibold text-slate-950">
                    How did you hear about us? (Optional)
                  </span>
                  <Input
                    type="text"
                    value={form.referralSource}
                    onChange={handleChange('referralSource')}
                    className={inputClassName}
                  />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <label className="block space-y-2">
                  <span className="text-[1.05rem] font-semibold text-slate-950">USDOT</span>
                  <Input
                    type="text"
                    value={form.usdot}
                    onChange={handleChange('usdot')}
                    className={inputClassName}
                  />
                </label>

                <p className="text-[1.05rem] text-[#475467]">
                  Don&apos;t have USDOT? Call us:{' '}
                  <Link to="tel:+12244491659" className="font-semibold text-[#2f58e0]">
                    +1 (224) 449 1659
                  </Link>
                </p>

                <div className="space-y-4">
                  <p className="text-[1.05rem] text-[#475467]">Want to proceed without USDOT?</p>
                  <Button
                    type="button"
                    onClick={handleVerify}
                    size={null}
                    variant={null}
                    className="flex h-12 w-full items-center justify-center rounded-[10px] border border-[#d5dceb] bg-[#efefef] px-4 text-[1.05rem] font-semibold text-slate-800 transition hover:bg-[#e4e4e4]"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              size={null}
              variant={null}
              className="flex h-13 w-full items-center justify-center rounded-[10px] bg-[#2f58e0] px-4 text-[1.05rem] font-semibold text-white transition hover:bg-[#2448bb] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#2f58e0]/20"
            >
              {step === 3 ? 'Complete Sign Up' : 'Continue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
