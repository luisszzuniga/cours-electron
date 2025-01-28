# Cahier des Charges : Simulateur de Feu de Forêt
Tout est présent dans la [Release 0.20.0](https://github.com/luisszzuniga/cours-electron/releases/tag/v0.20.0)

## Contexte
L'application, développée avec Electron, simule la propagation d'un feu de forêt sur un certain nombre d'itérations. Elle permet de visualiser les impacts des différents facteurs environnementaux tels que le vent, le type de sol et la végétation.

## Objectifs
1. Fournir une simulation réaliste de la propagation d’un feu de forêt en tenant compte de plusieurs paramètres environnementaux.
2. Offrir une interface utilisateur pour configurer les paramètres de la simulation.
3. Permettre des mises à jour automatiques de l'application via un système intégré (Auto Update).

## Fonctionnalités Principales
### Simulation du Feu de Forêt
- Description : Le simulateur divise la forêt en un quadrillage de cases (100x100 par défaut). Certaines cases sont initialement en feu et propagent les flammes aux cases voisines selon des règles prédéfinies.

- Mécanisme :
Les cases peuvent être dans un des états suivants : Cold, Burning, BurnedHot, BurnedCold.
Les flammes se propagent selon :
La force et la direction du vent.
Le type de sol (influence la probabilité de combustion).
La densité de la végétation (détermine si une case est inflammable).

### Options de la Simulation
Les utilisateurs peuvent personnaliser les paramètres avant de démarrer une simulation :

- Nombre d'itérations : Définit la durée de la simulation.

- Force du vent : Nul, Faible, Fort, Violent (influence la probabilité de propagation dans différentes directions).

- Type de sol :
Humide, Normal, Sec, Très Sec (modifie la probabilité d'inflammabilité).
- Densité de la végétation :
Continue, Peu espacée, Espacée, Clairsemée (contrôle la présence de végétation sur les cases).

### Interface Utilisateur
- Affichage graphique de la forêt sous forme de grille.
- Animation des itérations pour visualiser la propagation du feu.
- Panneau de configuration pour ajuster les paramètres avant le lancement.

### Mise à jour Automatique
Un système intégré permet de maintenir l'application à jour sans intervention de l’utilisateur.


## Règles Métiers
### Paramètres Environnementaux

Les probabilités de propagation et d’inflammabilité sont basées sur les enums :
- ForestWindForceEnum : Définit les probabilités de propagation en fonction du vent.
- ForestGroundTypeEnum : Définit l’inflammabilité du sol.
- ForestVegetationTypeEnum : Définit la densité de végétation.

Chaque case est initialisée avec un statut (Cold, Burning, BurnedHot, BurnedCold).


### Propagation des Flammes
Les cases adjacentes sont affectées en fonction des paramètres de vent, sol et végétation.
Les flammes se propagent uniquement si la probabilité calculée dépasse un seuil aléatoire.


### Évolution d'une Case

Cold → Burning → BurnedHot → BurnedCold selon des règles prédéfinies.

Une case sans végétation ne peut pas brûler.
