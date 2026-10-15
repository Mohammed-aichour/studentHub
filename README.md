# StudentHub — Academic Management & Student Portal

> **Designed & Engineered by Mohammed AICHOUR**  
> *Full-Stack Software Engineer & Solutions Architect*

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/ESM-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![SQL](https://img.shields.io/badge/SQL-Relational%20Schema-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Status](https://img.shields.io/badge/Status-Fully%20Implemented-success)](#)

<p align="center">
  <img src="screenshots/student_hub_preview.png" alt="Aperçu StudentHub" width="100%">
</p>

---

## 📌 Présentation du Projet

**StudentHub** est une plateforme web universitaire centralisée permettant aux étudiants et enseignants de suivre le cursus académique, les relevés de notes, les calculs de moyennes (GPA), l'assiduité et les emplois du temps hebdomadaires en temps réel.

### Fonctionnalités Clés :
- 📊 **Relevé de Notes & GPA Automatisé** : Calcul transparent des moyennes semestrielles et annuelles.
- 📅 **Emploi du Temps Dynamique** : Visualisation claire des cours par salle, enseignant et horaire.
- 🎓 **Gestion des Inscriptions aux Modules** : Suivi des crédits ECTS par matière.
- ⏱️ **Suivi d'Assiduité** : Contrôle de présence et statistiques d'absences.
- 🔌 **API RESTful intégrée** : Service JSON prêt pour l'intégration mobile et client web.

---

## 🏗️ Structure du Projet

```text
studentHub/
│
├── database/
│   └── schema.sql              # Schéma SQL relationnel normalisé
│
├── public/
│   └── index.html              # Interface utilisateur du portail étudiant
│
├── server/
│   └── index.js                # Serveur HTTP & API RESTful (ES Modules)
│
├── tests/
│   └── test_studenthub.js      # Suite de tests d'intégrité automatisés
│
├── package.json
└── README.md
```

---

## 📡 Documentation de l'API RESTful

| Méthode | Point d'Accès | Description | Format de Réponse |
|---|---|---|---|
| `GET` | `/api/student` | Informations de profil de l'étudiant | JSON `{ success, student }` |
| `GET` | `/api/courses` | Liste des modules de formation et enseignants | JSON `{ success, courses }` |
| `GET` | `/api/grades` | Notes de contrôles, examens et calcul du GPA | JSON `{ success, grades, gpaOutOf20 }` |
| `GET` | `/api/schedule` | Emploi du temps hebdomadaire détaillé | JSON `{ success, schedule }` |
| `GET` | `/api/attendance` | Statistiques de présence et taux d'assiduité | JSON `{ success, attendance }` |

---

## 🏛️ Architecture & Modèle Relationnel

### Architecture du Système

```mermaid
flowchart TD
    Client["Client Web (HTML5 / CSS3 / Vanilla JS)"]
    API["Serveur Node.js REST API (HTTP ESM)"]
    DB["Base de Données / In-Memory Store"]
    SQL["Schéma Relationnel SQL (database/schema.sql)"]

    Client -- "HTTP GET /api/*" --> API
    API -- "Extraction & Agrégation" --> DB
    SQL -. "DDL & Structure Relationnelle" .-> DB
    API -- "JSON Responses" --> Client
```

### Schéma Entité-Association (ERD)

```mermaid
erDiagram
    STUDENTS ||--o{ ENROLLMENTS : "s'inscrit à"
    COURSES ||--o{ ENROLLMENTS : "comprend"
    STUDENTS ||--o{ ATTENDANCE : "enregistre"

    STUDENTS {
        int id PK
        string number
        string name
        string program
        int semester
    }

    COURSES {
        int id PK
        string code
        string title
        int credits
        string instructor
        string room
    }

    ENROLLMENTS {
        int id PK
        int student_id FK
        string course_code FK
        float midterm
        float final
        string status
    }

    ATTENDANCE {
        int id PK
        int student_id FK
        int total_sessions
        int present
        int absent
    }
```

---

## 🚀 Démarrage Rapide

### 1. Démarrer le serveur
```bash
npm start
```
Accédez ensuite au portail via : `http://localhost:3005`

### 2. Lancer les tests automatisés
```bash
npm test
```
La suite de tests vérifie l'intégrité des modèles de données, le calcul précis des moyennes (GPA), la conformité syntaxique du schéma DDL SQL et les 5 points d'accès HTTP REST.

---

## 👨‍💻 Concepteur & Développeur

**Mohammed AICHOUR**  
- GitHub : [@Mohammed-aichour](https://github.com/Mohammed-aichour)  
- Profil & Portfolio : Intégré au portfolio professionnel officiel.
