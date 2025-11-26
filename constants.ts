
import { AgencyRole, GenericRole, HierarchyNode, ProcessStep, ProcessStage, RoleType, Scenario } from './types';

export const PEOPLE: AgencyRole[] = [
  // --- CEO & ADMIN ---
  {
    id: 'ceo',
    name: 'Sara Serafini (CEO)',
    type: RoleType.CEO,
    responsibilities: ['Visione Aziendale', 'Supervisione Generale'],
    color: 'bg-slate-800',
    skills: ['Overall'],
  },
  {
    id: 'admin',
    name: 'Simona Massi',
    type: RoleType.ADMIN,
    responsibilities: ['Direzione Amministrativa', 'Controllo Mensile', 'Fatturazione'],
    color: 'bg-slate-500',
  },

  // --- COMMERCIAL ---
  {
    id: 'giulio',
    name: 'Giulio',
    type: RoleType.COMMERCIAL,
    responsibilities: ['Lead Generation', 'Client Director', 'Input al COO'],
    color: 'bg-blue-600',
  },
  {
    id: 'loris',
    name: 'Loris',
    type: RoleType.COMMERCIAL,
    responsibilities: ['Lead Generation', 'Client Director', 'Input al COO'],
    color: 'bg-indigo-600',
  },
  
  // --- COO ---
  {
    id: 'coo',
    name: 'Sara Serafini (COO)',
    type: RoleType.COO,
    responsibilities: ['Direzione Traffico', 'Attivazione Director', 'Scelta Account'],
    color: 'bg-rose-600',
    skills: ['Overall'],
  },

  // --- ACCOUNTS ---
  {
    id: 'acc_francesca',
    name: 'Francesca Nanni',
    type: RoleType.ACCOUNT,
    responsibilities: ['Gestione Cliente', 'Preventivi Cronos', 'Supervisione Digital'],
    color: 'bg-emerald-600',
    skills: ['Overall'],
  },
  {
    id: 'acc_giulia',
    name: 'Giulia Grandi',
    type: RoleType.ACCOUNT,
    responsibilities: ['Gestione Cliente', 'Preventivi Cronos', 'Performance'],
    color: 'bg-emerald-600',
    skills: ['Digital e Performance'],
  },
  {
    id: 'acc_sara_l',
    name: 'Sara Leoni',
    type: RoleType.ACCOUNT,
    responsibilities: ['Gestione Cliente', 'Project Management', 'Coordinamento'],
    color: 'bg-emerald-600',
    skills: ['Overall'],
  },
  {
    id: 'acc_ilaria',
    name: 'Ilaria Bigoni',
    type: RoleType.ACCOUNT,
    responsibilities: ['Gestione Cliente', 'Social Strategy', 'Digital PR'],
    color: 'bg-emerald-600',
    skills: ['Digital e Performance'],
  },

  // --- DIRECTORS ---
  {
    id: 'dir_creative',
    name: 'Paolo Ferrigno (Creative Dir)',
    type: RoleType.DIRECTOR,
    responsibilities: ['Visione Creativa', 'Supervisione Art/Copy'],
    color: 'bg-purple-600',
  },
  {
    id: 'dir_events',
    name: 'Lorena Mele (Events Dir)',
    type: RoleType.DIRECTOR,
    responsibilities: ['Strategia Eventi', 'Produzione', 'Gestione Diretta', 'Executive Role'],
    color: 'bg-orange-600',
  },
  {
    id: 'dir_strategic',
    name: 'Roberta Gasperoni (Strategic)',
    type: RoleType.DIRECTOR,
    responsibilities: ['Business Strategy', 'Consulenza Alto Livello'],
    color: 'bg-slate-700',
  },
  {
    id: 'dir_media',
    name: 'Massimiliano Palombi (Media)',
    type: RoleType.DIRECTOR,
    responsibilities: ['Media Strategy', 'Buying', 'Analisi Dati'],
    color: 'bg-cyan-600',
  },
  
  // --- DIGITAL & TECH ---
  {
    id: 'spec_stefano',
    name: 'Stefano Giurin',
    type: RoleType.SPECIALISM,
    responsibilities: ['SEO', 'Marketing Automation', 'Web'],
    color: 'bg-pink-600',
  },
  {
    id: 'spec_giacomo',
    name: 'Giacomo Neri',
    type: RoleType.SPECIALISM,
    responsibilities: ['SEO', 'Marketing Automation', 'Sviluppo Siti'],
    color: 'bg-blue-500',
  },

  // --- EXECUTIVE DIRECTORS ---
  {
    id: 'exec_creative',
    name: 'Luca Sensi (Exec Creative)',
    type: RoleType.EXECUTIVE_DIRECTOR,
    responsibilities: ['Coord. Creativi', 'Supervisione Task', 'Definizione Ore'],
    color: 'bg-teal-700',
  },
  {
    id: 'exec_comm',
    name: 'Exec. Communication',
    type: RoleType.EXECUTIVE_DIRECTOR,
    responsibilities: ['Coord. Social/PR', 'Supervisione Contenuti', 'Definizione Ore'],
    color: 'bg-teal-700',
  },
   {
    id: 'exec_digital',
    name: 'Exec. Digital',
    type: RoleType.EXECUTIVE_DIRECTOR,
    responsibilities: ['Coord. Tech Team', 'Supervisione Sviluppo', 'Definizione Ore'],
    color: 'bg-teal-700',
  },

  // --- SPECIALISMS ---
  {
    id: 'team_social',
    name: 'Team Social',
    type: RoleType.SPECIALISM,
    responsibilities: ['Carlotta', 'Veronica', 'Virginia', 'Patricia'],
    color: 'bg-pink-500',
  },
  {
    id: 'team_creative',
    name: 'Team Creativo',
    type: RoleType.SPECIALISM,
    responsibilities: ['Marco Russo', 'Caterina Olivetti', 'TBD (Graphic)'],
    color: 'bg-purple-400',
  },
];

export const GENERIC_ROLES: GenericRole[] = [
  {
    id: 'ceo_role',
    title: 'CEO',
    description: 'Vertice aziendale.',
    responsibilities: ['Visione strategica', 'Supervisione finanziaria', 'Decision making finale']
  },
  {
    id: 'client_director',
    title: 'Client Director (Commerciale)',
    description: 'Responsabile acquisizione e relazione alto livello.',
    responsibilities: ['Lead Generation', 'Briefing iniziale', 'Validazione Pricing con Account']
  },
  {
    id: 'coo_role',
    title: 'COO (Direzione Traffico)',
    description: 'Orchestratore operativo.',
    responsibilities: ['Analisi Brief', 'Attivazione Director di reparto', 'Scelta Account Manager', 'Supporto scelta Task Force']
  },
  {
    id: 'account_manager',
    title: 'Account Manager',
    description: 'Gestore del cliente e del progetto.',
    responsibilities: ['Interfaccia Cliente', 'Creazione Preventivo (Cronos)', 'Creazione Slide (Canva/Gamma)', 'Setup Commessa Cronos', 'Lead Task Force']
  },
  {
    id: 'director',
    title: 'Director di Area',
    description: 'Responsabile strategico di dipartimento.',
    responsibilities: ['Strategia verticale', 'Innovazione di reparto', 'Supporto all\'Account in fase proposta']
  },
  {
    id: 'executive_director',
    title: 'Executive Director',
    description: 'Coordinatore tecnico del team operativo.',
    responsibilities: ['Non è un capo gerarchico ma funzionale', 'Definizione Ore/Micro-task con Account', 'Controllo avanzamento lavori', 'Qualità output']
  },
  {
    id: 'specialism',
    title: 'Specialism / Operativo',
    description: 'Esecutore tecnico.',
    responsibilities: ['Esecuzione task', 'Compilazione Timesheet su Cronos', 'Partecipazione Task Force']
  }
];

export const HIERARCHY: HierarchyNode[] = [
  {
    id: 'ceo_root',
    title: 'Sara Serafini (CEO)',
    children: [
      {
        id: 'admin_node',
        title: 'Simona Massi (Admin Director)',
        isSeparateDept: true
      },
      {
        id: 'comm_dept',
        title: 'Commerciale',
        children: [
          { id: 'sales_1', title: 'Giulio (Client Dir)' },
          { id: 'sales_2', title: 'Loris (Client Dir)' }
        ]
      },
      {
        id: 'coo_node',
        title: 'Sara Serafini (COO)',
        children: [
           {
             id: 'strat_unit',
             title: 'Strategia',
             children: [{id: 'strat_d', title: 'Roberta Gasperoni'}]
           },
           {
             id: 'creative_unit',
             title: 'Creatività',
             children: [
               { id: 'cd', title: 'Paolo Ferrigno (Dir)' },
               { 
                 id: 'exec_c', 
                 title: 'Luca Sensi (Exec)',
                 children: [
                   { id: 'art', title: 'Marco Russo' },
                   { id: 'jr', title: 'Caterina Olivetti' }
                 ]
               }
             ]
           },
           {
             id: 'social_unit',
             title: 'Social & Comm.',
             children: [
               { 
                 id: 'exec_s', 
                 title: 'Exec. Communication',
                 children: [
                   { id: 'soc_team', title: 'Patricia, Carlotta, Veronica, Virginia' }
                 ]
               }
             ]
           },
           {
             id: 'events_unit',
             title: 'Eventi',
             children: [
               { id: 'ev_dir', title: 'Lorena Mele (Dir/Exec)' },
               { id: 'pr', title: 'Paola Conficoni (PR)' },
               { id: 'tbd', title: 'TBD (Operativo)' }
             ]
           },
           {
             id: 'media_unit',
             title: 'Media',
             children: [
               { id: 'media_d', title: 'Massimiliano Palombi (Dir)' },
               { id: 'exec_m', title: 'Exec. Media' }
             ]
           },
           {
             id: 'digital_unit',
             title: 'Digital',
             children: [
               { 
                 id: 'exec_d', 
                 title: 'Exec. Digital (Dir)',
                 children: [
                   { id: 'stefano', title: 'Stefano Giurin' },
                   { id: 'giacomo', title: 'Giacomo Neri' }
                 ]
               }
             ]
           }
        ]
      }
    ]
  }
];

export const WORKFLOW_STEPS: ProcessStep[] = [
  {
    id: 'acq_1',
    stage: ProcessStage.PRE_CONTRACT,
    title: 'Briefing & Standardizzazione',
    description: 'Giulio o Loris ingaggiano il cliente. Creazione del "Brief Standardizzato".',
    rolesInvolved: ['giulio', 'loris'],
    actions: ['Raccolta Info', 'Brief Standardizzato'],
    tools: ['Teams (Meeting)'],
    artifacts: ['Brief Standard'],
  },
  {
    id: 'act_1',
    stage: ProcessStage.ACTIVATION,
    title: 'Direzione Traffico (COO)',
    description: 'Sara Serafini (COO) attiva i Director specifici e assegna l\'Account.',
    rolesInvolved: ['coo', 'giulio', 'loris'],
    actions: ['Analisi Brief', 'Assegnazione Account'],
    tools: ['Teams (Chat Coordinamento)'],
    artifacts: ['Piano di Attivazione'],
  },
  {
    id: 'act_2',
    stage: ProcessStage.ACTIVATION,
    title: 'Formulazione Strategia',
    description: 'I Director producono la strategia. L\'Account raccoglie le info.',
    rolesInvolved: ['dir_creative', 'dir_media', 'dir_events', 'account'],
    actions: ['Strategia di Reparto'],
    tools: ['Teams (Video)', 'OneDrive'],
    artifacts: ['Deck Strategico'],
  },
  {
    id: 'prop_1',
    stage: ProcessStage.PROPOSAL,
    title: 'Preventivo & Presentazione',
    description: 'L\'Account crea il preventivo su Cronos e la presentazione su Canva/Gamma.',
    rolesInvolved: ['account', 'giulio', 'loris'],
    actions: ['Caricamento Fornitori', 'Definizione Margini'],
    tools: ['Cronos', 'Canva / Gamma', 'OneDrive'],
    artifacts: ['Preventivo PDF', 'Pitch Deck'],
  },
  {
    id: 'exec_1',
    stage: ProcessStage.EXECUTION,
    title: 'Setup Operativo (COO + Account)',
    description: 'Account ed Exec. Director definiscono i micro-task. Scelta team con il COO.',
    rolesInvolved: ['account', 'exec_dir', 'coo'],
    actions: ['Setup Commessa', 'Scelta Task Force'],
    tools: ['Cronos (Project Mgmt)'],
    artifacts: ['Piano Operativo'],
  },
  {
    id: 'exec_2',
    stage: ProcessStage.EXECUTION,
    title: 'Execution & Controllo',
    description: 'La Task Force lavora. Account guida, Exec controlla timesheet vs task.',
    rolesInvolved: ['specialism', 'exec_dir', 'account'],
    actions: ['Esecuzione', 'Log Timesheet'],
    tools: ['Cronos (Timesheet)', 'Teams'],
    artifacts: ['Report', 'Deliverables'],
  },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'scen_digital',
    title: 'Flusso 1: Digital / Social',
    description: 'Dal Lead di Giulio/Loris all\'attivazione di Francesca Nanni e Team Social.',
    steps: [
      {
        step: 1,
        title: 'Ingresso & Brief (Giulio/Loris)',
        description: 'Giulio/Loris incontrano il cliente. Definiscono il budget e passano il "Brief Standardizzato" a Sara Serafini (COO).',
        roles: ['Giulio/Loris', 'Sara Serafini'],
        tools: ['Teams (Meeting)'],
        artifact: 'Brief PDF'
      },
      {
        step: 2,
        title: 'Attivazione & Strategia',
        description: 'Sara (COO) attiva Francesca Nanni (Account) e i Director. Francesca raccoglie info.',
        roles: ['Sara Serafini', 'Francesca Nanni'],
        tools: ['Teams Chat'],
        artifact: 'Draft Strategia'
      },
      {
        step: 3,
        title: 'Proposta & Cronos (Account)',
        description: 'Francesca crea il preventivo su Cronos, la presentazione su Canva/Gamma e carica su OneDrive.',
        roles: ['Francesca Nanni'],
        tools: ['Cronos', 'Canva/Gamma', 'OneDrive'],
        artifact: 'Preventivo & Slide'
      },
      {
        step: 4,
        title: 'Setup Esecutivo (Account + Exec + COO)',
        description: 'Francesca carica la commessa su Cronos. Con l\'Exec Digital scrive i micro-task. Con il COO sceglie gli operativi (es. Giacomo Neri).',
        roles: ['Francesca Nanni', 'Exec Digital', 'COO'],
        tools: ['Cronos (Commessa)'],
        artifact: 'Micro-Task Attivi'
      }
    ]
  },
  {
    id: 'scen_event',
    title: 'Flusso 2: Eventi (Lorena Mele)',
    description: 'Dal Lead di Giulio/Loris alla gestione diretta di Lorena Mele.',
    steps: [
      {
        step: 1,
        title: 'Ingresso & Brief Diretto',
        description: 'Giulio/Loris portano un lead "Evento". Passano l\'info a Lorena Mele (Director Eventi).',
        roles: ['Giulio/Loris', 'Lorena Mele'],
        tools: ['Teams'],
        artifact: 'Brief Evento'
      },
      {
        step: 2,
        title: 'Preventivazione (Lorena)',
        description: 'Lorena agisce da Account: crea il preventivo su Cronos, contatta fornitori e crea la presentazione.',
        roles: ['Lorena Mele'],
        tools: ['Cronos', 'Canva'],
        artifact: 'Proposta Economica'
      },
      {
        step: 3,
        title: 'Setup & Logistica',
        description: 'Lorena definisce la Run Sheet e attiva l\'Exec Eventi per la logistica.',
        roles: ['Lorena Mele', 'Exec. Eventi'],
        tools: ['Cronos'],
        artifact: 'Run Sheet'
      },
      {
        step: 4,
        title: 'On-Site Execution',
        description: 'Squadra evento (Paola Conficoni, ecc.) in loco. Lorena dirige.',
        roles: ['Lorena Mele', 'Team Eventi'],
        tools: ['Live'],
        artifact: 'Evento Concluso'
      }
    ]
  }
];
