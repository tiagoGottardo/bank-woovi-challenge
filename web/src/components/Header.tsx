import { SettingsIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthContext } from "@/context/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useContext } from "react"

const Header: React.FC = () => {
  const { logOut } = useContext(AuthContext)

  return (
    <div className="flex w-full px-32 justify-between">
      <img src="../../public/woopay-logo.png" className="h-10 m-4 self-center" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-background m-4 border-0 hover:bg-background">
            <SettingsIcon className="w-6 h-6 text-black" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { logOut() }}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  )
}

export default Header
