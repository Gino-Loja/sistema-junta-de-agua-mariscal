export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgbouncer: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth: {
        Args: {
          p_usename: string
        }
        Returns: {
          username: string
          password: string
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
  public: {
    Tables: {
      administradores: {
        Row: {
          celular: string | null
          estado: string | null
          fecha_creacion: string
          id: string
          nombres: string | null
          rol: string | null
          usuario: string | null
        }
        Insert: {
          celular?: string | null
          estado?: string | null
          fecha_creacion?: string
          id: string
          nombres?: string | null
          rol?: string | null
          usuario?: string | null
        }
        Update: {
          celular?: string | null
          estado?: string | null
          fecha_creacion?: string
          id?: string
          nombres?: string | null
          rol?: string | null
          usuario?: string | null
        }
        Relationships: []
      }
      certificado_digital: {
        Row: {
          certificado: string
          fecha_actualizacion: string | null
          fecha_caducidad: string | null
          id: number
          password: string | null
        }
        Insert: {
          certificado: string
          fecha_actualizacion?: string | null
          fecha_caducidad?: string | null
          id?: never
          password?: string | null
        }
        Update: {
          certificado?: string
          fecha_actualizacion?: string | null
          fecha_caducidad?: string | null
          id?: never
          password?: string | null
        }
        Relationships: []
      }
      empresa_informacion: {
        Row: {
          ciudad: string | null
          contribuyente_regimen_rimpe: string | null
          direccion: string | null
          email: string | null
          id: number
          logo: string | null
          nombre_comercial: string | null
          numero_establecimientos: string | null
          obligado_a_contabilidad: string | null
          razon_social: string | null
          ruc: string | null
          telefonos: string | null
        }
        Insert: {
          ciudad?: string | null
          contribuyente_regimen_rimpe?: string | null
          direccion?: string | null
          email?: string | null
          id?: never
          logo?: string | null
          nombre_comercial?: string | null
          numero_establecimientos?: string | null
          obligado_a_contabilidad?: string | null
          razon_social?: string | null
          ruc?: string | null
          telefonos?: string | null
        }
        Update: {
          ciudad?: string | null
          contribuyente_regimen_rimpe?: string | null
          direccion?: string | null
          email?: string | null
          id?: never
          logo?: string | null
          nombre_comercial?: string | null
          numero_establecimientos?: string | null
          obligado_a_contabilidad?: string | null
          razon_social?: string | null
          ruc?: string | null
          telefonos?: string | null
        }
        Relationships: []
      }
      facturas: {
        Row: {
          clave_acceso: string | null
          estado: string
          factura_json: Json | null
          fecha_emision: string
          id: number
          numero_factura: string | null
          usuario_id: number | null
          xml_firmado: unknown | null
        }
        Insert: {
          clave_acceso?: string | null
          estado: string
          factura_json?: Json | null
          fecha_emision: string
          id?: never
          numero_factura?: string | null
          usuario_id?: number | null
          xml_firmado?: unknown | null
        }
        Update: {
          clave_acceso?: string | null
          estado?: string
          factura_json?: Json | null
          fecha_emision?: string
          id?: never
          numero_factura?: string | null
          usuario_id?: number | null
          xml_firmado?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "facturas_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      incidentes: {
        Row: {
          costo: number | null
          descripcion: string | null
          fecha: string
          foto: string | null
          id: number
          sector_id: number | null
          usuario_id: number | null
        }
        Insert: {
          costo?: number | null
          descripcion?: string | null
          fecha?: string
          foto?: string | null
          id?: never
          sector_id?: number | null
          usuario_id?: number | null
        }
        Update: {
          costo?: number | null
          descripcion?: string | null
          fecha?: string
          foto?: string | null
          id?: never
          sector_id?: number | null
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "incidentes_sector_id_fkey"
            columns: ["sector_id"]
            referencedRelation: "sectores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidentes_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      lectura_anterior: {
        Row: {
          lectura: number | null
        }
        Insert: {
          lectura?: number | null
        }
        Update: {
          lectura?: number | null
        }
        Relationships: []
      }
      lectura_macromedidor: {
        Row: {
          consumo: number | null
          fecha: string | null
          id: number
          lectura: number | null
        }
        Insert: {
          consumo?: number | null
          fecha?: string | null
          id?: never
          lectura?: number | null
        }
        Update: {
          consumo?: number | null
          fecha?: string | null
          id?: never
          lectura?: number | null
        }
        Relationships: []
      }
      lecturas: {
        Row: {
          consumo: number
          exceso: number
          fecha: string
          id: number
          lectura_actual: number
          lectura_anterior: number
          medidor_id: number | null
          mes_truncado: string | null
        }
        Insert: {
          consumo: number
          exceso?: number
          fecha?: string
          id?: never
          lectura_actual: number
          lectura_anterior: number
          medidor_id?: number | null
          mes_truncado?: string | null
        }
        Update: {
          consumo?: number
          exceso?: number
          fecha?: string
          id?: never
          lectura_actual?: number
          lectura_anterior?: number
          medidor_id?: number | null
          mes_truncado?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consumos_medidor_id_fkey"
            columns: ["medidor_id"]
            referencedRelation: "medidores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumos_medidor_id_fkey"
            columns: ["medidor_id"]
            referencedRelation: "vista_medidores_usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      medidores: {
        Row: {
          detalle: string | null
          estado: string
          fecha_instalacion: string
          id: number
          numero_serie: string
          tipo: string
          usuario_id: number
        }
        Insert: {
          detalle?: string | null
          estado?: string
          fecha_instalacion: string
          id?: never
          numero_serie: string
          tipo: string
          usuario_id: number
        }
        Update: {
          detalle?: string | null
          estado?: string
          fecha_instalacion?: string
          id?: never
          numero_serie?: string
          tipo?: string
          usuario_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "medidor_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      metodos_pagos: {
        Row: {
          codigo: string | null
          descripcion: string | null
          id: number
        }
        Insert: {
          codigo?: string | null
          descripcion?: string | null
          id?: never
        }
        Update: {
          codigo?: string | null
          descripcion?: string | null
          id?: never
        }
        Relationships: []
      }
      multas: {
        Row: {
          estado: string | null
          fecha: string
          fecha_actualizacion: string | null
          id: number
          motivo: string
          usuario_id: number | null
        }
        Insert: {
          estado?: string | null
          fecha: string
          fecha_actualizacion?: string | null
          id?: never
          motivo: string
          usuario_id?: number | null
        }
        Update: {
          estado?: string | null
          fecha?: string
          fecha_actualizacion?: string | null
          id?: never
          motivo?: string
          usuario_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "multas_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      planillas: {
        Row: {
          estado: string | null
          fecha_actualizacion: string | null
          fecha_emision: string | null
          id: number
          id_lectura: number | null
          total_consumo: number | null
          total_exceso: number | null
          total_pagar: number | null
          valor_abonado: number | null
        }
        Insert: {
          estado?: string | null
          fecha_actualizacion?: string | null
          fecha_emision?: string | null
          id?: never
          id_lectura?: number | null
          total_consumo?: number | null
          total_exceso?: number | null
          total_pagar?: number | null
          valor_abonado?: number | null
        }
        Update: {
          estado?: string | null
          fecha_actualizacion?: string | null
          fecha_emision?: string | null
          id?: never
          id_lectura?: number | null
          total_consumo?: number | null
          total_exceso?: number | null
          total_pagar?: number | null
          valor_abonado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_lectura_id"
            columns: ["id_lectura"]
            referencedRelation: "lecturas"
            referencedColumns: ["id"]
          },
        ]
      }
      proveedores: {
        Row: {
          contacto: string | null
          email: string | null
          id: number
          nombre: string
          telefono: string | null
        }
        Insert: {
          contacto?: string | null
          email?: string | null
          id?: never
          nombre: string
          telefono?: string | null
        }
        Update: {
          contacto?: string | null
          email?: string | null
          id?: never
          nombre?: string
          telefono?: string | null
        }
        Relationships: []
      }
      sectores: {
        Row: {
          descripcion: string | null
          id: number
          nombre: string
        }
        Insert: {
          descripcion?: string | null
          id?: never
          nombre: string
        }
        Update: {
          descripcion?: string | null
          id?: never
          nombre?: string
        }
        Relationships: []
      }
      servicios: {
        Row: {
          cod_auxiliar: string | null
          cod_iva: string | null
          cod_principal: string | null
          ice: string | null
          id: number
          im_valor_agre: string | null
          nombre: string | null
          tipo: string | null
        }
        Insert: {
          cod_auxiliar?: string | null
          cod_iva?: string | null
          cod_principal?: string | null
          ice?: string | null
          id?: never
          im_valor_agre?: string | null
          nombre?: string | null
          tipo?: string | null
        }
        Update: {
          cod_auxiliar?: string | null
          cod_iva?: string | null
          cod_principal?: string | null
          ice?: string | null
          id?: never
          im_valor_agre?: string | null
          nombre?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      tarifas_agua: {
        Row: {
          id: number
          metros_base: number | null
          metros_base_exceso: number | null
          multa_sesiones: number | null
          valor_exceso: number
          valor_exceso_superior: number | null
          valor_m3: number
        }
        Insert: {
          id?: never
          metros_base?: number | null
          metros_base_exceso?: number | null
          multa_sesiones?: number | null
          valor_exceso: number
          valor_exceso_superior?: number | null
          valor_m3: number
        }
        Update: {
          id?: never
          metros_base?: number | null
          metros_base_exceso?: number | null
          multa_sesiones?: number | null
          valor_exceso?: number
          valor_exceso_superior?: number | null
          valor_m3?: number
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          cedula: string
          direccion: string
          email: string | null
          estado: boolean
          fecha_creacion: string
          id: number
          nombre: string
          sector_id: number | null
          telefono: string | null
          tipo: string
        }
        Insert: {
          cedula: string
          direccion: string
          email?: string | null
          estado?: boolean
          fecha_creacion?: string
          id?: never
          nombre: string
          sector_id?: number | null
          telefono?: string | null
          tipo?: string
        }
        Update: {
          cedula?: string
          direccion?: string
          email?: string | null
          estado?: boolean
          fecha_creacion?: string
          id?: never
          nombre?: string
          sector_id?: number | null
          telefono?: string | null
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_sector_id_fkey"
            columns: ["sector_id"]
            referencedRelation: "sectores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      administradores_con_email: {
        Row: {
          celular: string | null
          email: string | null
          estado: string | null
          fecha_creacion: string | null
          id: string | null
          nombres: string | null
          rol: string | null
          usuario: string | null
        }
        Relationships: []
      }
      vista_medidores_usuarios: {
        Row: {
          cedula: string | null
          detalle: string | null
          estado: string | null
          fecha_instalacion: string | null
          id: number | null
          nombre: string | null
          numero_serie: string | null
          tipo: string | null
          usuario_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "medidor_usuario_id_fkey"
            columns: ["usuario_id"]
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_counter_meter_water_by_id: {
        Args: {
          usuario_id_param: number
          medidor_id_param: number
          anio_param: number
        }
        Returns: number
      }
      get_water_meter_by_estatus: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          value: number
        }[]
      }
      get_water_meter_by_sector: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          value: number
        }[]
      }
      get_water_meter_by_type: {
        Args: Record<PropertyKey, never>
        Returns: {
          tipo: string
          cantidad: number
        }[]
      }
      get_water_meter_consumption_by_id: {
        Args: {
          medidor_id_param: number
        }
        Returns: number
      }
      get_water_meter_excess_by_id: {
        Args: {
          medidor_id_param: number
        }
        Returns: number
      }
      get_water_meter_lectures_by_id: {
        Args: {
          id_usuario: number
          id_medidor: number
          anio: number
        }
        Returns: {
          id: number
          fecha: string
          consumo: number
          lectura_anterior: number
          lectura_actual: number
          exceso: number
          medidor_id: number
        }[]
      }
      year_extract: {
        Args: {
          p_date: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          level: number | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          level?: number | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      prefixes: {
        Row: {
          bucket_id: string
          created_at: string | null
          level: number
          name: string
          updated_at: string | null
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          level?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          level?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prefixes_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_prefixes: {
        Args: {
          _bucket_id: string
          _name: string
        }
        Returns: undefined
      }
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      delete_prefix: {
        Args: {
          _bucket_id: string
          _name: string
        }
        Returns: boolean
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_level: {
        Args: {
          name: string
        }
        Returns: number
      }
      get_prefix: {
        Args: {
          name: string
        }
        Returns: string
      }
      get_prefixes: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_legacy_v1: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v1_optimised: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
      search_v2: {
        Args: {
          prefix: string
          bucket_name: string
          limits?: number
          levels?: number
          start_after?: string
        }
        Returns: {
          key: string
          name: string
          id: string
          updated_at: string
          created_at: string
          metadata: Json
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
  graphql_public: {
    Enums: {},
  },
  pgbouncer: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
  storage: {
    Enums: {},
  },
} as const
