"use client"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "../PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import ozzyLogo from "../../../../public/ozzyLogo.svg"
import ruby from "../../../resources/itens/ruby.svg"
import trophie from "../../../resources/itens/trophies.svg"

interface Props {
  register?: boolean
  login?: boolean
}

const Header = ({ register = false, login = false }: Props) => {
  return (
    <header className="flex justify-between items-center sticky top-0 z-50 bg-white border-b-2 border-gray-300 py-4">
      
      {!login ? (
        <>
          <Link href="/">
            <Image className="xl:w-26" src={ozzyLogo} alt="Logo do aplicativo" />
          </Link>

          {!register ? (
            <Link href="/registro">
              <PrimaryButton
                type="button"
                label="INICIAR AVENTURA"
                size="small"
                onClick={() => {}}
              />
            </Link>
          ) : (
            <Link href="/entrar">
              <SecondaryButton
                type="button"
                label="JÁ POSSUO CONTA"
                size="small"
                onClick={() => {}}
              />
            </Link>
          )}
        </>
      ) : (
        <>
        <Link href="/paginaInicial">
          <Image className="xl:w-26" src={ozzyLogo} alt="Logo do aplicativo" />
        </Link>
        <div className="flex gap-5">
            <div className="flex items-center gap-2">
                <Image className="md:w-6" alt="Moedas do Ozzy" src={ruby}></Image>
                <span className="text-[#DF6464] font-bold md:text-xl ">120</span>
            </div>
            <div className="flex items-center gap-2">
                <Image className="md:w-9" alt="Moedas do Ozzy" src={trophie}></Image>
                <span className="text-[#FFCB1E] font-bold md:text-xl ">10</span>
            </div>
            
        </div>
        
        
        </>
        
      )}

    </header>
  )
}

export default Header
