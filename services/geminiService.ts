
import { GoogleGenAI } from "@google/genai";
import { PEOPLE, WORKFLOW_STEPS } from "../constants";
import { BriefingState, OperationalPlan, MagicWandAction } from "../types";

let aiClient: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const askProcessAdvisor = async (question: string): Promise<string> => {
  if (!aiClient) return "API Key not configured.";

  const roleContext = PEOPLE.map(r => `${r.name} (${r.type}): ${r.responsibilities.join(', ')}`).join('\n');
  const flowContext = WORKFLOW_STEPS.map(s => `Step ${s.id} (${s.stage}): ${s.title} - ${s.description}`).join('\n');

  const systemInstruction = `
    Sei un esperto Operations Consultant per un'agenzia creativa.
    RUOLI: ${roleContext}
    WORKFLOW: ${flowContext}
    Rispondi alle domande basandoti su questo contesto. RISPONDI SEMPRE IN ITALIANO.
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: { systemInstruction },
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Errore nella generazione della risposta.";
  }
};

export const refineText = async (text: string, action: MagicWandAction): Promise<string> => {
  if (!aiClient) return text;

  const prompts: Record<MagicWandAction, string> = {
    expand: "Espandi questo testo con dettagli professionali e contesto (in Italiano):",
    shorten: "Sintetizza questo testo in modo conciso (in Italiano):",
    formalize: "Riscrivi questo testo con un tono business formale (in Italiano):",
    bullet_points: "Converti questo testo in una lista puntata (in Italiano):"
  };

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${prompts[action]}\n\n"${text}"`
    });
    return response.text?.trim() || text;
  } catch (error) {
    console.error("Refine Text Error:", error);
    return text;
  }
};

export const generateOperationalPlan = async (brief: BriefingState): Promise<OperationalPlan | null> => {
  if (!aiClient) return null;

  // Include custom questions in the prompt
  const customQ = brief.customQuestions?.map(q => `- ${q.text}: ${brief.answers[q.id] || 'N/A'}`).join('\n') || '';

  const prompt = `
    Agisci come Sara Serafini (COO). Hai ricevuto un brief commerciale da Giulio/Loris e devi attivare i Director Interni.
    Genera un "Piano di Attivazione Interno" (Internal Kick-off) per costruire la proposta commerciale.
    
    CLIENTE: ${brief.clientName}
    LEAD: ${brief.lead}
    DIPARTIMENTI ATTIVI: ${brief.selectedDepartments.join(', ')}
    
    RISPOSTE BRIEF:
    ${Object.entries(brief.answers).map(([key, val]) => `- ${key}: ${val}`).join('\n')}
    ${customQ}
    
    MAPPA DIRECTOR AGENZIA:
    - Creative: Paolo Ferrigno
    - Events: Lorena Mele
    - Media: Massimiliano Palombi
    - Digital: Exec Digital / Giacomo Neri
    - Strategic: Roberta Gasperoni
    
    TASK:
    1. Analizza il brief.
    2. Definisci una strategia di alto livello (Overview per l'Account).
    3. Per OGNI dipartimento attivo, genera una 'UnitStrategy' contenente ISTRUZIONI OPERATIVE PER IL DIRECTOR:
       - internalInstructions: Cosa deve fare il director? (es. "Sviluppare concept grafico", "Stimare budget media").
       - requiredOutput: Cosa deve consegnare all'Account per la presentazione? (es. "3 slide di concept", "Media Plan XLS").
       - keyConstraints: Vincoli o note specifiche.
       - estimatedHours: Stima ore per la fase di proposta.
    
    FORMATO OUTPUT JSON (Solo JSON, niente markdown):
    {
      "clientSummary": "string",
      "strategicOverview": "string",
      "totalEstimatedDurationWeeks": number,
      "macroTasks": [
         { "phase": "string", "tasks": ["string"] }
      ],
      "unitStrategies": [
        {
          "unitName": "string",
          "directorName": "string",
          "internalInstructions": ["string"],
          "requiredOutput": ["string"],
          "estimatedHours": number,
          "keyConstraints": "string"
        }
      ]
    }
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text || "{}") as OperationalPlan;
  } catch (error) {
    console.error("Gemini Plan Error:", error);
    return null;
  }
};
