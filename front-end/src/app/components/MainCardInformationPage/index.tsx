import Lottie from "lottie-react"

interface cardTypes 
{
    title: string,
    content: string,
    lootFile:any,
    reverse?:boolean
}

const MainCard = ({title,content,lootFile,reverse}:cardTypes) =>{
return(
        <div className={`flex flex-col items-center gap-24 mb-30 xl:flex-row xl:justify-center ${
        reverse ? "xl:flex-row-reverse" : ""
      }`}>
          <div>
              <h2 className="md:text-2xl text-[#5B5DF0] text-center font-bold text-xl">{title}</h2>
            <p className="md:text-xl text-[#533D52] text-center font-mono md:w-[600px]">
              {content}
            </p>
          </div>
          
          <Lottie className="w-80 md:w-100 m-auto xl:m-0" animationData={lootFile} loop autoplay/>
        </div>
    )
}

export default MainCard