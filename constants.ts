
import { AgencyRole, GenericRole, HierarchyNode, ProcessStep, ProcessStage, RoleType, Scenario } from './types';

export const PEOPLE: AgencyRole[] = [
  // --- CEO & ADMIN ---
  {
    id: 'ceo',
    name: 'Loris Zanelli (CEO)',
    type: RoleType.CEO,
    responsibilities: ['Visione Aziendale', 'Supervisione Commerciale', 'Client Director'],
    color: 'bg-slate-900',
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
  // Loris is listed as CEO above, but also acts as Client Director in flows.
  
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
  // --- MANAGEMENT & ACCOUNT ---
  {
    id: 'role_account',
    title: 'Account Manager',
    description: 'Gestore operativo, finanziario e relazionale della commessa.',
    responsibilities: [
      'Interfaccia principale con il Cliente',
      'Responsabile della marginalità (Budget Control)',
      'Guida la Task Force operativa'
    ],
    tools: ['Cronos (Project Mgmt)', 'OneDrive (Files)', 'Teams (Calls)', 'Canva/Gamma (Presentation)'],
    operational_flow: [
      'Riceve strategia e crea il PREVENTIVO su Cronos.',
      'Prepara il DECK di proposta (Canva/Gamma) e lo carica su OneDrive.',
      'A progetto vinto, converte il preventivo in COMMESSA su Cronos.',
      'Definisce i MACRO-TASK (Fasi) e i MICRO-TASK (Azioni) su Cronos con l\'Executive Director.',
      'Gestisce le richieste fornitori (Ordini di Acquisto) e carica fatture pro-forma su OneDrive.',
      'Controlla settimanalmente lo stato avanzamento lavori su Cronos.'
    ]
  },
  {
    id: 'role_coo',
    title: 'COO (Chief Operating Officer)',
    description: 'Direzione Traffico, Risorse Umane e Supervisione Strategica.',
    responsibilities: [
      'The Hub: Smistamento traffico in ingresso',
      'Assegnazione Account e Task Force',
      'Problem solving su conflitti di risorse'
    ],
    tools: ['Teams', 'Cronos (Resource Planner)', 'Email'],
    operational_flow: [
      'Riceve input dal Commerciale (Giulio/Loris).',
      'Attiva i Director di Area necessari (The Hub).',
      'Nomina l\'Account Manager più adatto per skill.',
      'Valida la composizione della Task Force proposta dall\'Account.',
      'Supervisiona il carico di lavoro globale dell\'agenzia.'
    ]
  },

  // --- CREATIVE DEPT ---
  {
    id: 'role_art_director',
    title: 'Art Director',
    description: 'Responsabile della qualità visiva e del concept creativo.',
    responsibilities: [
      'Sviluppo Concept Visivi (Key Visual)',
      'Supervisione Shooting',
      'Direzione estetica output grafici'
    ],
    tools: ['Adobe Creative Suite', 'Canva (Template)', 'Pinterest/Behance', 'Cronos'],
    operational_flow: [
      'Riceve brief creativo dal Creative Director/Account.',
      'Sviluppa moodboard e bozze grafiche.',
      'Coordina i Graphic Designer per le declinazioni operative.',
      'Carica i file aperti e definitivi su OneDrive.',
      'Logga le ore su Cronos sotto il task "Creatività".'
    ]
  },
  {
    id: 'role_copywriter',
    title: 'Copywriter',
    description: 'Responsabile dei contenuti testuali e naming.',
    responsibilities: [
      'Ideazione Headline e Naming',
      'Stesura testi per campagne/siti/social',
      'Tone of Voice'
    ],
    tools: ['Word/Docs', 'Gamma (Presentation)', 'Cronos'],
    operational_flow: [
      'Brainstorming con Art Director e Creative Director.',
      'Stesura testi e revisione bozze.',
      'Caricamento testi su OneDrive.',
      'Logga ore su Cronos.'
    ]
  },
  {
    id: 'role_graphic_designer',
    title: 'Graphic Designer',
    description: 'Esecutore tecnico degli asset visivi.',
    responsibilities: [
      'Impaginazione e declinazione asset',
      'Fotoritocco',
      'Rispetto brand guidelines'
    ],
    tools: ['Adobe Photoshop/Illustrator/Indesign', 'Cronos'],
    operational_flow: [
      'Riceve micro-task assegnato su Cronos.',
      'Esegue la lavorazione tecnica.',
      'Salva su OneDrive seguendo la nomenclatura corretta.',
      'Chiude il task su Cronos loggando il tempo esatto.'
    ]
  },

  // --- SOCIAL & PR ---
  {
    id: 'role_smm',
    title: 'Social Media Manager',
    description: 'Gestione canali social, piani editoriali e community.',
    responsibilities: [
      'Creazione PED (Piano Editoriale)',
      'Gestione Community (Risposte)',
      'Reportistica mensile'
    ],
    tools: ['Business Suite / Creator Studio', 'Canva', 'Cronos', 'Excel (PED)'],
    operational_flow: [
      'Crea il PED mensile e lo condivide con Account per approvazione cliente.',
      'Richiede asset grafici al reparto creativo tramite Account/Exec.',
      'Programma i post approvati.',
      'Monitora commenti e messaggi giornalmente.',
      'Compila report fine mese e lo carica su OneDrive.'
    ]
  },
  {
    id: 'role_pr',
    title: 'PR Specialist',
    description: 'Gestione relazioni media e ufficio stampa.',
    responsibilities: [
      'Stesura Comunicati Stampa',
      'Relazione con giornalisti/testate',
      'Rassegna Stampa'
    ],
    tools: ['Mailchimp/Newsletter', 'Database Giornalisti', 'Cronos'],
    operational_flow: [
      'Redazione comunicato stampa.',
      'Invio a liste target.',
      'Follow-up telefonico.',
      'Raccolta rassegna stampa e caricamento su OneDrive.'
    ]
  },

  // --- DIGITAL & TECH ---
  {
    id: 'role_digital_strategist',
    title: 'Digital Strategist (SEO/SEM)',
    description: 'Ottimizzazione performance e visibilità online.',
    responsibilities: [
      'Audit SEO',
      'Setup Campagne Google Ads',
      'Analisi Dati e Funnel'
    ],
    tools: ['Google Analytics', 'Semrush', 'Google Ads', 'Cronos'],
    operational_flow: [
      'Analisi preliminare sito/competitor.',
      'Setup tecnico tracciamenti (GTM, GA4).',
      'Ottimizzazione campagne attiva.',
      'Reportistica performance.'
    ]
  },
  {
    id: 'role_web_dev',
    title: 'Web Developer',
    description: 'Sviluppo e manutenzione siti web.',
    responsibilities: [
      'Coding Frontend/Backend',
      'Manutenzione WordPress/Custom',
      'Gestione Server/Hosting'
    ],
    tools: ['VS Code', 'GitHub/GitLab', 'Figma (per layout)', 'Cronos'],
    operational_flow: [
      'Riceve layout grafico (Figma) dal reparto creativo.',
      'Sviluppo in ambiente di Staging.',
      'Test cross-browser.',
      'Messa in produzione (Go Live).',
      'Log ore sviluppo su Cronos.'
    ]
  },

  // --- EVENTS ---
  {
    id: 'role_event_producer',
    title: 'Event Producer',
    description: 'Logistica e produzione esecutiva eventi.',
    responsibilities: [
      'Scouting Location',
      'Gestione Fornitori Tecnici (Audio/Video)',
      'Regia Evento'
    ],
    tools: ['Cronos (Budget)', 'Excel (Run Sheet)', 'Maps'],
    operational_flow: [
      'Sopralluogo tecnico location.',
      'Richiesta preventivi fornitori e caricamento su Cronos.',
      'Creazione Run Sheet (Scaletta) evento.',
      'Coordinamento allestimento on-site.',
      'Supervisione smontaggio.'
    ]
  },

  // --- MANAGEMENT ---
  {
    id: 'role_director',
    title: 'Director (Creative, Media, Events, Tech)',
    description: 'Responsabile della qualità strategica e output di reparto.',
    responsibilities: [
      'Definizione della strategia verticale',
      'Innovazione',
      'Supporto all\'Account in fase di vendita'
    ],
    tools: ['Teams', 'OneDrive', 'Tool Specifici'],
    operational_flow: [
      'Riceve attivazione dal COO.',
      'Produce la strategia di reparto (es. Media Plan, Creative Concept).',
      'Carica i materiali strategici su OneDrive nella cartella di progetto.',
      'Delega l\'esecuzione operativa all\'Executive Director.'
    ]
  },
  {
    id: 'role_executive',
    title: 'Executive Director',
    description: 'Coordinatore tecnico e garante dei tempi.',
    responsibilities: [
      'Validazione tecnica dei micro-task',
      'Controllo qualità output',
      'Monitoraggio ore team'
    ],
    tools: ['Cronos', 'Teams'],
    operational_flow: [
      'Affianca l\'Account nella definizione dei Micro-Task su Cronos.',
      'Stima le ore necessarie per ogni task operativo.',
      'Assegna i task ai singoli operativi (Specialism) su Cronos.',
      'Controlla che il team logghi correttamente le ore (Timesheet).'
    ]
  },
  {
    id: 'role_admin',
    title: 'Amministrazione (Simona Massi)',
    description: 'Gestione flussi finanziari e fatturazione.',
    responsibilities: [
      'Emissione Fatture attive',
      'Registrazione Fatture passive',
      'Controllo flussi di cassa'
    ],
    tools: ['Gestionale Contabile', 'Cronos (Report)', 'Home Banking'],
    operational_flow: [
      'Riceve notifica da Account quando un preventivo diventa Commessa Confermata.',
      'Emette fattura di acconto (se prevista).',
      'Raccoglie fatture fornitori approvate dagli Account.'
    ]
  },
  {
    id: 'role_ceo',
    title: 'CEO (Loris Zanelli)',
    description: 'Guida strategica e commerciale.',
    responsibilities: [
      'Sviluppo Business',
      'Relazione Clienti Key',
      'Visione a lungo termine'
    ],
    tools: ['Teams', 'Outlook', 'Cronos (Dashboard)'],
    operational_flow: [
      'Ingaggia nuovi clienti (Lead Generation).',
      'Agisce come Client Director sui clienti strategici.',
      'Definisce gli obiettivi annuali di fatturato.'
    ]
  }
];

export const HIERARCHY: HierarchyNode[] = [
  {
    id: 'ceo_root',
    title: 'Loris Zanelli (CEO)',
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
