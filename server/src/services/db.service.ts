// Il ne faut PAS MODIFIER le chemin du fichier de base de données.
// Si le fichier n'est pas trouvé au lancement du programme,
// assurez vous d'avoir correctement exécuté le script d'installation du projet,
const DB = require("better-sqlite3")(
  "C:/dev/projects/ContextManager/server/db/project.db"
);

export { DB };
