# Azure Linux (Ubuntu 18.04) VM Docs

> The virtual machine for this assignment is hosted on Microsoft's Azure, under a free student subscription. The public IP address is [20.25.190.33](https://20.25.190.33), and it is utilizing a self-signed SSL/TLS certificate. A user must **accept** the security warning to view the web app, there is no actual security risk.

## Azure Resource Structure

All required Azure resources are housed in a Resource group called **CIS3760**. It contains the _Virutal machine, Public IP address, Network Interface, Virtual network, Disk and a Key vault_. Most of these resources will not have to be accessed after their creation. The self-signed SSL certificate is kept in the _Key vault_ resource. The _key vault and virtual machine_ are the only resources that should be accessed.

## Accessing the VM

The project repository, [CIS3760 - 104 - Online](https://gitlab.socs.uoguelph.ca/eshortt/cis3760-104-online/activity), has a project variable that holds the private SSH key for the VM. It is utilized in the GitLab pipeline to deploy the project automatically when a build succeeds. If a group member requires direct access to the VM, they can navigate to **Project Settings->CI/CD->Variables** and copy the contents of the `AZURE_VM_SSH_KEY` to a local file on their machine.

> The pipeline runs `ssh AZURE_VM_SSH_KEY azureuser@20.25.190.33` to connect to the VM <br/>
> A group member may run `ssh -i "file_location" azureuser@20.25.190.33` in their terminal to connect to the VM

There is only one SSH superuser setup for this VM, that all group members can utilize by following the steps above.

## Troubleshooting the VM

Check out the useful link(s) below to assist in troubleshooting, including the guide used to create the VM and secure it with SSL/TLS

1. [Set Up Linux VM with TLS/SSL Certificate](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/tutorial-secure-web-server)
