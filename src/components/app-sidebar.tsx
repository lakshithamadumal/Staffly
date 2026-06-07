"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Inbox,
  Users,
  LineChart,
  MessageSquare,
  HelpCircle,
  Activity,
  Plus,
  Search,
  ChevronDown,
  ChevronRight,
  Settings,
  Sparkles,
  User,
  LogOut,
} from "lucide-react"

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
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Efferd sidebar navigation sections
const navigationGroups = [
  {
    label: "Today",
    items: [
      {
        title: "Queue",
        url: "#",
        icon: Inbox,
      },
      {
        title: "Team insights",
        url: "#",
        icon: LineChart,
      },
    ],
  },
  {
    label: "Inbox",
    items: [
      {
        title: "Conversations",
        url: "#",
        icon: MessageSquare,
        subItems: [
          { title: "Active", url: "#" },
          { title: "Snoozed", url: "#" },
          { title: "Resolved", url: "#" },
        ],
      },
      {
        title: "Customers",
        url: "#",
        icon: Users,
      },
      {
        title: "Channels",
        url: "#",
        icon: Settings,
      },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        title: "Workspace",
        url: "#",
        icon: LayoutDashboard,
        subItems: [
          { title: "General Settings", url: "#" },
          { title: "Billing & Plans", url: "#" },
        ],
      },
    ],
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r border-zinc-800 bg-[#0d0d0f] text-zinc-300">
      {/* Sidebar Header */}
      <SidebarHeader className="flex flex-col gap-4 p-4">
        {/* Brand Logo and Name */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-[#0d0d0f] font-bold text-sm shadow">
            e
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg text-white leading-none tracking-tight">
              Efferd
            </span>
          )}
        </div>

        {/* Buttons section: + New Conversation & Search */}
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors">
              <Plus className="h-4 w-4" />
              <span>New Conversation</span>
            </button>
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white transition-colors text-zinc-400">
              <Search className="h-4 w-4" />
            </button>
          </div>
        )}
      </SidebarHeader>

      <Separator className="bg-zinc-800/60 mx-4 w-auto" />

      {/* Sidebar Content */}
      <SidebarContent className="px-2 py-2">
        {/* Overview Item */}
        {!isCollapsed && (
          <div className="px-3 mb-4">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-zinc-800/60 text-white shadow-sm border border-zinc-700/30 transition-all"
            >
              <LayoutDashboard className="h-4 w-4 text-zinc-300" />
              <span>Overview</span>
            </a>
          </div>
        )}

        {/* Dynamic Navigation Groups */}
        {navigationGroups.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx} className="py-2">
            <SidebarGroupLabel className="px-3 py-1 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIdx) => {
                  const hasSubItems = !!item.subItems && item.subItems.length > 0
                  return (
                    <SidebarMenuItem key={itemIdx}>
                      {hasSubItems ? (
                        <CollapsibleMenuItem item={item} />
                      ) : (
                        <SidebarMenuButton asChild tooltip={item.title}>
                          <a
                            href={item.url}
                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
                          >
                            <item.icon className="h-4 w-4 shrink-0 text-zinc-400" />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4 flex flex-col gap-4">
        {/* Release Notes Banner Box */}
        {!isCollapsed && (
          <div className="rounded-xl border border-zinc-800 bg-[#161618] p-3 shadow-md">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-white">Smarter queue triage</span>
              <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold leading-none bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded">
                NEW
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
              One-click triage for your queue.
            </p>
            <a
              href="#"
              className="text-xs text-zinc-300 font-semibold hover:text-white underline underline-offset-4 transition-colors"
            >
              Release notes
            </a>
          </div>
        )}

        <Separator className="bg-zinc-800/60 w-full" />

        {/* Footer Navigation: Help Center & System Status */}
        <SidebarMenu className="gap-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help Center">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
              >
                <HelpCircle className="h-4 w-4 shrink-0 text-zinc-400" />
                <span>Help Center</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="System status">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors"
              >
                <Activity className="h-4 w-4 shrink-0 text-zinc-400" />
                <span>System status</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <Separator className="bg-zinc-800/60 w-full" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="w-full justify-start gap-3 p-2 hover:bg-zinc-900 rounded-lg text-zinc-300"
            >
              <Avatar className="h-8 w-8 rounded-lg border border-zinc-800">
                <AvatarImage src="" />
                <AvatarFallback className="rounded-lg bg-zinc-800 text-zinc-200 font-semibold text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col text-left flex-1 overflow-hidden">
                  <span className="text-sm font-medium leading-none text-zinc-100 truncate">
                    John Doe
                  </span>
                  <span className="text-xs text-zinc-500 truncate mt-1">
                    john.doe@efferd.com
                  </span>
                </div>
              )}
              {!isCollapsed && <ChevronDown className="ml-auto h-4 w-4 text-zinc-500" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[#161618] border border-zinc-800 text-zinc-300" align="end" side="right" sideOffset={10}>
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-zinc-100">John Doe</p>
                <p className="text-xs leading-none text-zinc-500">john.doe@efferd.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-zinc-900 hover:text-white">
              <Sparkles className="h-4 w-4 text-zinc-400" />
              <span>Upgrade to Pro</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-zinc-900 hover:text-white">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-zinc-900 hover:text-white">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="gap-2 cursor-pointer text-red-400 hover:bg-red-950/20 hover:text-red-300 focus:bg-red-950/20 focus:text-red-300">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

// Collapsible helper for menu items with subitems
function CollapsibleMenuItem({ item }: { item: typeof navigationGroups[0]["items"][0] }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  React.useEffect(() => {
    if (isCollapsed) {
      setIsOpen(false)
    }
  }, [isCollapsed])

  return (
    <div className="w-full">
      <SidebarMenuButton
        tooltip={item.title}
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className="w-full justify-between hover:bg-zinc-900"
      >
        <span className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-zinc-100 w-full">
          <item.icon className="h-4 w-4 shrink-0 text-zinc-400" />
          <span>{item.title}</span>
          {!isCollapsed && (
            <ChevronRight
              className={`ml-auto h-4 w-4 text-zinc-500 transition-transform duration-200 ${
                isOpen ? "transform rotate-90" : ""
              }`}
            />
          )}
        </span>
      </SidebarMenuButton>
      {isOpen && !isCollapsed && item.subItems && (
        <SidebarMenuSub className="border-l border-zinc-800 pl-4 ml-6 my-1">
          {item.subItems.map((sub, idx) => (
            <SidebarMenuSubItem key={idx}>
              <SidebarMenuSubButton asChild>
                <a
                  href={sub.url}
                  className="flex items-center gap-2 py-1.5 text-sm rounded-md text-zinc-500 hover:text-zinc-300"
                >
                  {sub.title}
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </div>
  )
}
