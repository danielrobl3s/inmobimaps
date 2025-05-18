import { useState, createContext, useContext, ReactNode } from "react";
import "./App.css";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { MapWaypoints } from "./components/home/map-waypoints";
import SidebarForm from "./components/sidebarForm";
import SidebarLinks from "./components/SidebarLinks";

const MapContext = createContext(null);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

const MapProvider = ({ children }: {children: ReactNode}) => {
  const [map, setMap] = useState(null);

  return (
    <MapContext.Provider value={{ map: null, setMap: () => {} }}>
      {children}
    </MapContext.Provider>
  );
};

const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;



function App() {
  return (
    <>
      <MapProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Inmobimaps</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarLinks />
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarForm />
          </SidebarContent>
        </Sidebar>
        <SidebarTrigger />
        <main className="bg-red-500 w-full rounded-lg overflow-hidden">
          <MapWaypoints />
        </main>
      </SidebarProvider>
      </MapProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Roble sidebar</SidebarGroupLabel>
            <SidebarGroupContent>
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
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="bg-red-500 w-full rounded-lg overflow-hidden">
        <MapWaypoints />
      </main>
    </>
  );
}

export default App;
export { apikey };
