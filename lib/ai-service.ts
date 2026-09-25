import { AI_CONFIG } from "./ai-config";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface FileAttachment {
  name: string;
  content: string;
  type: string;
}

export async function sendMessage(
  messages: Message[],
  onChunk: (chunk: string) => void,
  fileAttachment?: FileAttachment | null
): Promise<void> {
  const apiKey = AI_CONFIG.apiKey;
  const modelName = AI_CONFIG.model; // "openai/gpt-oss-20b"

  // Format payload with file attachment context if provided
  const formattedMessages = [...messages];
  if (fileAttachment && formattedMessages.length > 0) {
    const lastIdx = formattedMessages.length - 1;
    if (formattedMessages[lastIdx].role === "user") {
      formattedMessages[lastIdx] = {
        role: "user",
        content: `[Attached File: ${fileAttachment.name}]\n\n--- File Content Start ---\n${fileAttachment.content}\n--- File Content End ---\n\n${formattedMessages[lastIdx].content}`
      };
    }
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        {
          role: "system",
          content: `You are Brainzly, the official AI assistant and digital receptionist of Brainz Edu World school.
Your responses are live, intelligent, helpful, warm, and precise.
Provide fully AI-generated assistance regarding admissions, academics (CBSE curriculum, Science/Commerce/Humanities streams), school facilities (STEAM & Robotics automation labs, sports, smart classes), transport, fee structure, timings, contact info, and attached files/documents.

Context about Brainz Edu World:
- Standard: CBSE Curriculum from Pre-Primary (Ages 3-5) up to Senior Secondary (Grades XI-XII).
- Facilities: Smart Classrooms, Experienced Faculty, Digital Learning, Sports Academy (Football, Indoor sports, Athletic complex), Safe Gated Campus with 24/7 CCTV, Robotics & STEAM automation lab.
- Location: Kila Road, Village Bhavanpur, Meerut, Uttar Pradesh 250001, India.
- Phone: +91 9105014545 / +91 8192004545.
- Email: contact@brainzeduworld.com.
- Admissions: Open for academic session 2026-2027.`
        },
        ...formattedMessages
      ],
      stream: true
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    let parsedErr = "";
    try {
      const errObj = JSON.parse(errText);
      parsedErr = errObj.error?.message || response.statusText;
    } catch (e) {
      parsedErr = response.statusText;
    }
    throw new Error(`Groq AI API Error (${response.status}): ${parsedErr}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  if (!reader) throw new Error("Unable to read streaming response from AI API");

  let buffer = "";
  let hasReceivedChunk = false;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const cleanedLine = line.trim();
      if (!cleanedLine || cleanedLine === "data: [DONE]") continue;

      if (cleanedLine.startsWith("data: ")) {
        try {
          const parsed = JSON.parse(cleanedLine.substring(6));
          const chunk = parsed.choices[0]?.delta?.content || "";
          if (chunk) {
            hasReceivedChunk = true;
            onChunk(chunk);
          }
        } catch (e) {
          // ignore parse error
        }
      }
    }
  }

  if (!hasReceivedChunk) {
    throw new Error("No response content received from Groq AI API.");
  }
}
