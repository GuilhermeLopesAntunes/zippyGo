"use client"
import Header from "./components/Header"
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from './components/SecondaryButton'
import Lottie from "lottie-react"
import animationDataMainHome from "../animation/mainHomeAnimation.json"
import animationDataSecondMainHome from "../animation/SecondMainAnimation.json"
import animationDataThridMainHome from "../animation/ThridMainAnimation.json"
import MainCardInformationPage from './components/MainCardInformationPage'
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {
const [buttonSize, setButtonSize] = useState<"medium" | "large">("medium");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setButtonSize("large");
      } else {
        setButtonSize("medium");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  

  
  return (
    <div className="mx-8 xl:mx-48">
      <Header />

      <main >
        <div className="mb-50 xl:flex xl:items-center xl:justify-center xl:mt-24 xl:gap-20">
         <Lottie className="w-80 md:w-100 m-auto xl:m-0" animationData={animationDataMainHome} loop autoplay/>
         <div>
            <h1 className="text-center font-bold text-2xl text-[#555353] my-10 w-[280px] mx-auto md:w-[500px]">
            Aprender Nunca Foi Tão Divertido! Explore, Jogue E Conquiste Com o Ozzy.
          </h1>
          <div className="text-center">
            <Link href= "registro">
              <PrimaryButton className="mb-5 block mx-auto" type="button" label="INICIAR AVENTURA" size={buttonSize} onClick={()=>{}} />
            </Link>
            
            <Link href="entrar">
              <SecondaryButton className="block mx-auto" type="button" label="JÁ POSSUO CONTA" size={buttonSize} onClick={()=>{}} />
            </Link>
          </div>
         </div>
          

          
        </div>
        <MainCardInformationPage  title="Desafios Interativos" content="Aprender nunca foi tão dinâmico! Com nossos desafios interativos, você vai explorar conceitos de maneira prática e divertida. Resolva quizzes, complete missões e teste seus conhecimentos enquanto avança no aprendizado. Aqui, cada resposta certa é um passo a mais para dominar o conteúdo!" lootFile={animationDataSecondMainHome}/>

        <MainCardInformationPage reverse title="Uma experiência gamificada" content="Transforme o aprendizado em um jogo emocionante! Com pontuações, conquistas e níveis, nossa plataforma gamificada mantém você motivado enquanto aprende. Quanto mais você se desafia, mais recompensas ganha — e o conhecimento se torna a maior vitória!" lootFile={animationDataThridMainHome}/>

        <MainCardInformationPage title="E claro,o Ozzy, seu guia e parceiro nessa aventura!" content="Conheça o Ozzy, o cachorrinho que vai transformar seu aprendizado em uma aventura inesquecível! Sempre pronto para te motivar e te ajudar, o Ozzy é mais do que uma mascote — ele é seu parceiro de jornada. Aprender com ele é muito mais divertido!" lootFile={animationDataMainHome}/>

        <div className="text-center mb-20">
          <Link href="registro">
            <PrimaryButton type="button" label="INICIAR AVENTURA" size="large" onClick={()=>{}} />
          </Link>
          
        </div>
        
      </main>
    </div>
  );
}
