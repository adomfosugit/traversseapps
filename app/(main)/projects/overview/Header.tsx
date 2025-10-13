import { Button } from "@/components/ui/button";

const Header = () => {
    return (
      <div className="w-full flex flex-row justify-between">
        <div>
          <p className="font-bold text-base">Projects</p>{' '}
          <p className="text-sm text-gray-400 mt-2">
            All projects you have will show up here
          </p>
        </div>
        <div>
          <Button className="bg-primary py-auto w-40 rounded text-center h-10 mt-2">
            Start a new project
          </Button>
        </div>
      </div>
    );
  };
  
  export default Header;