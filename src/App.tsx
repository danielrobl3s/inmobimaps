import { useState } from "react";
import "./App.css";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {AdvancedMarker, APIProvider, Map} from '@vis.gl/react-google-maps';
const position = {lat: 53.54992, lng: 10.00678};
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

function App() {
  const [mapPin, setMapPin] = useState<google.maps.LatLngLiteral[]>([]);

  return (
    <>
      <div>
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
      </div>
      <div className="card">

        <APIProvider apiKey={'AIzaSyAg5LBT4iXog9Ia7y80Q9VypbNQ-s8aceY'}>
          <div style={{ width: '1000px', height: '750px' }}> {/* Adjust height and width as needed */}
          <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID" onClick={e => {
            if (!e.detail.latLng) { return; };
            setMapPin((prev) => [...prev, e.detail.latLng]);
          }}>
            {
              mapPin?.map((pin, index) => (
                <AdvancedMarker key={index} position={pin} />
              ))
            }
          </Map>
          </div>
        </APIProvider>
      </div>
    </>
  );
}

export default App;
