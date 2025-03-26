
# Digital Service Empire

Une application web complète pour vendre des services de marketing digital, avec gestion des paiements via Stripe.

## Structure du projet

Le projet est organisé en deux parties principales :

- **Frontend** : Application React avec Vite, Tailwind CSS et Shadcn UI
- **Backend** : API REST avec Express, MongoDB et Stripe

## Installation et démarrage

### Configuration globale

1. Clonez le dépôt
2. Installez les dépendances du projet :

```bash
# Installer les dépendances frontend
cd frontend
npm install

# Installer les dépendances backend
cd ../backend
npm install
```

### Configuration du backend

1. Copiez le fichier `.env.example` en `.env` et configurez vos variables d'environnement :

```bash
cd backend
cp .env.example .env
```

2. Configurez les valeurs dans le fichier `.env` :
   - Clés Stripe (secret et webhook)
   - URI de connexion MongoDB
   - Configuration d'emails
   - URL du frontend

### Démarrage du projet

1. Démarrez le backend :

```bash
cd backend
npm run dev
```

2. Démarrez le frontend :

```bash
cd frontend
npm run dev
```

3. Accédez à l'application dans votre navigateur à l'adresse indiquée (généralement http://localhost:8080)

## Fonctionnalités principales

- Catalogue de services de marketing digital
- Panier d'achat
- Paiements sécurisés via Stripe
- Tableau de bord administrateur
- Notifications par email
- Suivi des commandes

## Production

Pour déployer en production :

1. Construisez le frontend :
```bash
cd frontend
npm run build
```

2. Déployez le dossier `dist` généré sur votre hébergement statique

3. Déployez le backend sur un serveur Node.js (comme Heroku, DigitalOcean, AWS, etc.)

4. Configurez les variables d'environnement sur votre serveur de production
