export type UserInputType = {
  name: string
  password: string
}

export type ItemType = {
  user_id: number
  id: string
  name: string
  content: string
  description?: string
}

export type ItemFormType = {
  name: string
  description?: string
  content: string
}

export type ItemInputType = {
  user_id: string
  name: string
  description?: string
  content: string
}

export type ItemUpdateInputType = {
  name?: string
  description?: string
  content?: string
}
