
import { landPurchaseStages } from './Stages';
import SubMenu from './SubMenu';
type Path = {
 path:{
  slug:string
 },
 stages: Record<string, boolean | null>; 
}

const Drawer = ({path,stages}:Path) => {
  console.log(stages)
  
  const landStages = landPurchaseStages;
  return (
    <div
      className="relative md:fixed min-h-screen overflow-y-scroll scroll-hidden inset-0 p-4  w-1/4 bg-gray-100 hidden md:block pt-20 "
      aria-labelledby="drawer-label"
    >
      {landStages.map((stage) => (
        <SubMenu key={stage.id} item={stage} path= {path.slug}  highlight={stages}/>
      ))}
    </div>
  );
};

export default Drawer;