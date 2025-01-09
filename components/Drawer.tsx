
import { landPurchaseStages } from './Stages';
import SubMenu from './SubMenu';


const Drawer = () => {
  const landStages = landPurchaseStages;
  return (
    <div
      className="relative md:fixed min-h-screen overflow-y-scroll scroll-hidden inset-0 p-4  w-1/4 bg-gray-100 hidden md:block pt-20 "
      aria-labelledby="drawer-label"
    >
      {landStages.map((stage) => (
        <SubMenu key={stage.id} item={stage} />
      ))}
    </div>
  );
};

export default Drawer;