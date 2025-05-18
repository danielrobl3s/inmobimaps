import { useMapContext } from '../App';
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const items = [
   {
     title: "Inicio",
     url: "#",
     icon: Home,
   },
   {
     title: "Explorar propiedades",
     url: "#",
     icon: Inbox,
   },
   {
     title: "Agenda una cita",
     url: "#",
     icon: Calendar,
   },
   {
     title: "Mis favoritos",
     url: "#",
     icon: Search,
   },
   {
     title: "Ajustes",
     url: "#",
     icon: Settings,
   },
 ];

const SidebarLinks = () => {
   
   const { map } = useMapContext();

   

   if (map === null){
      return (
         <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
      )
   }

   return null;
};

export default SidebarLinks;