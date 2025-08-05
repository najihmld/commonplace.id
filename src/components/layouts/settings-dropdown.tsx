import { useUserSession } from '@/app/[locale]/(main)/providers';
import { Button } from '@/components/common/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { signOut } from '@/utils/supabase/actions';
import { Settings, UserCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export function SettingsDropdown() {
  const { setTheme } = useTheme();
  const user = useUserSession();
  const { avatar_url, email, name } = (user?.user_metadata || {}) as {
    avatar_url?: string;
    email?: string;
    name?: string;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-none bg-transparent"
        >
          <Settings className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <div className="flex items-center gap-x-2 px-2 py-2">
            {avatar_url ? (
              <Image
                src={avatar_url}
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <UserCircle size={40} />
            )}
            <div className="flex-1">
              <div className="text-sm font-semibold md:text-base dark:text-neutral-200">
                {name}
              </div>
              <div className="text-[10px] md:text-xs dark:text-neutral-200">
                {email}
              </div>
            </div>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
