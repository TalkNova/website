/**
 * Renders the "Lead qualification & escalation" automation flow as themed HTML
 * for blog articles (injected via markdown code fences).
 *
 * Authors can use:
 *   ```flow
 *   ```
 * or any fence whose body looks like the ASCII escalation diagram —
 * plain ``` blocks with the ASCII flow also auto-upgrade.
 */

export type FlowDiagramBranch = {
  badge: string;
  tone: 'yes' | 'no';
  steps: string[];
};

export type FlowDiagramData = {
  eyebrow?: string;
  title?: string;
  steps?: string[];
  decision?: string;
  yes?: FlowDiagramBranch;
  no?: FlowDiagramBranch;
};

const DEFAULT_FLOW: Required<FlowDiagramData> = {
  eyebrow: 'Automation Flow',
  title: 'Lead qualification & escalation',
  steps: ['Inbound Prospect Enters Funnel', 'AI Qualification Engine'],
  decision: 'Is it High-Value / Enterprise?',
  yes: {
    badge: 'Yes · Escalate',
    tone: 'yes',
    steps: ['Ping Sales Rep via Slack/CRM', 'Full Transcript Delivered Live'],
  },
  no: {
    badge: 'No · Nurture',
    tone: 'no',
    steps: ['Continue AI Nurturing Loop', 'Drip Sequences, Content, FAQs'],
  },
};

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Detects the ASCII escalation flowchart used in CMS/blog Markdown. */
export function looksLikeEscalationFlow(code: string): boolean {
  const t = code.toLowerCase();
  return (
    (t.includes('inbound prospect') && t.includes('qualification')) ||
    (t.includes('high-value') && t.includes('enterprise')) ||
    (t.includes('yes') && t.includes('nurtur') && t.includes('escalat'))
  );
}

export function isFlowFenceLanguage(language: string): boolean {
  const lang = (language || '').toLowerCase().trim();
  return (
    lang === 'flow' ||
    lang === 'flowchart' ||
    lang === 'automation-flow' ||
    lang === 'escalation-flow'
  );
}

function connector(): string {
  return `<div class="blog-flow-connector" aria-hidden="true"><span class="blog-flow-connector-line"></span></div>`;
}

function stepCard(index: number, label: string): string {
  return `<div class="blog-flow-step">
  <span class="blog-flow-step-num" aria-hidden="true">${index}</span>
  <span class="blog-flow-step-label">${escapeHtml(label)}</span>
</div>`;
}

function branchCard(branch: FlowDiagramBranch): string {
  const tone = branch.tone === 'yes' ? 'yes' : 'no';
  const steps = branch.steps
    .map(
      (label, i) =>
        `${i > 0 ? connector() : ''}<div class="blog-flow-leaf">${escapeHtml(label)}</div>`,
    )
    .join('');

  return `<div class="blog-flow-branch blog-flow-branch--${tone}">
  <span class="blog-flow-badge blog-flow-badge--${tone}">${escapeHtml(branch.badge)}</span>
  <div class="blog-flow-branch-stack">${steps}</div>
</div>`;
}

/**
 * Optional JSON in a ```flow fence overrides defaults.
 * Empty / non-JSON bodies use the default escalation diagram.
 */
export function parseFlowDiagramData(code: string): FlowDiagramData {
  const trimmed = code.trim();
  if (!trimmed || looksLikeEscalationFlow(trimmed)) {
    return DEFAULT_FLOW;
  }
  try {
    const parsed = JSON.parse(trimmed) as FlowDiagramData;
    return {
      eyebrow: parsed.eyebrow ?? DEFAULT_FLOW.eyebrow,
      title: parsed.title ?? DEFAULT_FLOW.title,
      steps: parsed.steps?.length ? parsed.steps : DEFAULT_FLOW.steps,
      decision: parsed.decision ?? DEFAULT_FLOW.decision,
      yes: parsed.yes ?? DEFAULT_FLOW.yes,
      no: parsed.no ?? DEFAULT_FLOW.no,
    };
  } catch {
    return DEFAULT_FLOW;
  }
}

export function renderAutomationFlowDiagram(data: FlowDiagramData = {}): string {
  const resolved: Required<FlowDiagramData> = {
    eyebrow: data.eyebrow ?? DEFAULT_FLOW.eyebrow,
    title: data.title ?? DEFAULT_FLOW.title,
    steps: data.steps?.length ? data.steps : DEFAULT_FLOW.steps,
    decision: data.decision ?? DEFAULT_FLOW.decision,
    yes: data.yes ?? DEFAULT_FLOW.yes,
    no: data.no ?? DEFAULT_FLOW.no,
  };

  const stepsHtml = resolved.steps
    .map((label, i) => `${i > 0 ? connector() : ''}${stepCard(i + 1, label)}`)
    .join('');

  return `<figure class="blog-flow" role="img" aria-label="${escapeHtml(resolved.title)}">
  <figcaption class="blog-flow-header">
    <p class="blog-flow-eyebrow">${escapeHtml(resolved.eyebrow)}</p>
    <p class="blog-flow-title">${escapeHtml(resolved.title)}</p>
  </figcaption>
  <div class="blog-flow-body">
    <div class="blog-flow-main">
      ${stepsHtml}
      ${connector()}
      <div class="blog-flow-decision">
        <span class="blog-flow-decision-icon" aria-hidden="true"></span>
        <span class="blog-flow-decision-label">${escapeHtml(resolved.decision)}</span>
      </div>
      <div class="blog-flow-fork" aria-hidden="true">
        <span class="blog-flow-fork-stem"></span>
        <span class="blog-flow-fork-bar"></span>
        <span class="blog-flow-fork-left"></span>
        <span class="blog-flow-fork-right"></span>
      </div>
    </div>
    <div class="blog-flow-branches">
      ${branchCard(resolved.yes)}
      ${branchCard(resolved.no)}
    </div>
  </div>
</figure>`;
}
