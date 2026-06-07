"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  Briefcase,
  TrendingUp,
  MessageSquare,
  Laptop,
  Settings,
  ChevronDown,
  LogOut,
  Sparkles,
  Building,
  User,
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

// Menu items grouped by feature area for Staffly Workforce Management
const navigationGroups = [
  {
    label: "Core",
    items: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
      },
      {
        title: "Employees",
        url: "#",
        icon: Users,
        subItems: [
          { title: "Profiles", url: "#" },
          { title: "Transfers", url: "#" },
          { title: "Promotions", url: "#" },
          { title: "Resignations", url: "#" },
        ],
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Attendance",
        url: "#",
        icon: CalendarCheck,
        subItems: [
          { title: "Check In/Out", url: "#" },
          { title: "Shift Management", url: "#" },
          { title: "Attendance Reports", url: "#" },
        ],
      },
      {
        title: "Leave Management",
        url: "#",
        icon: CalendarDays,
        subItems: [
          { title: "Leave Requests", url: "#" },
          { title: "Balance Tracking", url: "#" },
        ],
      },
      {
        title: "Payroll & Billing",
        url: "#",
        icon: CreditCard,
        subItems: [
          { title: "Salary Processing", url: "#" },
          { title: "Payslip Generation", url: "#" },
          { title: "Calculations", url: "#" },
        ],
      },
    ],
  },
  {
    label: "Talent & Growth",
    items: [
      {
        title: "Recruitment",
        url: "#",
        icon: Briefcase,
        subItems: [
          { title: "Job Vacancies", url: "#" },
          { title: "ATS Portal", url: "#" },
          { title: "Interviews", url: "#" },
        ],
      },
      {
        title: "Performance",
        url: "#",
        icon: TrendingUp,
        subItems: [
          { title: "KPI Tracking", url: "#" },
          { title: "Goal Management", url: "#" },
          { title: "Reviews", url: "#" },
        ],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Communication",
        url: "#",
        icon: MessageSquare,
      },
      {
        title: "Asset Management",
        url: "#",
        icon: Laptop,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Sidebar Header */}
      <SidebarHeader className="h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg">
            <Building className="h-6 w-6" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col text-left transition-all duration-200">
              <span className="font-bold text-base leading-none tracking-tight text-foreground">
                Staffly SaaS
              </span>
              <span className="text-xs text-muted-foreground mt-0.5">
                Workforce Management
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <Separator className="opacity-50" />

      {/* Sidebar Content */}
      <SidebarContent>
        {navigationGroups.map((group, groupIdx) => (
          <SidebarGroup key={groupIdx}>
            <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                          <a href={item.url} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 hover:bg-accent hover:text-accent-foreground text-foreground">
                            <item.icon className="h-4 w-4 shrink-0" />
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

      <Separator className="opacity-50" />

      {/* Sidebar Footer */}
      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="w-full justify-start gap-3 p-2 hover:bg-accent rounded-lg">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  JD
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col text-left flex-1 overflow-hidden">
                  <span className="text-sm font-medium leading-none text-foreground truncate">
                    John Doe
                  </span>
                  <span className="text-xs text-muted-foreground truncate mt-0.5">
                    john.doe@staffly.com
                  </span>
                </div>
              )}
              {!isCollapsed && <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="right" sideOffset={10}>
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john.doe@staffly.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Upgrade to Pro</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
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
        className="w-full justify-between"
      >
        <span className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-foreground w-full">
          <item.icon className="h-4 w-4 shrink-0" />
          <span>{item.title}</span>
          {!isCollapsed && (
            <ChevronDown
              className={`ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          )}
        </span>
      </SidebarMenuButton>
      {isOpen && !isCollapsed && item.subItems && (
        <SidebarMenuSub>
          {item.subItems.map((sub, idx) => (
            <SidebarMenuSubItem key={idx}>
              <SidebarMenuSubButton asChild>
                <a
                  href={sub.url}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground"
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
