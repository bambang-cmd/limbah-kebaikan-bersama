export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          created_at: string | null
          id: string
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collector_profiles: {
        Row: {
          business_address: string | null
          business_coordinates: unknown | null
          business_description: string | null
          business_name: string | null
          business_photo_url: string | null
          created_at: string | null
          current_tier: Database["public"]["Enums"]["collector_tier"] | null
          daily_capacity: number | null
          founding_year: number | null
          id: string
          is_verified: boolean | null
          price_list: Json | null
          specialties: string[] | null
          tier_expires_at: string | null
          trial_expires_at: string | null
          trial_status: Database["public"]["Enums"]["trial_status"] | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          business_address?: string | null
          business_coordinates?: unknown | null
          business_description?: string | null
          business_name?: string | null
          business_photo_url?: string | null
          created_at?: string | null
          current_tier?: Database["public"]["Enums"]["collector_tier"] | null
          daily_capacity?: number | null
          founding_year?: number | null
          id: string
          is_verified?: boolean | null
          price_list?: Json | null
          specialties?: string[] | null
          tier_expires_at?: string | null
          trial_expires_at?: string | null
          trial_status?: Database["public"]["Enums"]["trial_status"] | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          business_address?: string | null
          business_coordinates?: unknown | null
          business_description?: string | null
          business_name?: string | null
          business_photo_url?: string | null
          created_at?: string | null
          current_tier?: Database["public"]["Enums"]["collector_tier"] | null
          daily_capacity?: number | null
          founding_year?: number | null
          id?: string
          is_verified?: boolean | null
          price_list?: Json | null
          specialties?: string[] | null
          tier_expires_at?: string | null
          trial_expires_at?: string | null
          trial_status?: Database["public"]["Enums"]["trial_status"] | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collector_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_profiles: {
        Row: {
          created_at: string | null
          id: string
          job: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          job?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string
          id: string
          is_profile_complete: boolean | null
          name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          social_media_links: Json | null
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email: string
          id: string
          is_profile_complete?: boolean | null
          name?: string | null
          phone?: string | null
          role: Database["public"]["Enums"]["user_role"]
          social_media_links?: Json | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_profile_complete?: boolean | null
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          social_media_links?: Json | null
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      collector_tier: "pemula" | "amatir" | "advance" | "pro"
      trial_status: "pending" | "approved" | "rejected" | "expired"
      user_role: "customer" | "collector" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      collector_tier: ["pemula", "amatir", "advance", "pro"],
      trial_status: ["pending", "approved", "rejected", "expired"],
      user_role: ["customer", "collector", "admin"],
    },
  },
} as const
