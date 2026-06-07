"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Send,
  Bell,
  LayoutGrid,
} from "lucide-react"

import { Dashboard } from "@/components/dashboard"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#0d0d0f] text-zinc-100 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-800/60 px-6 transition-[width,height] ease-linear">
          {/* Left Side: Toggle and Breadcrumbs */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-zinc-400 hover:text-white" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-800" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="flex items-center gap-1 text-zinc-400">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <BreadcrumbLink href="#" className="hover:text-white text-xs font-medium">
                    Overview
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right Side: Header icons */}
          <div className="flex items-center gap-4">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
              <Send className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </button>
            <div className="h-8 w-8 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-300">
              JD
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex flex-1 flex-col gap-6 p-6">
          <Dashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
