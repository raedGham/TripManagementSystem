import heroImg from "../../assets/welcome.jpg";

//----------------------------------------------------
//  C O M P O N E N T
//----------------------------------------------------
const Layout = ({children})=> {


  
    return (
        <>  
        <div className="relative w-full h-screen overflow-hidden bg-black">
          {/* Background Image */}
          <img
            src={heroImg}
            alt="Inventory"
            className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40"
          />
        </div>

        {children}
      
        </>
    )
}

export default Layout
