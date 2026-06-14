---
title: Thanks for clarifying, Red. If you're only using one identity and want to remove
timestamp: 2026-05-04T18:03:00
uid: 5c869067
source: 202605041803.md
tags: [struct:question, struct:list]
---
Thanks for clarifying, Red. If you're only using one identity and want to remove the _other_ (the one causing confusion), here's how to clean things up depending on where the duplicate is showing up:

### 🧹 Remove the Unwanted Microsoft Account

#### 1. **Windows Settings**

If the extra account appears under **Settings > Accounts > Email & accounts** or **Access work or school**:

- Select the unwanted account.
- Click **Remove** or **Disconnect**.
- Restart your device to clear cached credentials.

#### 2. **Credential Manager**

To wipe lingering sign-in data:

- Open **Control Panel > Credential Manager**.
- Go to **Windows Credentials**.
- Delete any entries related to the unwanted Microsoft account (look for `MicrosoftOffice`, `login.microsoftonline.com`, etc.).

#### 3. **Azure AD / Entra ID Cleanup**

If the duplicate is tied to Azure AD:

- Open PowerShell as admin and run:
    
    ```powershell
    dsregcmd /status
    ```
    
    This shows your device’s Azure AD status.
- To remove a user from Azure AD:
    
    ```powershell
    Remove-AzureADUser -ObjectId "<UserObjectId>"
    ```
    
    Replace `<UserObjectId>` with the actual ID from:
    
    ```powershell
    Get-AzureADUser | Select DisplayName, ObjectId
    ```
    

#### 4. **Registry Editor (Advanced)**

If the duplicate persists in Office apps:

- Open **Registry Editor** (`regedit`) as admin.
- Navigate to:
    
    ```
    HKEY_CURRENT_USER\SOFTWARE\Microsoft\Office\16.0\Common\Identity\Identities
    ```
    
- Look for folders with the same email and delete the one you don’t use.
- Restart your PC.

### ⚠️ Important Notes

- Microsoft doesn’t allow merging personal and work accounts — they’re separate by design [learn.microsoft.com](https://learn.microsoft.com/en-us/answers/questions/5084127/duplicate-microsoft-accounts-cannot-remove-one) [learn.microsoft.com](https://learn.microsoft.com/en-us/answers/questions/2111115/remove-duplicate-work-or-school-account) [learn.microsoft.com](https://learn.microsoft.com/en-us/answers/questions/2150003/duplicate-profile-issue).
- If both accounts use the same email, consider changing the alias on the personal account via [account.live.com](https://account.live.com/).

Want help identifying which account is the “right” one based on tenant ID or usage? I can walk through that with you. Or if Harbinger’s login flow is getting tripped up, we can tune that too.