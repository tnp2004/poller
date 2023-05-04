export interface Poll {
    id: string
    title: string
    content: string
    options: Options
    created_at: string
    updated_at: string
}

export interface Options {
    [key: string]: number
}