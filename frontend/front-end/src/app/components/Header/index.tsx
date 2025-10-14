"use client"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "../PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import ozzyLogo from '../../../../public/ozzyLogo.svg'

interface props
{
    register ?: boolean
}

const Header = ({register = false}:props) =>
{
    return(
        <header className="flex justify-between items-center sticky top-0 z-50 bg-white border-b-2 border-gray-300 py-4">
           
           <Link href= "/">
            <Image className="xl:w-26" src={ozzyLogo} alt="Logo do aplicativo" />
           </Link>
           
            {register == false ? (<Link href="/registro">
                <PrimaryButton type="button" label="INICIAR AVENTURA" size="small" onClick={() => {}} />
            </Link>) : (<Link 
                href="/entrar"><SecondaryButton type="button" label="JÁ POSSUO CONTA" size="small" onClick={() => {}} />
            </Link>)}
           
 
            
                  
        </header>
        
    )
}

export default Header