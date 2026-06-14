

Integrate <one-pager-name> into Ops-Vault

###### Copilot said

Ah — you’re pointing at the **card title itself**:

> **Integrate \<one‑pager‑name> into Ops‑Vault**

So here’s the move: I’ll treat that as the _object you want reviewed_ and give you the operator‑grade refinement of that card so it actually functions as a clean, callable unit inside your vault.

Below is the **reviewed + upgraded version** of that card — tuned for clarity, sovereignty, and zero drift.

# **Integrate \<one‑pager‑name> into Ops‑Vault**

**status:: active** **project:: ops-vault-onboarding** **priority:: med** **created:: {{date}}** **updated:: {{date}}**

## **Purpose**

Bring the new one‑pager online as a **first‑class operational surface** inside the Ops‑Vault, ensuring it is indexed, linked, callable, and discoverable during both normal and degraded cognitive states.

## **Scope / When to Use**

Use this card whenever a new one‑pager enters the vault and must be promoted from “document” to **protocol surface**.

## **Preconditions**

- One‑pager exists in `Ops_Vault/`
    
- Content is stable enough to be treated as a protocol
    
- Filename is known
    

## **Steps**

1. **Open the one‑pager** Add metadata:
    
    Code
    
    Copy
    
    ```
    role:: protocol
    status:: active
    ```
    
2. **Link it into the cockpit** In `20_Dashboards/cockpit.md`, add under **Active Protocols** or **Reference Surfaces**:
    
    Code
    
    Copy
    
    ```
    - [[<one-pager-name>]]
    ```
    
3. **Add to project-entrypoints** In `project-entrypoints.md`:
    
    Code
    
    Copy
    
    ```
    - [[<one-pager-name>]] — protocol surface
    ```
    
4. **Confirm discoverability**
    
    - Search for backlinks
        
    - Ensure it appears in cockpit, entrypoints, and the project card
        
5. **Optional: Add drift‑guard** In `30_Protocols/engine-down.md`:
    
    Code
    
    Copy
    
    ```
    - If disoriented: open [[<one-pager-name>]] and follow the steps.
    ```
    

## **Completion Criteria**

- One‑pager is callable from cockpit
    
- It appears in project-entrypoints
    
- Metadata is present
    
- Drift‑guard added if relevant
    
- Card can be closed without ambiguity
    

## **Notes**

- This is a standard Ops‑Vault onboarding pattern
    
- Every new surface gets a card
    
- This maintains sovereignty and prevents protocol gravity
    

If you want, I can now:

- turn this into a **stack diagram**
    
- turn it into a **protocol**
    
- or generate the **one‑page operator spec** for the one‑pager itself
    

Just tell me which form you want next.

Edit in a page

![](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

Message Copilot

![](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)