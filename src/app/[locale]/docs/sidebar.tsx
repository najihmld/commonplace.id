'use client';

import { Component as ComponentIcon } from 'lucide-react';

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
import { ModeToggle } from '@/components/theme/mode-toggle';
import Link from 'next/link';

type SubMenuItem = {
  title: string;
  url: string;
  icon?: React.ComponentType;
  submenu?: SubMenuItem[];
};

const sidebar: { label: string; items: SubMenuItem[] }[] = [
  {
    label: 'Common',
    items: [
      {
        title: 'Button',
        url: '/docs/common/button',
      },
      {
        title: 'Input',
        url: '/docs/common/input',
      },
      {
        title: 'Select',
        url: '/docs/common/select',
      },
    ],
  },
  {
    label: 'Form',
    items: [
      {
        title: 'Input',
        url: '/docs/forms/input',
      },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="px-4">
        <Link href="/">
          <div className="text-xl font-bold text-neutral-800">
            {open ? <div>commonplace.id</div> : <div>C</div>}
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {sidebar.map((content) => (
          <SidebarGroup key={content.label}>
            <SidebarGroupLabel>{content.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {content.items.map((item) => {
                  if (item.submenu && !open) {
                    return (
                      <DropdownMenu key={item.title}>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton
                            isActive={item.url === pathname || false}
                          >
                            <ComponentIcon />
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {item.submenu.map((subItem) => (
                            <DropdownMenuItem key={subItem.title} asChild>
                              <a href={subItem.url}>
                                {subItem.icon && <subItem.icon />}
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
                              <ComponentIcon />
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
                                      <ComponentIcon />
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
                          <ComponentIcon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
