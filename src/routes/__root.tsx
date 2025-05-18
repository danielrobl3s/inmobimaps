import { createRootRoute, Outlet } from '@tanstack/react-router'
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {PageHeader} from "@/components/page-header.tsx";
import {GeneralSidebar} from "@/components/ui/GeneralSidebar.tsx";

export const Route = createRootRoute({
    component: () => (
        <SidebarProvider>
            <GeneralSidebar />
            <main className="w-full">
                <PageHeader />
                <Outlet />
            </main>
        </SidebarProvider>
    ),
})