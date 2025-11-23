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
      analytics_events: {
        Row: {
          created_at: string | null
          element_class: string | null
          element_id: string | null
          element_text: string | null
          event_name: string
          event_type: string
          id: string
          language: string | null
          metadata: Json | null
          page_path: string | null
          page_title: string | null
          referrer: string | null
          screen_height: number | null
          screen_width: number | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          element_class?: string | null
          element_id?: string | null
          element_text?: string | null
          event_name: string
          event_type: string
          id?: string
          language?: string | null
          metadata?: Json | null
          page_path?: string | null
          page_title?: string | null
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          element_class?: string | null
          element_id?: string | null
          element_text?: string | null
          event_name?: string
          event_type?: string
          id?: string
          language?: string | null
          metadata?: Json | null
          page_path?: string | null
          page_title?: string | null
          referrer?: string | null
          screen_height?: number | null
          screen_width?: number | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      chat_analytics: {
        Row: {
          ai_response: string | null
          created_at: string | null
          error_message: string | null
          error_occurred: boolean | null
          id: string
          language: string | null
          response_time_ms: number | null
          session_id: string
          user_message: string
        }
        Insert: {
          ai_response?: string | null
          created_at?: string | null
          error_message?: string | null
          error_occurred?: boolean | null
          id?: string
          language?: string | null
          response_time_ms?: number | null
          session_id: string
          user_message: string
        }
        Update: {
          ai_response?: string | null
          created_at?: string | null
          error_message?: string | null
          error_occurred?: boolean | null
          id?: string
          language?: string | null
          response_time_ms?: number | null
          session_id?: string
          user_message?: string
        }
        Relationships: []
      }
    }
    Views: {
      analytics_button_clicks: {
        Row: {
          clicks: number | null
          date: string | null
          element_text: string | null
          event_name: string | null
          page_path: string | null
          unique_users: number | null
        }
        Relationships: []
      }
      analytics_daily_summary: {
        Row: {
          button_clicks: number | null
          date: string | null
          form_submissions: number | null
          navigation_events: number | null
          page_views: number | null
          total_events: number | null
          unique_sessions: number | null
        }
        Relationships: []
      }
      analytics_navigation_flow: {
        Row: {
          created_at: string | null
          next_page: string | null
          page_path: string | null
          page_title: string | null
          previous_page: string | null
          session_id: string | null
        }
        Relationships: []
      }
      analytics_page_views: {
        Row: {
          date: string | null
          page_path: string | null
          page_title: string | null
          unique_visitors: number | null
          views: number | null
        }
        Relationships: []
      }
      chat_analytics_summary: {
        Row: {
          avg_response_time_ms: number | null
          date: string | null
          error_count: number | null
          language: string | null
          total_messages: number | null
          unique_sessions: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_top_events: {
        Args: {
          days_back?: number
          event_type_filter: string
          limit_count?: number
        }
        Returns: {
          event_count: number
          event_name: string
          unique_sessions: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
