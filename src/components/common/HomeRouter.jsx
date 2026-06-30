import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Home from "../../pages/user/Home";
import PublicHome from "../../pages/public/PublicHome";

function HomeRouter(){
    const{user} = useContext(AuthContext);
    if(user && user.type==="User")
    {
        return <Home/>
    }
    return <PublicHome/>
}
export default HomeRouter;