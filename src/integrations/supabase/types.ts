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
          created_by: string | null
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
          created_by?: string | null
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
          created_by?: string | null
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
      blog_articles: {
        Row: {
          author: string | null
          category: string | null
          content_en: string
          content_fi: string
          created_at: string
          created_by: string | null
          excerpt_en: string | null
          excerpt_fi: string | null
          id: string
          image_url: string | null
          keywords: string[] | null
          published_at: string | null
          scheduled_at: string | null
          slug: string
          status: string
          title_en: string
          title_fi: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content_en?: string
          content_fi?: string
          created_at?: string
          created_by?: string | null
          excerpt_en?: string | null
          excerpt_fi?: string | null
          id?: string
          image_url?: string | null
          keywords?: string[] | null
          published_at?: string | null
          scheduled_at?: string | null
          slug: string
          status?: string
          title_en?: string
          title_fi?: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content_en?: string
          content_fi?: string
          created_at?: string
          created_by?: string | null
          excerpt_en?: string | null
          excerpt_fi?: string | null
          id?: string
          image_url?: string | null
          keywords?: string[] | null
          published_at?: string | null
          scheduled_at?: string | null
          slug?: string
          status?: string
          title_en?: string
          title_fi?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_prompt_templates: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_default: boolean | null
          name: string
          prompt_template: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          prompt_template: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          prompt_template?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_schedules: {
        Row: {
          created_at: string
          created_by: string | null
          cron_expression: string | null
          id: string
          is_active: boolean | null
          keywords: string[]
          language: string
          last_run_at: string | null
          next_run_at: string | null
          prompt_template_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          cron_expression?: string | null
          id?: string
          is_active?: boolean | null
          keywords: string[]
          language?: string
          last_run_at?: string | null
          next_run_at?: string | null
          prompt_template_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          cron_expression?: string | null
          id?: string
          is_active?: boolean | null
          keywords?: string[]
          language?: string
          last_run_at?: string | null
          next_run_at?: string | null
          prompt_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_schedules_prompt_template_id_fkey"
            columns: ["prompt_template_id"]
            isOneToOne: false
            referencedRelation: "blog_prompt_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      content_materials: {
        Row: {
          caption: string
          created_at: string
          created_by: string | null
          id: string
          image_base64: string | null
          image_url: string | null
          platform: string
          status: string
          theme: string
          title: string
          updated_at: string
        }
        Insert: {
          caption: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_base64?: string | null
          image_url?: string | null
          platform: string
          status?: string
          theme: string
          title: string
          updated_at?: string
        }
        Update: {
          caption?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_base64?: string | null
          image_url?: string | null
          platform?: string
          status?: string
          theme?: string
          title?: string
          updated_at?: string
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
      [_ in never]: never
    }
    Functions: {
      can_access_alert_config: { Args: { config_id: string }; Returns: boolean }
      get_analytics_button_clicks: {
        Args: never
        Returns: {
          click_count: number
          date: string
          element_text: string
          event_name: string
          page_path: string
          unique_users: number
        }[]
      }
      get_analytics_daily_summary: {
        Args: never
        Returns: {
          avg_screen_width: number
          clicks: number
          conversions: number
          date: string
          page_views: number
          total_events: number
          unique_sessions: number
        }[]
      }
      get_analytics_page_views: {
        Args: never
        Returns: {
          date: string
          page_path: string
          page_title: string
          unique_visitors: number
          views: number
        }[]
      }
      get_funnel_analytics: {
        Args: never
        Returns: {
          avg_completion_time_minutes: number
          completion_rate: number
          completions: number
          funnel_id: string
          funnel_name: string
          total_entries: number
        }[]
      }
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
      insert_analytics_event: {
        Args: {
          p_element_class?: string
          p_element_id?: string
          p_element_text?: string
          p_event_name: string
          p_event_type: string
          p_language?: string
          p_metadata?: Json
          p_page_path?: string
          p_page_title?: string
          p_referrer?: string
          p_screen_height?: number
          p_screen_width?: number
          p_session_id: string
          p_user_agent?: string
        }
        Returns: string
      }
      insert_funnel_progress: {
        Args: {
          p_completed?: boolean
          p_current_step: number
          p_funnel_id: string
          p_metadata?: Json
          p_session_id: string
        }
        Returns: string
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
