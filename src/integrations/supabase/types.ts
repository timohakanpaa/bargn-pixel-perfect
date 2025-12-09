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
      alert_configurations: {
        Row: {
          alert_type: string
          comparison: string
          created_at: string
          enabled: boolean
          funnel_id: string | null
          id: string
          notification_email: string | null
          threshold: number
          updated_at: string
        }
        Insert: {
          alert_type: string
          comparison: string
          created_at?: string
          enabled?: boolean
          funnel_id?: string | null
          id?: string
          notification_email?: string | null
          threshold: number
          updated_at?: string
        }
        Update: {
          alert_type?: string
          comparison?: string
          created_at?: string
          enabled?: boolean
          funnel_id?: string | null
          id?: string
          notification_email?: string | null
          threshold?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_configurations_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "conversion_funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_configurations_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnel_analytics"
            referencedColumns: ["funnel_id"]
          },
        ]
      }
      alert_logs: {
        Row: {
          alert_config_id: string | null
          funnel_id: string | null
          id: string
          message: string
          metadata: Json | null
          metric_value: number
          notification_sent: boolean | null
          threshold: number
          triggered_at: string
        }
        Insert: {
          alert_config_id?: string | null
          funnel_id?: string | null
          id?: string
          message: string
          metadata?: Json | null
          metric_value: number
          notification_sent?: boolean | null
          threshold: number
          triggered_at?: string
        }
        Update: {
          alert_config_id?: string | null
          funnel_id?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          metric_value?: number
          notification_sent?: boolean | null
          threshold?: number
          triggered_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_logs_alert_config_id_fkey"
            columns: ["alert_config_id"]
            isOneToOne: false
            referencedRelation: "alert_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_logs_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "conversion_funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alert_logs_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnel_analytics"
            referencedColumns: ["funnel_id"]
          },
        ]
      }
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
      conversion_funnels: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          steps: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          steps: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          steps?: Json
        }
        Relationships: []
      }
      funnel_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current_step: number
          funnel_id: string | null
          id: string
          metadata: Json | null
          session_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_step: number
          funnel_id?: string | null
          id?: string
          metadata?: Json | null
          session_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: number
          funnel_id?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funnel_progress_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "conversion_funnels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "funnel_progress_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnel_analytics"
            referencedColumns: ["funnel_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      analytics_button_clicks: {
        Row: {
          click_count: number | null
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
          avg_screen_width: number | null
          clicks: number | null
          conversions: number | null
          date: string | null
          page_views: number | null
          total_events: number | null
          unique_sessions: number | null
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
      funnel_analytics: {
        Row: {
          avg_completion_time_minutes: number | null
          completion_rate: number | null
          completions: number | null
          funnel_id: string | null
          funnel_name: string | null
          total_entries: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_funnel_cohort_analysis: {
        Args: {
          cohort_type: string
          days_back?: number
          funnel_id_param: string
        }
        Returns: {
          avg_time_to_complete: number
          cohort_name: string
          completion_rate: number
          completions: number
          total_entries: number
        }[]
      }
      get_funnel_dropoff: {
        Args: { days_back?: number; funnel_id_param: string }
        Returns: {
          drop_off_count: number
          drop_off_rate: number
          sessions_continued: number
          sessions_reached: number
          step_name: string
          step_number: number
        }[]
      }
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
