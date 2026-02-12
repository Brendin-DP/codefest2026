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
  memberAvatars?: (string | null)[]
  repo?: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  subtitle?: string | null
  scope: string
  caveat: string | null
  risk: string | null
  difficulty?: number
  riskLevel?: number
  reward?: number
  logo?: string | null
  nonNegotiables?: string[] | null
  sanityChecklistPdf?: string | null
  chip?: string | null
}

export interface Db {
  event: Event
  teams: Team[]
  products: Product[]
}
