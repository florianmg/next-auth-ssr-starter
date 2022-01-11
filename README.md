# Setup

Le projet utilise firebase pour la gestion connexion / inscription + firestore comme base de donnée

## Firebase

1. Se connecter a la console firebase et créer un nouveau projet
2. Dans _Authentication > Sign-in method_: Activer **e-mail** et **google**
3. Dans _Authentication > Templates_: Modifier URL d'action par http://localhost:3000/action
4. Activer Firestore

## Projet

Créer un fichier `.env.local`

**Insérer les valeurs suivantes :**
FIREBASE_ADMIN_SDK_PRIVATE_KEY
FIREBASE_ADMIN_SDK_CLIENT_EMAIL
FIREBASE_ADMIN_SDK_PROJECT_ID
FIREBASE_ADMIN_SDK_DATABASE_URL

    npm i
    npm run dev

## Infos

Tous les textes se trouvent dans `/public/locales`

## Docs

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth system](https://colinhacks.com/essays/nextjs-firebase-authentication)
- [Translations package](https://github.com/isaachinman/next-i18next)
