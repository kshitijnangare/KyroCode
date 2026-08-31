# 🚀 Project Git Workflow and Command Guide

This document defines the **mandatory Git strategy** for the project. We use a **Multi-Remote Deployment Model** to ensure strict, safe separation between our development/testing environments and the live production environment.

**All developers must follow this workflow precisely.**

---

## 1. Project Git Architecture

We manage code across two distinct GitHub repositories, each serving a different purpose and deployment target.

| Repository | Remote Alias | Purpose | Deployment Target |
| :--- | :--- | :--- | :--- |
| **Development** | `dev` | Active feature development, peer review, integration, and continuous testing (Staging). | HS1 (Testing/Staging Environment) |
| **Production** | `prod` | Stable, fully tested, client-ready code only. This is the source of truth for clients. | HS2 (Live Production Environment) |

---

## 2. Naming Conventions and Branch Roles

We maintain a strict **Branch-Per-Feature** approach. Developers only commit to local feature branches.

### A. Local Working Branches

| Local Branch Name | Purpose | Tracking (Remote Branch) |
| :--- | :--- | :--- |
| **`development`** | **Integration Branch:** All approved features are merged here. This code is pushed to `dev/main` for HS1 deployment. (Rarely commit directly here) | `dev/main` |
| **`main`** | **Deployment Branch:** Used only to receive tested code from `development` and push it to `prod/main`. (Never commit directly here) | `prod/main` |
| **`fix-X`, `feat-Y`, etc.** | **Feature Branches:** Dedicated branches for isolated work on a single task or bug fix. | `dev/<feature-name>` |

### B. Remote-Tracking Branches (Read-Only Pointers)

These branches are local pointers updated by `git fetch` that reflect the last known state of the remote repositories. You cannot commit to these.
* `dev/main`: The latest code deployed to **HS1 (Staging)**.
* `prod/main`: The latest code deployed to **HS2 (Live)**.

---

## 3. Mandatory Setup and Configuration

Every developer must configure their local repository with both the `dev` and `prod` remotes immediately after cloning.

| Step | Command (Run in Terminal) | Description |
| :--- | :--- | :--- |
| 1. Clone (Initial) | `git clone <dev_repo_link>` | Start by cloning the **DEV** repository. |
| 2. Rename Default Remote | `git remote rename origin dev` | Renames the default remote to our required alias: `dev`. |
| 3. Add Prod Remote | `git remote add prod <prod_repo_link>` | Adds the second remote for the production repository. |
| 4. Download Remote Information for Dev | `git fetch dev` | Connects to the dev remote and downloads all the branch pointers, creating the local reference dev/main for the first time. |
| 5. Download Remote Information for Prod | `git fetch prod` | Connects to the prod remote and downloads all the branch pointers, creating the local reference prod/main for the first time. |
| 6. Setup Integration Branch | `git checkout -b development dev/main` | Creates the local `development` branch and links it to track the remote `dev/main`. |
| 7. Setup Deployment Branch | `git checkout -b main prod/main` | Creates the local `main` branch and links it to track the remote `prod/main`. |
| 8. Verify Setup | `git remote -v` | Confirms the setup: you should see fetch and push links for both `dev` and `prod`. |

---

## 4. Daily Workflow: Feature Development Cycle

This cycle moves code from your local feature branch, through review, and onto the HS1 testing environment.

| Action | Command (Full Syntax) | Notes |
| :--- | :--- | :--- |
| 1. Start New Feature | `git checkout -b new-feature dev/main` | Always start your new branch from the latest state of `dev/main` (our testing baseline). |
| 2. Push (First Time) | `git push --set-upstream dev new-feature` | Pushes the branch and sets the upstream link. Future pushes are simply `git push`. |
| 3. Stay Updated | `git fetch dev` then `git merge dev/main` | Fetch all updates and integrate any new tested changes from other features into your branch. **Do this frequently!** |
| 4. Final Push | `git push dev new-feature` | Push your finalized work to the remote for review. |
| 5. Integration (Team Lead) | `git checkout development` then `git pull dev new-feature` | After the PR is approved, the team lead merges the feature into the local `development` branch. |
| 6. Deploy to HS1 | `git push dev development:main` | Pushes the merged code from local `development` to remote `dev/main`, **triggering the HS1 deployment**. |

---

## 5. Release Workflow: Dev to Production

This process only happens when the integrated code on HS1 (from `dev/main`) is fully tested, approved, and ready for clients.

* **Prerequisite:** The local `development` branch must be fully updated and tested.

| Step | Command (Full Syntax) | Description |
| :--- | :--- | :--- |
| 1. Prepare Local Main | `git checkout main` | Switch to the local branch that tracks the `prod` history. |
| 2. Integrate Tested Code | `git merge development` | Integrates the tested, stable history from local `development` into local `main`. |
| 3. Release to Prod | `git push prod main` | Pushes the local `main` branch history to the remote `prod` repository's `main` branch, **triggering deployment on HS2 (Live)**. **This is the critical step.** |
| 4. Clean Up (Optional) | `git branch -d new-feature` | Delete the local feature branch after it has been merged and released. |

---

## 6. Conflict Resolution and Inspection

### Handling Merge Conflicts

If `git pull` or `git merge` results in a conflict:

1.  **Check Status:** `git status` will show the files that are unmerged.
2.  **Edit Manually:** Open the files, remove the `<<<<<<<`, `=======`, and `>>>>>>>` conflict markers, and manually combine the code to the correct state.
3.  **Stage Resolution:** `git add .` (Marks the conflict as resolved).
4.  **Finalize Merge:** `git commit` (Completes the merge commit).

### Inspecting Remote Code Safely

To inspect a remote branch without changing your current working code:

| Action | Command (Full Syntax) | Result |
| :--- | :--- | :--- |
| Update All Pointers | `git fetch --all` | Downloads the latest commit IDs for all remotes (`dev/main`, `prod/main`, etc.). |
| View Prod History | `git log prod/main` | Shows the commit history of the code currently live on the client site (HS2). |
| View Dev/Staging Code | `git checkout dev/main` | Switches to the **Detached HEAD** state to view the exact files deployed to HS1.
