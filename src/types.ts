export interface Event {
  title: string
  tagline: string
  date: string
  time: string
}

export interface Team {
  id: string
  name: string
  members: string[]
  avatar: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  scope: string
  caveat: string | null
  risk: string | null
}

export type Allocations = Record<string, string[]>

export interface Db {
  event: Event
  teams: Team[]
  products: Product[]
  allocations: Allocations
}
