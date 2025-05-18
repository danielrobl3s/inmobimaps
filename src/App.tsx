import { useState } from 'react'
import './App.css'
import NavBar from './components/ui/NavBar';
import GeneralSidebar from './components/ui/GeneralSidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';

function App() {
  

  return (
    <>
      <NavBar />
      <SidebarProvider>
        <GeneralSidebar />
        <SidebarTrigger />
      </SidebarProvider>
    </>
  )
}

export default App
