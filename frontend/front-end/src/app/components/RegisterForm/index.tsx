"use client"

import Lottie from "lottie-react"
import OzzyAnimation from "@/animation/OzzyDefaultAnimation.json"
import ProgressBar from "@ramonak/react-progress-bar"
import { BalloonTyping } from "../BalloonTyping"
import Link from "next/link"
import PrimaryButton from "@/app/components/PrimaryButton"
import Input from "@/app/components/Input"
import { useEffect, useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { email, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getFunction } from "../../services/APIServices"
import SecondaryButton from "../SecondaryButton"
import userIcon from "../../../../public/incons/UserIcon.svg"
import MailIcon from "../../../../public/incons/MailIcon.svg"
import PasswordIcon from "../../../../public/incons/PasswordIcon.svg"
type User = { username: string, email: string }

export default function RegisterForm() {
  const [buttonSize, setButtonSize] = useState<"small" | "medium" | "large">("small")
  const [inputSize, setInputSize] = useState<"small" | "medium" | "large">("small")
  const [existingUsernames, setExistingUsernames] = useState<string[]>([])
  const [existingEmail, setExistingEmail] = useState<string[]>([])
  const[registerData, setRegisterData] = useState<UsernameSchema[]>([])

  useEffect(() => {
    async function loadUsers() {
      try {
        const data: User[] = await getFunction()
        setExistingUsernames(data.map(u => u.username))
        setExistingEmail(data.map(u =>u.email))
      } catch (err) {
        console.error("Erro ao carregar usuários:", err)
      }
    }
    loadUsers()
  }, [])
 
  // Ajuste de tamanhos
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setInputSize("large")
        setButtonSize("large")
      } else if (window.innerWidth >= 768) {
        setInputSize("medium")
        setButtonSize("medium")
      } else {
        setInputSize("small")
        setButtonSize("small")
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Schema Zod dependente da lista de usernames
  const usernameSchema = useMemo(() => {
    return z.object({
      username: z
        .string()
        .min(6, "O Apelido precisa ter ao menos 6 caracteres")
        .refine(
          val => !existingUsernames.includes(val),
          { message: "Esse Apelido já existe!" }
        ),
        email: z.string().refine(val=>!existingEmail.includes(val), {message:"Esse email já Existe"})
    },
    
  )
  }, [existingUsernames, existingEmail])

  type UsernameSchema = z.infer<typeof usernameSchema>


  const { register, handleSubmit, formState: { errors } } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
    mode: "onChange"
  })

  const handleUsernameForm = (data:UsernameSchema ) => {
    
    setRegisterData((prev)=>[...prev,data])
    console.log("Form enviado:", registerData)
    // Aqui você pode enviar para a API para salvar
  }

  return (
    <>
      <div className="flex flex-col mb-12">
        <Link href="/">
          <span className="text-3xl font-bold text-[#5B5DF0]">&lt;</span>
        </Link>
        <span className="self-end">1/3 Etapas</span>
        <ProgressBar completed={33} bgColor="#5B5DF0" baseBgColor="#C6C7FA" labelColor="#5B5DF0" />
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex items-center-safe gap-5 xl:gap-10">
          <Lottie className="w-[80px] md:w-[100px] flex-none" animationData={OzzyAnimation} />
          <BalloonTyping text="Olá, eu sou o Ozzy! Vamos embarcar juntos nessa aventural! Mas antes, preciso conhecer você." position="left" />
        </div>

        <p className="text-center">Antes de começarmos, qual será o seu Apelido na nossa aventura?</p>

        <form onSubmit={handleSubmit(handleUsernameForm)} className="text-center w-full">
          <Input
            {...register("username")}
            className="justify-center mb-4"
            placeholder="Digite Seu Apelido"
            type="text"
            size={inputSize}
            iconImage={userIcon}
          />
          {errors.username && <p className="text-red-500 mb-4">{errors.username.message}</p>}
          <PrimaryButton className="flex-none" type="submit" label="CONTINUAR" size={buttonSize} />
        </form>
      </div>





      <div className="flex flex-col mb-12">
        <span className="self-end">2/3 Etapas</span>
        <ProgressBar completed={66} bgColor="#5B5DF0" baseBgColor="#C6C7FA" labelColor="#5B5DF0" />
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex items-center-safe gap-5 xl:gap-10">
          <Lottie className="w-[80px] md:w-[100px] flex-none" animationData={OzzyAnimation} />
          <BalloonTyping text={`Legal, ${registerData.map(value => value.username)}! Agora, me diga como podemos manter sua conta segura. `} position="left" />
        </div>

        <p className="text-center">Digite seu Nome Completo, E-mail (Ou do responsável) e escolha uma senha.</p>

        <form className="text-center w-full">
          <Input
            className="justify-center mb-4"
            placeholder="Digite Seu Nome Completo   "
            type="text"
            size={inputSize}
            iconImage={userIcon}
          />
          <Input
            {...register("email")}
            className="justify-center mb-4"
            placeholder="Digite Seu Email (Ou do responsável)"
            type="email"
            size={inputSize}
            iconImage={MailIcon}
          />
          <Input
            className="justify-center mb-4"
            placeholder="Digite Sua Senha"
            type="password"
            size={inputSize}
            iconImage={PasswordIcon}
          />
          <Input
            className="justify-center mb-4"
            placeholder="Digite Sua Senha Novamente"
            type="password"
            size={inputSize}
            iconImage={PasswordIcon}
          />
          {errors.email && <p className="text-red-500 mb-4">{errors.email.message}</p>}
          <div className="flex justify-evenly">
            <SecondaryButton className="flex-none" type="submit" label="VOLTAR" size={buttonSize}/>
            <PrimaryButton className="flex-none" type="button" label="CONTINUAR" size={buttonSize} />
          </div>
          
          
        </form>
      </div>
    </>
  )
}
