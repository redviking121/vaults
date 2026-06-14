import os
import json
import uuid
from openai import OpenAI

# Initialize the client
# Ensure OPENAI_API_KEY is set in your environment variables
client = OpenAI()

def atomize_text_governance_aware(raw_text_polymer):
    """
    Takes a complex piece of text (a Polymer) and breaks it down into 
    Atomic Notes (Atoms) classified by the Governance Pentad.
    Each atom is assigned a unique UID.
    """
    
    prompt = """
    You are an expert Zettelkasten knowledge assistant. Your job is to take a complex piece of text (a Polymer) 
    and break it down into its constituent Atomic Notes (Atoms).
    
    Each Atomic Note must follow these rules:
    1. Title: Short, punchy, and conceptual.
    2. Content: Exactly one standalone idea written clearly in 1-3 sentences.
    3. Tags: 2-3 relevant conceptual tags.
    4. Governance Mapping: Identify which of the following Governance Maps this atom belongs to:
       - Razor Governance (Coherence/Paradox)
       - TRMS Relational Dynamics (Relational/Feedback)
       - Crystalline-Mollusk Universe (Ontology/Field Theory)
       - Narrative & Creative Dynamics (Storytelling/World-building)
       - AI NOC & Lab (Operations/Diagnostics)
       - None (If it doesn't fit)
    
    Return the result strictly as a valid JSON object with a single key "atoms" 
    containing an array of objects with keys: "title", "content", "tags", "governance_map".
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": raw_text_polymer}
        ],
        response_format={ "type": "json_object" }
    )

    data = json.loads(response.choices[0].message.content)
    
    # Inject UIDs into each atom
    for atom in data["atoms"]:
        atom["uid"] = str(uuid.uuid4())
        
    return data

# Example Usage:
if __name__ == "__main__":
    # Example messy polymer
    messy_polymer = """
    The Xi Paradox Razor is a coherence operator that helps us hold productive tensions. 
    Meanwhile, the TRMS model governs how we handle feedback loops in multi-agent environments. 
    I also need to remember to check the latency on the substrate, as it's been running hot lately.
    """
    
    result = atomize_text_governance_aware(messy_polymer)
    
    # Output the result
    print(json.dumps(result, indent=2))
