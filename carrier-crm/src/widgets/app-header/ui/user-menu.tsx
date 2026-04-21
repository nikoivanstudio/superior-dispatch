import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { clsx, type ClassValue } from 'clsx';
import {
  ChevronDownIcon,
  CircleHelpIcon,
  LogOutIcon,
  SettingsIcon,
  UserRoundIcon
} from 'lucide-react';
import type { FC } from 'react';
import * as React from 'react';
import { Form, Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

import { useAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 12, align = 'end', ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-72 overflow-hidden rounded-2xl border border-border/70 bg-background p-2 text-foreground shadow-[0_24px_64px_-24px_rgba(15,23,42,0.35)]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-4 py-3', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-2 my-2 h-px bg-border/70', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    tone?: 'default' | 'danger';
  }
>(({ className, tone = 'default', ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors',
      'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      tone === 'danger' && 'text-destructive focus:bg-destructive/10 focus:text-destructive',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const getUserName = (firstName?: string, lastName?: string) => {
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();

  return fullName || 'My Account';
};

const getUserInitials = (firstName?: string, lastName?: string, email?: string) => {
  const nameParts = [firstName, lastName].filter(Boolean);

  if (nameParts.length > 0) {
    return nameParts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  return (email ?? 'U').slice(0, 2).toUpperCase();
};

export const UserMenu: FC = () => {
  const user = useAuth();

  if (!user) {
    return (
      <Button
        asChild
        size="default"
        variant="default"
        className="inline-flex h-10 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/20"
      >
        <Link to="/">Register</Link>
      </Button>
    );
  }

  const userName = getUserName(user.firstName, user.lastName);
  const userInitials = getUserInitials(user.firstName, user.lastName, user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex h-auto items-center gap-2 rounded-full px-1.5 py-1 text-foreground outline-none transition-colors hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Avatar className="size-11 border border-border/60 bg-muted/40">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[18rem]">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold leading-none text-foreground">
              {userName}
            </span>
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="flex flex-col gap-1">
          <DropdownMenuItem asChild>
            <Link to="/settings">
              <SettingsIcon className="size-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            <UserRoundIcon className="size-4" />
            <span>Carrier Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem disabled>
            <CircleHelpIcon className="size-4" />
            <span>Help Center</span>
          </DropdownMenuItem>

          <Form method="post" action="/logout">
            <DropdownMenuItem asChild tone="danger">
              <button type="submit" className="flex w-full items-center gap-3 text-left">
                <LogOutIcon className="size-4" />
                <span>Logout</span>
              </button>
            </DropdownMenuItem>
          </Form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
