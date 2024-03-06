import { Component} from 'vue'

export type Nullable<T> = T | null | undefined;

export interface Params {
    dp_type_id:number
    plate_id:number
    tab_id:number
}
export interface CardData {
    model: any
    [x: string]: any
    title:string
    desc?:string
    value1?:number
    value2?:number
    icon:string
    active?:boolean
    model:Component
    tips?:{x:string},
    list?:any,
    show?:string
    select:SelectParams[],
    keepAlive?:boolean|number
}

export interface SelectParams {
    label:string,
    value?:string|number
}