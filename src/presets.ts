/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgentPreset } from './types';

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'billing',
    name: 'SaaS Billing Auditor',
    description: 'Autonomous financial agent checking invoices against contract SLAs and refund rules.',
    trigger: 'Chargeback Dispute Filed',
    knowledgeBase: 'Enterprise MSA & SLA agreement (PDF)',
    actionTool: 'Stripe Billings Gateway API',
    successOutcome: 'Invoice matches custom MSA tier. Generated SLA credit voucher draft auto-routed to Salesforce.',
    steps: [
      {
        type: 'trigger',
        title: 'Event Trigger received',
        detail: 'Chargeback alert: Invoice #INV-88320 disputed by Acme Corp (Billing anomaly claimed).',
        durationMs: 800
      },
      {
        type: 'knowledge',
        title: 'Accessing Enterprise Knowledge',
        detail: 'Scanning knowledge base for "Acme Corp Master Services Agreement.pdf" - clause 4.2: SLA Credits.',
        durationMs: 1400
      },
      {
        type: 'reasoning',
        title: 'Cognitive Reason & Verify',
        detail: 'Comparing SLA terms with Prometheus downtime logs on June 14th. Calculated uptime: 98.4%. Standard is 99.9%. Credit claim is VALID.',
        durationMs: 1600
      },
      {
        type: 'action',
        title: 'Action Execution',
        detail: 'Executing system action using Stripe Client API - Generating pending refund of $1,420.00.',
        durationMs: 1200
      },
      {
        type: 'outcome',
        title: 'Outcome delivered',
        detail: 'Dispute resolved. Credit voucher created, Slack notification issued to Finance Team, Salesforce CRM status updated.',
        durationMs: 900
      }
    ]
  },
  {
    id: 'sre',
    name: 'Autonomous SRE Operator',
    description: 'DevOps agent monitoring server metrics, referencing operational playbooks, and triggering failovers.',
    trigger: 'ScyllaDB Node latency > 800ms',
    knowledgeBase: 'Disaster Recovery Runbook #12 (Wiki)',
    actionTool: 'Kubernetes Cluster Control Plain CLI',
    successOutcome: 'Cluster scaled, traffic re-routed with 0 lost requests. System stabilized.',
    steps: [
      {
        type: 'trigger',
        title: 'Anomaly Trigger detected',
        detail: 'Datadog Alert: EU-West Database node ScyllaDB-3 experienced read latency spike (842ms).',
        durationMs: 700
      },
      {
        type: 'knowledge',
        title: 'Consulting System Manuals',
        detail: 'RAG query on Core Infrastructure Wiki: retrieving section "Hot Standby Switch & Query Shedding Guide".',
        durationMs: 1300
      },
      {
        type: 'reasoning',
        title: 'Reasoning & State Check',
        detail: 'Observed replica log coordinates match upstream primary. Safe to trigger switchover without data replication drift.',
        durationMs: 1500
      },
      {
        type: 'action',
        title: 'Executing Cluster commands',
        detail: 'Firing Kube-control call: shifting virtual IP from ScyllaDB-3 to warm-spare ScyllaDB-4 replica.',
        durationMs: 1400
      },
      {
        type: 'outcome',
        title: 'Resolved autonomously',
        detail: 'Average cluster response latency reduced to 16ms. Logged post-mortem draft in Confluence for DevOps review.',
        durationMs: 900
      }
    ]
  },
  {
    id: 'contract',
    name: 'Procurement Negotiator',
    description: 'Legal operations agent analyzing vendor revisions against company compliance baselines.',
    trigger: 'Vendor Contract Revision Submitted',
    knowledgeBase: 'Global Corporate Procurement Standards v4',
    actionTool: 'Docusign & Gmail Mailroom API',
    successOutcome: 'Redlined draft compiled, identifying 2 deviating clauses. Escalated draft to regional procurement lead.',
    steps: [
      {
        type: 'trigger',
        title: 'Document Incoming',
        detail: 'Received email from vendor "Heliux Infra" with attachment: Master_Vendor_Agreement_v2_Redlines.docx.',
        durationMs: 900
      },
      {
        type: 'knowledge',
        title: 'Retrieving Policy Guidelines',
        detail: 'Analyzing file structure & fetching compliance mandate: "Section 12.A Liability Indemnity Rules".',
        durationMs: 1200
      },
      {
        type: 'reasoning',
        title: 'AI Audit & Risk Analysis',
        detail: 'Found clause change: Vendor capped liability at 1x contract value. Compliance rule requires 3x minimum. Risk severity: HIGH.',
        durationMs: 1800
      },
      {
        type: 'action',
        title: 'Draft Redlining',
        detail: 'Generating DOCX annotations inserting counter-proposal of 3x liability with legal standard justification comments.',
        durationMs: 1300
      },
      {
        type: 'outcome',
        title: 'Workflow completed',
        detail: 'Redlined draft sent to Regional Legal Lead, annotated audit report saved to Google Drive, vendor status: Action Required.',
        durationMs: 1000
      }
    ]
  }
];
