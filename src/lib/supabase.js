import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfuqbkzgngfjwhaiucla.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmdXFia3pnbmdmandoYWl1Y2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwOTU5NjksImV4cCI6MjA4ODY3MTk2OX0.MexOXWktNBt1u6ryFejW055WWL0BCvLwp9GFEOoxdXY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)