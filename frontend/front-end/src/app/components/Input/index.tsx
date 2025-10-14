import type {inputProps} from "./Input.types"
import { inputStyles } from "./Input.styles"
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import EyeAnimation from "../../../../public/incons/passwordVisibility.json"
import { useEffect, useRef, useState } from "react";





const Input = ({placeholder,type,className,size = "medium", iconImage, ...rest}: inputProps)=>
{
    const sizeClass = inputStyles[size]

    const [visible,setVisible] = useState(false)
    const LottieRef = useRef<LottieRefCurrentProps>(null)

   useEffect(() => {
  
  if (type === "password") {
    LottieRef.current?.goToAndStop(0, true); 
  }
}, [type]);

const togglePassword = () => {
  setVisible(!visible);

  if (!visible) {

    LottieRef.current?.playSegments([0, 60], true);
  } else {

    LottieRef.current?.playSegments([60, 0], true);
  }
};


    
    
    
    return(
        <div className={`flex items-center ${className} `}>
            <div className="flex items-center justify-center border-[#9092FC] px-4 h-[54px] border-r-0 rounded-l-3xl border-2 bg-[#DBDBFF]">
                <Image className="w-5" src={iconImage} alt="icone de usuário"/>
            </div>
            <input  
            type={type== "password" && !visible ? type : "text"} 
            placeholder={placeholder}
            className={sizeClass}
            {...rest} // <- o register vai cair aqui!
        />
            <div className="flex items-center justify-center border-[#9092FC] px-4 h-[54px] border-l-0 rounded-r-3xl border-2 bg-[#DBDBFF]">
                {type=="password" ? 
                <button type="button" onClick={togglePassword}>
                    <Lottie 
                className="w-6 " 
                lottieRef={LottieRef}
                animationData={EyeAnimation} 
                loop = {false}
                autoplay ={false}


                
                />
                </button>
                 : <Lottie className="invisible w-6" animationData={EyeAnimation} />}
                

            </div>
        </div>
    )
}

export default Input