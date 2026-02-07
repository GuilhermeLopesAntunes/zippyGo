
import ButtonBase from "./ButtonBase"
import type { ButtonProps } from "./Button.types"
import { buttonSizes } from "./Button.styles"

const Button = ({ label, onClick, size = "medium", type = "button", className = "" }: ButtonProps) => {
  const sizeClass = buttonSizes[size]

  return (
    <ButtonBase
      label={label}
      onClick={onClick}
      type={type}
      className={`${sizeClass} ${className}`}
    />
  )
}

export default Button