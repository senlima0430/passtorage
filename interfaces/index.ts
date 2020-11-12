export type UserInputType = {
  name: string
  password: string
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
