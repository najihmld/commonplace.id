'use client';

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LockKeyhole,
  UserPen,
} from 'lucide-react';

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
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '/inbox',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
    submenu: [
      {
        title: 'Profile',
        url: '/settings/profile',
        icon: UserPen,
      },
      {
        title: 'Security',
        url: '/settings/security',
        icon: LockKeyhole,
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  console.log('AppSidebar', pathname);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="px-4">
        {open ? (
          <Image
            priority
            height={26}
            width={116.4}
            src={'/logo.svg'}
            alt="Sidebar Logo"
          />
        ) : (
          <Image
            priority
            height={26}
            width={19.1}
            src={'/logo-cropped.svg'}
            alt="Sidebar Logo"
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                if (item.submenu && !open) {
                  return (
                    <DropdownMenu key={item.title}>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                          isActive={item.url === pathname || false}
                        >
                          <item.icon />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {item.submenu.map((subItem) => (
                          <DropdownMenuItem key={subItem.title} asChild>
                            <a href={subItem.url}>
                              <subItem.icon />
                              <span>{subItem.title}</span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                } else if (item.submenu) {
                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={item.url === pathname || false}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuButton
                                  asChild
                                  isActive={subItem.url === pathname || false}
                                >
                                  <a href={subItem.url}>
                                    <subItem.icon />
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
                      isActive={item.url === pathname || false}
                    >
                      <a href={item.url}>
                        <item.icon />
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
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
