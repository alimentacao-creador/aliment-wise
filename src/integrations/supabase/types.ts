export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      meal_images: {
        Row: {
          analysis_data: Json | null
          calories: number | null
          carbs: number | null
          created_at: string | null
          fat: number | null
          id: string
          image_url: string | null
          protein: number | null
          user_id: string
        }
        Insert: {
          analysis_data?: Json | null
          calories?: number | null
          carbs?: number | null
          created_at?: string | null
          fat?: number | null
          id?: string
          image_url?: string | null
          protein?: number | null
          user_id: string
        }
        Update: {
          analysis_data?: Json | null
          calories?: number | null
          carbs?: number | null
          created_at?: string | null
          fat?: number | null
          id?: string
          image_url?: string | null
          protein?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          alergias: string | null
          altura: number | null
          created_at: string | null
          email: string
          id: string
          idade: number | null
          nome: string | null
          objetivo: string | null
          peso: number | null
          sexo: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          alergias?: string | null
          altura?: number | null
          created_at?: string | null
          email: string
          id: string
          idade?: number | null
          nome?: string | null
          objetivo?: string | null
          peso?: number | null
          sexo?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          alergias?: string | null
          altura?: number | null
          created_at?: string | null
          email?: string
          id?: string
          idade?: number | null
          nome?: string | null
          objetivo?: string | null
          peso?: number | null
          sexo?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string | null
          id: string
          name: string
          order_index: number | null
          reps: number | null
          sets: number | null
          time_seconds: number | null
          weight: number | null
          workout_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          order_index?: number | null
          reps?: number | null
          sets?: number | null
          time_seconds?: number | null
          weight?: number | null
          workout_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          order_index?: number | null
          reps?: number | null
          sets?: number | null
          time_seconds?: number | null
          weight?: number | null
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string | null
          day_of_week: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      algorithm_sign: {
        Args: { algorithm: string; secret: string; signables: string }
        Returns: string
      }
      analytics_build_usage_month: {
        Args: { p_month: string }
        Returns: undefined
      }
      analytics_revenue_from_payments: {
        Args: { p_day?: string }
        Returns: undefined
      }
      analytics_snapshot_usage_day: {
        Args: { p_day?: string }
        Returns: undefined
      }
      consume_limit: {
        Args: { p_resource: string; p_user: string }
        Returns: boolean
      }
      ensure_daily_usage: {
        Args: { p_user: string }
        Returns: undefined
      }
      expire_due_subscriptions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      fn_calculate_bmi: {
        Args: { height_cm: number; weight_kg: number }
        Returns: number
      }
      fn_check_limit: {
        Args: { feature: string; u_id: string }
        Returns: {
          allowed: boolean
          remaining: number
        }[]
      }
      fn_increment_limit: {
        Args: { feature: string; inc?: number; u_id: string }
        Returns: undefined
      }
      fn_plan_limits: {
        Args: { u_id: string }
        Returns: {
          meal_limit: number
          msg_limit: number
        }[]
      }
      fn_subscricao_ativa: {
        Args: { p_user: string }
        Returns: {
          data_fim: string
          data_inicio: string
          estado: string
          plano: string
          user_id: string
        }[]
      }
      log_webhook: {
        Args: { p_event: string; p_payload: Json; p_source: string }
        Returns: undefined
      }
      process_refund: {
        Args: {
          p_amount: number
          p_currency?: string
          p_order_id?: string
          p_payload?: Json
          p_platform?: string
          p_user: string
        }
        Returns: undefined
      }
      reactivate_free_for_inactive: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      rpc_consume_limit: {
        Args: { p_resource: string }
        Returns: boolean
      }
      rpc_process_refund: {
        Args: {
          p_amount: number
          p_currency?: string
          p_order_id?: string
          p_payload?: Json
          p_platform?: string
          p_user: string
        }
        Returns: undefined
      }
      sign: {
        Args: { algorithm?: string; payload: Json; secret: string }
        Returns: string
      }
      try_cast_double: {
        Args: { inp: string }
        Returns: number
      }
      url_decode: {
        Args: { data: string }
        Returns: string
      }
      url_encode: {
        Args: { data: string }
        Returns: string
      }
      verify: {
        Args: { algorithm?: string; secret: string; token: string }
        Returns: {
          header: Json
          payload: Json
          valid: boolean
        }[]
      }
    }
    Enums: {
      estado_subscricao: "pending" | "active" | "cancelled" | "expired"
      plan_type: "free" | "premium"
      subscription_status: "active" | "expired" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_subscricao: ["pending", "active", "cancelled", "expired"],
      plan_type: ["free", "premium"],
      subscription_status: ["active", "expired", "cancelled"],
    },
  },
} as const
