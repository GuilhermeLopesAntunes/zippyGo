export type ButtonSize = "small"|"medium"|"large";

export type ButtonProps = 
{
    label:string
    onClick ?: ()=> void
    size ?: ButtonSize
    type : 'button' | 'submit'
    className?: string
}