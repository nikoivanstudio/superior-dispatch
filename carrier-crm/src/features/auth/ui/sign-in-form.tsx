import type { FC } from 'react';
import { Form, Link } from 'react-router';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type Props = {
  redirectTo: string;
  isSubmitting: boolean;
  username?: string;
  errors?: string;
};

export const SignInForm: FC<Props> = ({
  redirectTo,
  isSubmitting,
  username,
  errors
}) => {
  return (
    <div className="mx-auto w-full max-w-[432px] px-5 pt-6 pb-10">
      <Form
        method="post"
        className="bg-background px-6 pt-5 pb-6 shadow-[0_0_0_1px_rgba(226,230,240,0.55)] sm:px-6"
      >
        <Input
          type="hidden"
          name="redirectTo"
          value={redirectTo}
          className="hidden"
        />
        <div className="space-y-5">
          <header>
            <h1 className="text-[18px] leading-none font-extrabold tracking-[-0.02em] text-slate-950 sm:text-[19px]">
              Sign In{' '}
              <span className="text-[var(--auth-brand-text)]">Carrier TMS</span>
            </h1>
          </header>

          <div className="space-y-3.5">
            <label className="block space-y-1.5">
              <span className="text-[13px] leading-none font-semibold text-slate-950">
                Email
              </span>
              <Input
                type="email"
                name="username"
                defaultValue={username}
                autoComplete="email"
                required
                className="h-[30px] w-full rounded-[5px] border border-[#c8d2ea] bg-[#e8efff] px-2.5 text-[10px] font-medium text-slate-950 outline-none transition placeholder:text-[#7f8aa3] focus:border-[#2f6ae6] focus:ring-2 focus:ring-[#2f6ae6]/12"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-[13px] leading-none font-semibold text-slate-950">
                Password
              </span>
              <Input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="h-[30px] w-full rounded-[5px] border border-[#c8d2ea] bg-[#e8efff] px-2.5 text-[10px] font-medium text-slate-950 outline-none transition placeholder:text-[#7f8aa3] focus:border-[#2f6ae6] focus:ring-2 focus:ring-[#2f6ae6]/12"
              />
            </label>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 text-[11px] font-semibold">
              <Link
                to="/"
                className="text-[var(--auth-link-text)] transition hover:text-[var(--auth-link-text-hover)]"
              >
                Forgot password?
              </Link>
              <span className="cursor-pointer text-[var(--auth-link-text)] transition hover:text-[var(--auth-link-text-hover)]">
                Contact support
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size={null}
              variant={null}
              className="flex h-[34px] w-full items-center justify-center rounded-[5px] bg-[#2f6ae6] px-4 text-[11px] font-bold text-white transition hover:bg-[#1f58cb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6ae6]/20"
            >
              Sign in
            </Button>
          </div>

          <p className="max-w-[316px] text-[11px] leading-[1.15] text-slate-950">
            By signing in, you agree to Superior Dispatch&apos;s{' '}
            <Link
              to="/"
              className="font-semibold text-slate-950 transition hover:text-[var(--auth-link-text-hover)]"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              to="/"
              className="font-semibold text-slate-950 transition hover:text-[var(--auth-link-text-hover)]"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {errors ? (
          <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-3 py-2 text-left text-sm text-destructive">
            {errors}
          </p>
        ) : null}
      </Form>
    </div>
  );
};
