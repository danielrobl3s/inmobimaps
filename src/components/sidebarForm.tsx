import { useMapContext } from '../App';
import { MarkerWithInfowindow } from "../components/pinState";
import { MyForm } from "../components/my-form";



const SidebarForm = () => {

   const { map, setMap } = useMapContext()

   if (map !== null){
      return(
         <div>
            <MyForm/>
         </div>
      );
   }

   return null;
};

export default SidebarForm;