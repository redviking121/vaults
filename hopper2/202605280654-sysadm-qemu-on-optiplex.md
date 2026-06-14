Setting up QEMU on Ubuntu 24.04 LTS is straightforward. For optimal performance, it is best to pair QEMU with **KVM (Kernel-based Virtual Machine)** so your virtual machines run at near-native hardware speeds instead of slow software emulation.

### 1. Verify Hardware Virtualization

Before installing anything, verify that your computer's CPU supports virtualization and that it is enabled in your BIOS/UEFI. Run the following command:

Bash

```
kvm-ok
```

> **Note:** If `kvm-ok` isn't found, quickly install it using `sudo apt install cpu-checker`.

If you see **"KVM acceleration can be used"**, you are ready to go. If it says it cannot be used, you will need to reboot your computer, enter your BIOS/UEFI settings, and look for an option like **Intel VT-x**, **AMD-V**, **SVM**, or **Virtualization Technology** to enable it.

### 2. Install QEMU and KVM Packages

On Ubuntu 24.04, the package landscape has shifted slightly (`qemu-kvm` is now a virtual package that points to `qemu-system-x86`). To get the full hypervisor stack along with management tools and a clean graphical interface, run:

Bash

```
sudo apt update
sudo apt install qemu-system-x86 libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager -y
```

**What these packages do:**

- **`qemu-system-x86`**: The core emulator backend that manages the VM hardware.
    
- **`libvirt-daemon-system` & `libvirt-clients`**: The system service and CLI tools (like `virsh`) used to manage VMs cleanly.
    
- **`bridge-utils`**: Helps create bridged network connections so your VMs can talk to your network.
    
- **`virt-manager`**: A user-friendly desktop GUI interface to create, run, and configure your virtual machines without dealing with complex terminal commands.
    

### 3. Configure User Permissions

By default, only root/sudo users can interact with KVM virtual machines. To run them as your regular user account, add yourself to the `kvm` and `libvirt` system groups:

Bash

```
sudo usermod -aG kvm $USER
sudo usermod -aG libvirt $USER
```

To apply these group changes immediately without logging out, run:

Bash

```
newgrp libvirt
```

### 4. Enable the Virtualization Daemon

Ensure the `libvirtd` service is active and set to run automatically every time your system boots up:

Bash

```
sudo systemctl enable --now libvirtd
```

You can double-check that it started successfully by running `sudo systemctl status libvirtd`.

### How to Create Your First VM

Now that everything is installed, you can spin up a virtual machine using the graphical interface:

1. Open your applications menu and search for **Virtual Machine Manager** (or type `virt-manager` in your terminal).
    
2. Click the **computer icon with a green play button** in the top left corner to create a new VM.
    
3. Choose **Local install media (ISO image)** and browse to find your downloaded operating system ISO file (like a Windows or Linux installer).
    
4. Allocate your RAM, CPU cores, and storage disk space sizes when prompted, click **Finish**, and your new virtual machine will boot up immediately.