import {useLocation} from "@tanstack/react-router"
import {SidebarTrigger} from "@/components/ui/sidebar"
import {HeaderProfile} from "@/components/header-profile"
import {Button} from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils"
import {BellIcon} from "lucide-react";

const PAGE_STRUCTURE: Record<
    string,
    {
        title: string
        parent?: string
    }
> = {
    "/": {
        title: "Home",
    },
    "/profile": {
        title: "Profile",
        parent: "/",
    },
    "/inbox": {
        title: "Inbox",
        parent: "/",
    },
}

export const PageHeader = ({className}: { className?: string }) => {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })

    const breadcrumbPath = []
    let currentPath = pathname

    while (currentPath) {
        breadcrumbPath.unshift({
            path: currentPath,
            ...PAGE_STRUCTURE[currentPath],
        })
        currentPath = PAGE_STRUCTURE[currentPath]?.parent || ""
    }

    return (
        <header className={cn("w-full border-b border-sidebar-border ", className)}>
            <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2 h-7">
                    <SidebarTrigger className="hover:bg-none px-none"/>
                    <Separator orientation="vertical" className="mr-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbPath.map((item, index) => {
                                const isLast = index === breadcrumbPath.length - 1

                                return (
                                    <BreadcrumbItem key={item.path}>
                                        {!isLast ? (
                                            <>
                                                <BreadcrumbLink href={item.path} className="text-muted-foreground">
                                                    {item.title}
                                                </BreadcrumbLink>
                                                <BreadcrumbSeparator/>
                                            </>
                                        ) : (
                                            <BreadcrumbPage
                                                className="font-medium text-foreground">{item.title}</BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                )
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="relative">
                        <BellIcon className="h-5 w-5"/>
                        <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-rose-500">
                            <span className="sr-only">New notifications</span>
                        </span>
                    </Button>

                    <HeaderProfile/>
                </div>
            </div>
        </header>
    )
}
