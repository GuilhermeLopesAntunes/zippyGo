"use client"

import Lottie from "lottie-react"
import OzzyAnimation from "@/animation/OzzyDefaultAnimation.json"
import ProgressBar from "@ramonak/react-progress-bar"
import { BalloonTyping } from "../BalloonTyping"
import Link from "next/link"
import PrimaryButton from "@/app/components/PrimaryButton"
import SecondaryButton from "../SecondaryButton"
import Input from "@/app/components/Input"
import { useEffect, useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getFunction } from "../../services/APIServices"

import userIcon from "../../../../public/incons/UserIcon.svg"
import MailIcon from "../../../../public/incons/MailIcon.svg"
import PasswordIcon from "../../../../public/incons/PasswordIcon.svg"


type User = { username: string, email: string }
type RegisterData = {
  username: string
  email: string
  fullName: string
  password: string
  roomCode: string
}



export default function RegisterForm() {

  // Etapa atual
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Acumulo de dados
  const [registerData, setRegisterData] = useState<Partial<RegisterData>>({})

  // Para validações de username/email
  const [existingUsernames, setExistingUsernames] = useState<string[]>([])
  const [existingEmail, setExistingEmail] = useState<string[]>([])

  // Tamanhos
  const [buttonSize, setButtonSize] = useState<"small" | "medium" | "large">("small")
  const [inputSize, setInputSize] = useState<"small" | "medium" | "large">("small")

  useEffect(() => {
    async function loadUsers() {
      try {
        const data: User[] = await getFunction()
        setExistingUsernames(data.map(u => u.username))
        setExistingEmail(data.map(u => u.email))
      } catch (err) {
        console.error("Erro ao carregar usuários:", err)
      }
    }
    loadUsers()
  }, [])

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


  const usernameSchema = z.object({
    username: z.string()
      .min(6, "O Apelido precisa ter ao menos 6 caracteres")
      .refine(val => !existingUsernames.includes(val), { message: "Esse Apelido já existe!" })
  })

  const userInfoSchema = z.object({
    fullName: z.string().min(6, "Digite seu nome completo"),
    email: z.string().email("Email inválido").refine(val => !existingEmail.includes(val), { message: "Esse email já existe!" }),
    password: z.string().min(6, "A senha precisa de pelo menos 6 caracteres"),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  })

  const roomSchema = z.object({
    roomCode: z.string()
      .min(4, "O código da sala deve ter pelo menos 4 caracteres")
      .max(20, "Código muito longo")
  })

  // Forms separados por etapa
  const form1 = useForm({
    resolver: zodResolver(usernameSchema),
    mode: "onChange"
  })
  const form2 = useForm({
    resolver: zodResolver(userInfoSchema),
    mode: "onChange"
  })
  const form3 = useForm({
    resolver: zodResolver(roomSchema),
    mode: "onChange"
  })

  // ---------------------- HANDLERS -------------------------

  const nextStep1 = (data: any) => {
    setRegisterData(prev => ({ ...prev, username: data.username }))
    setStep(2)
  }

  const nextStep2 = (data: any) => {
    setRegisterData(prev => ({
      ...prev,
      fullName: data.fullName,
      email: data.email,
      password: data.password
    }))
    setStep(3)
  }

  const finishRegister = (data: any) => {
    const finalData: RegisterData = {
      ...registerData,
      roomCode: data.roomCode
    } as RegisterData

    console.log("📦 Enviar para a API:", finalData)
  }

  const goBack = () => {
    if (step === 2) {
      form2.reset()
      setStep(1)
    }
    else if (step === 3) {
      form3.reset()
      setStep(2)
    }
  }

  // ---------------------- RENDER -------------------------

  return (
    <>
      {/* ---------------------- ETAPA 1 ---------------------- */}
      {step === 1 && (
        <>
          <div className="flex flex-col mb-12">
            <Link href="/"><span className="text-3xl font-bold text-[#5B5DF0]">&lt;</span></Link>
            <span className="self-end">1/3 Etapas</span>
            <ProgressBar completed={33} bgColor="#5B5DF0" baseBgColor="#C6C7FA" />
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex items-center-safe gap-5 xl:gap-10">
              <Lottie className="w-[120px] md:w-[100px]" animationData={OzzyAnimation} />
              <BalloonTyping text="Olá, eu sou o Ozzy! Vamos embarcar juntos nessa aventura! Mas antes, preciso conhecer você." position="left" />
            </div>

            <p className="text-center">Antes de começarmos, qual será o seu Apelido na nossa aventura?</p>

            <form onSubmit={form1.handleSubmit(nextStep1)} className="text-center w-full">
              <Input
                {...form1.register("username")}
                className="justify-center mb-4"
                placeholder="Digite Seu Apelido"
                type="text"
                size={inputSize}
                iconImage={userIcon}
              />
              {form1.formState.errors.username && (
                <p className="text-red-500 mb-4">{form1.formState.errors.username.message}</p>
              )}
              <PrimaryButton type="submit" label="CONTINUAR" size={buttonSize} />
            </form>
          </div>
        </>
      )}

      {/* ---------------------- ETAPA 2 ---------------------- */}
      {step === 2 && (
        <>
          <div className="flex flex-col mb-12 mt-10">
            <span className="self-end">2/3 Etapas</span>
            <ProgressBar completed={66} bgColor="#5B5DF0" baseBgColor="#C6C7FA" />
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex items-center-safe gap-5 xl:gap-10">
              <Lottie className="w-[80px] md:w-[100px]" animationData={OzzyAnimation} />
              <BalloonTyping
                text={`Legal, ${registerData.username}! Agora, me diga como podemos manter sua conta segura.`}
                position="left"
              />
            </div>

            <p className="text-center">Digite seu Nome Completo, E-mail e escolha uma senha.</p>

            <form onSubmit={form2.handleSubmit(nextStep2)} className="text-center w-full">
              <Input
                {...form2.register("fullName")}
                className="justify-center mb-4"
                placeholder="Digite Seu Nome Completo"
                type="text"
                size={inputSize}
                iconImage={userIcon}
              />

              <Input
                {...form2.register("email")}
                className="justify-center mb-4"
                placeholder="Digite Seu Email"
                type="email"
                size={inputSize}
                iconImage={MailIcon}
              />

              <Input
                {...form2.register("password")}
                className="justify-center mb-4"
                placeholder="Digite Sua Senha"
                type="password"
                size={inputSize}
                iconImage={PasswordIcon}
              />

              <Input
                {...form2.register("confirmPassword")}
                className="justify-center mb-4"
                placeholder="Digite Sua Senha Novamente"
                type="password"
                size={inputSize}
                iconImage={PasswordIcon}
              />

              {Object.values(form2.formState.errors).map((err: any, idx) => (
                <p key={idx} className="text-red-500">{err.message}</p>
              ))}

              <div className="flex justify-evenly mt-6">
                <SecondaryButton type="button" onClick={goBack} label="VOLTAR" size={buttonSize} />
                <PrimaryButton type="submit" label="CONTINUAR" size={buttonSize} />
              </div>
            </form>
          </div>
        </>
      )}

      {/* ---------------------- ETAPA 3 ---------------------- */}
      {step === 3 && (
        <>
          <div className="flex flex-col mb-12 mt-10">
            <span className="self-end">3/3 Etapas</span>
            <ProgressBar completed={100} bgColor="#5B5DF0" baseBgColor="#C6C7FA" />
          </div>

          <div className="flex flex-col gap-16">
            <div className="flex items-center-safe gap-5 xl:gap-10">
              <Lottie className="w-[80px] md:w-[100px]" animationData={OzzyAnimation} />
              <BalloonTyping
                text={`Perfeito, ${registerData.username}! Agora, preciso do código da sua sala.`}
                position="left"
              />
            </div>

            <p className="text-center">Digite o código da sala fornecido pelo professor.</p>

            <form onSubmit={form3.handleSubmit(finishRegister)} className="text-center w-full">

              <Input
                {...form3.register("roomCode")}
                className="justify-center mb-4"
                placeholder="Código da Sala"
                type="text"
                size={inputSize}
                iconImage={PasswordIcon}
              />

              {form3.formState.errors.roomCode && (
                <p className="text-red-500 mb-4">{form3.formState.errors.roomCode.message}</p>
              )}

              <div className="flex justify-evenly">
                <SecondaryButton type="button" onClick={goBack} label="VOLTAR" size={buttonSize} />
                <PrimaryButton type="submit" label="FINALIZAR" size={buttonSize} />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}
