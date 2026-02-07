export type inputSizes =  "small" | "medium" | "large"

export interface inputProps
{


    placeholder ?: string
    type : string
    className ?: string
    size : inputSizes
    iconImage: string
    
    
}