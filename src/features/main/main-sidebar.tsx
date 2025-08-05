'use client';

import { Target, BookOpen, Star, Archive } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/common/sidebar';

import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { SettingsDropdown } from '@/components/layouts/settings-dropdown';

type MenuItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
  submenu?: MenuItem[];
};

// Menu items.
const items: MenuItem[] = [
  {
    title: 'Projects',
    url: '/projects',
    icon: <Target className="text-projects" />,
  },
  {
    title: 'Areas',
    url: '/areas',
    icon: <Star className="text-areas" />,
  },
  {
    title: 'Resources',
    url: '/resources',
    icon: <BookOpen className="text-resources" />,
  },
  {
    title: 'Archives',
    url: '/archives',
    icon: <Archive className="text-archives" />,
  },
];

export function MainSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const { open, isMobile } = useSidebar();
  const { theme } = useTheme();

  const isActiveRoute = (targetPath: string) => {
    return (
      pathname
        .substring(pathname.split(locale).length > 2 ? locale.length + 1 : 0)
        .indexOf(targetPath) === 0
    );
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <Link href="/">
          <div className="text-xl font-bold text-neutral-800">
            <div className="flex flex-row items-center justify-start">
              <Image
                priority
                alt="commonplace.id"
                src={'/logo.svg'}
                height={28}
                width={28}
                className="mx-auto dark:hidden"
              />
              <Image
                key={theme}
                priority
                alt="commonplace.id"
                src={'/logo-white.svg'}
                height={28}
                width={28}
                className="mx-auto hidden dark:block"
              />
              <span
                className={clsx('text-brand ml-2 flex-1', {
                  hidden: !isMobile && !open,
                })}
              >
                commonplace.id
              </span>
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>PARA SYSTEM</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.submenu?.length && !open) {
                  return (
                    <DropdownMenu key={item.title}>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.url === pathname || false}
                        >
                          {item.icon}
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {item.submenu.map((subItem) => (
                          <DropdownMenuItem key={subItem.title} asChild>
                            <a href={subItem.url}>
                              {subItem.icon}
                              <span>{subItem.title}</span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                } else if (item.submenu?.length) {
                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={isActiveRoute(item.url)}>
                            {item.icon}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuButton
                                  asChild
                                  isActive={isActiveRoute(subItem.url)}
                                >
                                  <a href={subItem.url}>
                                    {subItem.icon}
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveRoute(item.url)}
                    >
                      <a href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SettingsDropdown />
      </SidebarFooter>
    </Sidebar>
  );
}
