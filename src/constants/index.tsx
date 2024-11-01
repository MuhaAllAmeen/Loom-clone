import { Bell, CreditCard, FileDuoToneBlack, Home, Settings } from "@/components/icons";

export const MENU_ITEMS = (workspaceid: string):{title: string, href: string, icon: React.ReactNode}[] =>[
    {title: 'Home', href:`dashboard/${workspaceid}/home`,icon: <Home />},
    {title: 'My Library', href:`dashboard/${workspaceid}`,icon: <FileDuoToneBlack />},
    {title: 'Notifications', href:`dashboard/${workspaceid}/notifications`,icon: <Bell />},
    {title: 'Billing', href:`dashboard/${workspaceid}/billing`,icon: <CreditCard />},
    {title: 'Settings', href:`dashboard/${workspaceid}/settings`,icon: <Settings />},
]
