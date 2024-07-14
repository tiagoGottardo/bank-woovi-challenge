import { SettingsIcon } from "lucide-react"

import { Button } from "./ui/button"

const Header: React.FC = () => {

  return (
    <div className="flex w-full px-32 justify-between">
      <h1 className="text-3xl m-4">woopay</h1>
      <Button className="bg-background m-4 hover:bg-background">
        <SettingsIcon className="w-6 h-6 text-black" />
      </Button>
    </div>
  )
}

export default Header
