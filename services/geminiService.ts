
import { GoogleGenAI } from "@google/genai";
import { PEOPLE, WORKFLOW_STEPS } from "../constants";
import { BriefingState, OperationalPlan } from "../types";

let aiClient: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const askProcessAdvisor = async (question: string): Promise<string> => {
  if (!aiClient) return "API Key not configured.";

  const roleContext = PEOPLE.map(r => `${r.name} (${r.type}): ${r.responsibilities.join(', ')}`).join('\n');
  const flowContext = WORKFLOW_STEPS.map(s => `Step ${s.id} (${s.stage}): ${s.title} - ${s.description}`).join('\n');

  const systemInstruction = `
    You are an expert Operations Consultant for a creative agency.
    ROLES: ${roleContext}
    WORKFLOW: ${flowContext}
    Answer based on this context.
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
    return "Error generating response.";
  }
};

export const generateOperationalPlan = async (brief: BriefingState): Promise<OperationalPlan | null> => {
  if (!aiClient) return null;

  const prompt = `
    Generate a detailed Operational Plan for a new client project.
    
    CLIENT: ${brief.clientName}
    LEAD: ${brief.lead}
    ACTIVE DEPARTMENTS: ${brief.selectedDepartments.join(', ')}
    
    BRIEF ANSWERS:
    ${Object.entries(brief.answers).map(([key, val]) => `- ${key}: ${val}`).join('\n')}
    
    AGENCY DIRECTORS MAP:
    - Creative: Paolo Ferrigno
    - Events: Lorena Mele
    - Media: Massimiliano Palombi
    - Digital: Exec Digital / Giacomo Neri
    - Strategic: Roberta Gasperoni
    
    OUTPUT JSON FORMAT ONLY:
    {
      "clientSummary": "Brief summary of client needs",
      "strategicOverview": "High level strategy approach",
      "macroTasks": [
         { "phase": "string", "tasks": ["string"] }
      ],
      "unitBriefs": [
        {
          "unitName": "string (e.g. Creative Unit)",
          "directorName": "string (The correct director from list)",
          "keyRequirements": ["string (specific tasks for this unit based on answers)"],
          "estimatedHours": number,
          "recommendedSuppliers": ["string (suggest generic types e.g. Video Production, Catering, Hosting)"]
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
