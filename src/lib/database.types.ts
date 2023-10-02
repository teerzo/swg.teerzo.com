export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      characters: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean
          is_private: boolean
          name: string
          profession: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_private?: boolean
          name?: string
          profession?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean
          is_private?: boolean
          name?: string
          profession?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          created_at: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
