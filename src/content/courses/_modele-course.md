---
# Modèle de course : copie ce fichier dans src/content/courses/<année>/nom-de-la-course.md
# (sans le "_" au début du nom, sinon il est ignoré), puis remplis les champs.
# Les champs marqués (optionnel) peuvent être supprimés.
nom: "Marathon de Paris"
sport: "Course à pied"          # Course à pied, Trail, Triathlon, Vélo, Duathlon, Swimrun…
date: 2026-04-12                # AAAA-MM-JJ
lieu: "Paris, France"           # ville, pays : sert aussi à dessiner le fond de carte
# coordonnees: "48.8566, 2.3522" # (optionnel) précise l'emplacement de la carte
distance: 42.195                # (optionnel) en km, avec un point comme séparateur décimal
denivele: 120                   # (optionnel) D+ en mètres
temps: "3:29:45"                # (optionnel) h:mm:ss, entre guillemets
                                #   → l'allure (min/km) est calculée pour la course à pied et le trail,
                                #     la vitesse (km/h) pour le vélo
classement: "4 210 / 52 000"    # (optionnel) classement général
classementCategorie: "512 / 6 000 (M40)"  # (optionnel) classement dans ta catégorie
tags:                           # (optionnel)
  - marathon
---

Le premier paragraphe sert de résumé sur la page Courses.

## Le récit

Raconte ta course ici, en Markdown.

![Description de la photo](/courses/paris-2026/arrivee.jpg)
