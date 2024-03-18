import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { initSupabase } from '../utils/initSupabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient = createClient(
    initSupabase.supabaseUrl,
    initSupabase.supabaseKey
  );

  constructor() {}

  async getFormsData() {
    let data = await this.supabase.from('formdata').select('*');
    return data;
  }
}
