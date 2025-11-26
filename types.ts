
export enum RoleType {
  COMMERCIAL = 'Commerciale / Client Director',
  DIRECTOR = 'Director (Area Specifica)',
  COO = 'COO (Direzione Traffico)',
  ACCOUNT = 'Account Manager',
  EXECUTIVE_DIRECTOR = 'Executive Director',
  SPECIALISM = 'Specialism (Operativo)',
  ADMIN = 'Amministrazione',
  CEO = 'CEO'
}

export enum ProcessStage {
  PRE_CONTRACT = 'Acquisizione & Briefing',
  ACTIVATION = 'Attivazione & Strategia (The Hub)',
  PROPOSAL = 'Proposta & Setup Cronos',
  EXECUTION = 'Esecuzione & Controllo',
}

export interface AgencyRole {
  id: string;
  name: string;
  type: RoleType;
  responsibilities: string[];
  color: string;
  skills?: string[];
}

export interface GenericRole {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  tools?: string[];
  operational_flow?: string[];
}

export interface HierarchyNode {
  id: string;
  title: string;
  roleId?: string;
  children?: HierarchyNode[];
  isSeparateDept?: boolean;
}

export interface ProcessStep {
  id: string;
  stage: ProcessStage;
  title: string;
  description: string;
  rolesInvolved: string[];
  actions: string[];
  artifacts?: string[];
  tools?: string[];
}

export interface ScenarioStep {
  step: number;
  title: string;
  description: string;
  roles: string[];
  tools?: string[];
  artifact?: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  steps: ScenarioStep[];
}

// --- NEW BRIEFING TYPES ---

export type Department = 'Creative' | 'Media' | 'Digital' | 'Events' | 'Strategic' | 'PR';

export interface BriefingQuestion {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'number' | 'select';
  options?: string[];
  department?: Department; // If null, it's a general question
  isCustom?: boolean;
}

export interface BriefingState {
  clientName: string;
  lead: 'Giulio' | 'Loris' | null;
  selectedDepartments: Department[];
  answers: Record<string, string>;
  customQuestions?: BriefingQuestion[];
}

export interface UnitStrategy {
  unitName: string;
  directorName: string;
  internalInstructions: string[]; // List of specific tasks/directions for the director
  requiredOutput: string[]; // What the director needs to produce for the proposal (e.g. "Visual Concept", "Media Plan XLS")
  estimatedHours: number;
  keyConstraints: string;
}

export interface OperationalPlan {
  clientSummary: string;
  strategicOverview: string;
  macroTasks: { phase: string; tasks: string[] }[];
  unitStrategies: UnitStrategy[]; // Internal directions per unit
  totalEstimatedDurationWeeks: number;
}

export type MagicWandAction = 'expand' | 'shorten' | 'formalize' | 'bullet_points';
