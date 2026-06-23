/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared structural types for Optivian Coming Soon page and Agent Sandbox Simulator

export interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: string;
  source: string;
  companySize?: string;
  role?: string;
}

export type PresetId = 'billing' | 'sre' | 'contract';

export interface AgentPreset {
  id: PresetId;
  name: string;
  description: string;
  trigger: string;
  knowledgeBase: string;
  actionTool: string;
  steps: SimulationStep[];
  successOutcome: string;
}

export interface SimulationStep {
  type: 'trigger' | 'knowledge' | 'reasoning' | 'action' | 'outcome';
  title: string;
  detail: string;
  durationMs: number;
}

export interface CustomAgent {
  trigger: string;
  knowledgeBase: string;
  actionTool: string;
}
