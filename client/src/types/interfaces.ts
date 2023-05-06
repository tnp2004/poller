export interface Poll {
    id: string
    title: string
    content: string
    colour: string
    options: Options[]
    tags: string[]
    created_at: string
    updated_at: string
}

export interface Options {
    choice: string
    colour: string
}

export interface FormPoll {
    title: string
    content: string
    options: Options[]
    tags: string[]
}