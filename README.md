# AsignaturaFull: Blockchain-based Academic Management System

## 🚀 Introduction

This project is part of the *Blockchain and Smart Contracts* course of the Master's in Computer Engineering.  
The goal is to develop a complete solution for academic management of a university course using blockchain technology.  

- A **smart contract in Solidity** is implemented to manage students, professors, evaluations, and grades in a transparent and secure way.  
- A **modern DApp** built with React + Vite enables interaction with the contract through a user-friendly interface, ensuring decentralized management and traceability of all actions.  

The system is designed for educational environments:  
- **Coordinators & Professors** can manage the course.  
- **Students** can view their information and grades.  
- **Contract Owners** maintain control over deployment and system evolution.  

## 📂 Project Structure

- **truffle/**  
  - `Asignatura.sol` smart contract  
  - Migration & test scripts  
  - Build files with ABI & bytecode  

- **mkcjson/**  
  - Script to generate the JSON contract interface  

- **dapp/**  
  - Web application built with React + Vite  
  - Components for managing students, professors, evaluations, and grades  
  - CSS styling  
  - ESLint & Vite configuration  

## ⚙️ Requirements

- Node.js & npm  
- Truffle  
- Ganache
- MetaMask


## 🛠️ Installation

1. Install all dependencies (root + subfolders):
```bash
npm install --prefix truffle
npm install --prefix dapp
```

2. Deploy the smart contract + preload data:
  - Linux / Mac: 
  ```bash
  npm run deploy
  ```
  - Windows: 
  ```bash
  npm run deploy_win
  ```

3. Generate the contract JSON:
  - Linux / Mac: 
  ```bash
  npm run cjson
  ```
  - Windows: 
  ```bash
  npm run cjson_win
  ```

4. Start the DApp:
  - Linux / Mac: 
  ```bash
 npm run start
  ```
  - Windows: 
  ```bash
  npm run start_win
  ```

## 🎮 Usage

- Open the DApp at **http://localhost:5173** (default).  
- Connect with **MetaMask** and select the appropriate network.  
- Manage **students, professors, evaluations, and grades** through the interface.  

   
