Navigation

[Pre-Flight Checklist](blob:https://copilot.fun/a59668ab-d9b0-42f9-b60a-9e4c8d5375e1#preflight)[Installation Steps](blob:https://copilot.fun/a59668ab-d9b0-42f9-b60a-9e4c8d5375e1#steps)[Workstation Tracker](blob:https://copilot.fun/a59668ab-d9b0-42f9-b60a-9e4c8d5375e1#tracker)[Post-Deployment](blob:https://copilot.fun/a59668ab-d9b0-42f9-b60a-9e4c8d5375e1#verification)[Troubleshooting](blob:https://copilot.fun/a59668ab-d9b0-42f9-b60a-9e4c8d5375e1#troubleshooting)

Runbook

# SSH Deployment — 6 Workstations

OpenSSH Server & Client Installation Runbook

May 4, 2026

Red

Deployment Progress0 / 6 Complete

## Pre-Flight Checklist

Verify these prerequisites before starting deployment on any workstation.

Confirm admin/elevated privileges on each workstation

Verify Windows version (Win 10 1809+ or Win 11)

Confirm network access / firewall rules for port 22

Identify target workstation hostnames or IPs

Prepare SSH key pair (if using key-based auth)

## Installation Steps

Execute the following steps on each workstation from an elevated PowerShell session.

1

### Check if OpenSSH is already installed

Look for State: Installed vs NotPresent

Copy`Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'`

2

### Install OpenSSH Client

Installs the SSH client capability

Copy`Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0`

3

### Install OpenSSH Server

Installs the SSH server (sshd) capability

Copy`Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0`

4

### Start the SSH Server Service

Starts the sshd service immediately

Copy`Start-Service sshd`

5

### Set SSH Server to start automatically

Ensures sshd starts on boot

Copy`Set-Service -Name sshd -StartupType 'Automatic'`

6

### Confirm Windows Firewall rule exists

Verify port 22 inbound rule — create if missing

Copy`Get-NetFirewallRule -Name *ssh*`

If missing, create the rule:

Copy`New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22`

7

### Configure default shell (optional — set to PowerShell)

Sets PowerShell as the default SSH shell instead of cmd.exe

Copy`New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force`

8

### Test SSH connection locally

Verify sshd is accepting connections on localhost

Copy`ssh username@localhost`

9

### Deploy SSH public key (if using key auth)

Copy public key and set proper permissions

Copy public key to `C:\Users\<username>\.ssh\authorized_keys`

Copy`icacls.exe "C:\Users\<username>\.ssh\authorized_keys" /inheritance:r /grant "<username>:F"`

10

### Verify remote connectivity

Test from admin workstation to confirm end-to-end

Copy`ssh username@<workstation-ip>`

## Workstation Tracker

Track deployment status for each workstation. Changes are saved automatically.

Not Started

#1

                             Not Started                             In Progress                             Complete                             Issue                         

Not Started

#2

                             Not Started                             In Progress                             Complete                             Issue                         

Not Started

#3

                             Not Started                             In Progress                             Complete                             Issue                         

Not Started

#4

                             Not Started                             In Progress                             Complete                             Issue                         

Not Started

#5

                             Not Started                             In Progress                             Complete                             Issue                         

Not Started

#6

                             Not Started                             In Progress                             Complete                             Issue                         

## Post-Deployment Verification

Confirm each item after all 6 workstations are deployed.

All 6 workstations responding on port 22

Key-based auth working (if configured)

Default shell set correctly

Services set to Automatic startup

Firewall rules confirmed

## Troubleshooting Quick Reference

|Issue|Fix|
|---|---|
|sshd won't start|Check Event Viewer → Application log; ensure no port 22 conflict|
|Connection refused|Verify firewall rule and sshd service status|
|Permission denied (publickey)|Check authorized_keys path and file permissions (icacls)|
|Host key verification failed|Remove old entry from ~/.ssh/known_hosts|
|Slow connection|Disable GSSAPIAuthentication in sshd_config|

Ops-Vault • SSH Deployment v1.0 • Red

Made by Copilot

#preflight