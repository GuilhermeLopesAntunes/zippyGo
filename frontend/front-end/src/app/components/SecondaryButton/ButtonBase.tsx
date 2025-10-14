import type { ButtonProps } from "./Button.types";

const ButtonBase = ({label, onClick, type = "button", className = ""}:ButtonProps) =>
{
return (
    <button 
    type={type} 
    className={className} 
    onClick={onClick}>
    {label}
    </button>
  )
}

export default ButtonBase