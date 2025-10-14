"use client"
import Header from "../components/Header"
import RegisterForm from "../components/RegisterForm"




const Registro = ()=>
{   
    
    return(
        <div className="mx-8 flex flex-col gap-5 xl:mx-48 mb-16">

        
            <Header register />
            <RegisterForm  />
           
            
            
            
         
        </div>
    )
}

export default Registro