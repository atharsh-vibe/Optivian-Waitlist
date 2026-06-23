/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from './lib/supabase';
import { WaitlistEntry } from './types';

// Storage key
const STORAGE_KEY = 'optivian_waitlist_signups';

// Initialize with some highly professional initial signups to make the waitlist manager feel realistic and busy!
const SEED_SIGNUPS: WaitlistEntry[] = [
  {
    id: 'seed-1',
    email: 'sarah.chen@anthropic.com',
    createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), // 4h ago
    source: 'Hero Waitlist Form',
    companySize: '500-1000',
    role: 'Head of Engineering'
  },
  {
    id: 'seed-2',
    email: 'marcus.v@scale.com',
    createdAt: new Date(Date.now() - 12 * 3600000).toISOString(), // 12h ago
    source: 'Agent Sandbox Simulator',
    companySize: '100-500',
    role: 'Principal Agent SRE'
  },
  {
    id: 'seed-3',
    email: 'rebecca.g@replicate.com',
    createdAt: new Date(Date.now() - 26 * 3600000).toISOString(), // 26h ago
    source: 'Footer Waitlist Form',
    companySize: '10-50',
    role: 'Co-founder & AI Lead'
  }
];

export function getWaitlistEntries(): WaitlistEntry[] {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SIGNUPS));
      return SEED_SIGNUPS;
    }
    return JSON.parse(existing) as WaitlistEntry[];
  } catch (err) {
    console.error('Error reading waitlist storage', err);
    return SEED_SIGNUPS;
  }
}

export async function saveWaitlistEntry(email: string, details?: { source?: string, role?: string, companySize?: string }): Promise<WaitlistEntry[]> {
  const current = getWaitlistEntries();
  
  const newEntry: WaitlistEntry = {
    id: `waitlist-${Date.now()}`,
    email: email.trim(),
    createdAt: new Date().toISOString(),
    source: details?.source || 'Hero Form',
    companySize: details?.companySize || 'N/A',
    role: details?.role || 'N/A'
  };

  // Push to Supabase optionally
  try {
    const { error } = await supabase.from('waitlist').insert([
      {
        email: newEntry.email,
        source: newEntry.source,
        role: newEntry.role,
        company_size: newEntry.companySize
      }
    ]);
    
    if (error) {
      console.error('Supabase RLS or insert error:', error);
      // alert('Error saving to Supabase: ' + error.message);
    } else {
      console.log('Successfully saved to Supabase');
    }
  } catch (err) {
    console.error('Failed to post to Supabase', err);
  }

  // Check duplicate email locally BEFORE saving to local array
  // So that we don't spam local storage 
  if (current.some(entry => entry.email.toLowerCase() === email.toLowerCase())) {
    return current;
  }

  const updated = [newEntry, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function cleanAllSignups(): WaitlistEntry[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}
