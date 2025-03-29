export interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg",
    text: string,
    startIcon?: any,
    endIcon?: any,
    onClick?: () => void,
    fullWidth?: boolean
}
const variantStyle = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600 ",
}
const defaultStyle = "rounded-lg flex font-light"
const sizeStyle = {
    "sm": "py-1 px-2",
    "md": "p-4",
    "lg": "p-6",
}
export const Button = (props: ButtonProps) => {
    return <button
                
                onClick={props.onClick} 
                className={`${variantStyle[props.variant]} 
                ${defaultStyle} 
                ${sizeStyle[props.size]} ${props.fullWidth ? " w-full flex justify-center items-center" : ""}
                `}> 
            <div 
                className="flex items-center">
                {props.startIcon ? <div>{props.startIcon}</div> : null} 
                <div 
                    className="pl-1 pr-1"> 
                    {props.text} 
                </div>
            </div>
        </button>
}