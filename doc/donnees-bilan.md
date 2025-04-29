# Correspondance des données

## Données de Stock

| Espèce                     | Stade               | Unité   | Nom CGO          | Nom Aquapreneur                  |
| -------------------------- | ------------------- | ------- | ---------------- | -------------------------------- |
| **Huître**                 | Naissain en mille   | millier | `StckVolHNaisMi` | `stock__huitre__nais_mil__qt`    |
|                            |                     | €       | `StckValHNaisMi` | `stock__huitre__nais_mil__val`   |
|                            | Naissain en kg      | kg      | `StckVolHNaisKg` | `stock__huitre__nais_kg__qt`     |
|                            |                     | €       | `StckValHNaisKg` | `stock__huitre__nais_kg__val`    |
|                            | Demi-élevage        | kg      | `StckVolHDElv`   | `stock__huitre__demi_elv__qt`    |
|                            |                     | €       | `StckValHDElv`   | `stock__huitre__demi_elv__val`   |
|                            | Adulte élevage      | kg      | `StckVolHElv`    | `stock__huitre__elv__qt`         |
|                            |                     | €       | `StckValHElv`    | `stock__huitre__elv__val`        |
|                            | Adulte consommation | kg      | `StckVolHConso`  | `stock__huitre__conso__qt`       |
|                            |                     | €       | `StckValHConso`  | `stock__huitre__conso__val`      |
| **Moule**                  | Naissain            | m corde | `StckVolMNaiss`  | `stock__moule__nais__qt`         |
|                            |                     | €       | `StckValMNaiss`  | `stock__moule__nais__val`        |
|                            | Demi-élevage        | kg      | `StckVolMDElv`   | `stock__moule__demi_elv__qt`     |
|                            |                     | €       | `StckValMDElv`   | `stock__moule__demi_elv__val`    |
|                            | Adulte consommation | kg      | `StckVolMConso`  | `stock__moule__conso__qt`        |
|                            |                     | €       | `StckValMConso`  | `stock__moule__conso__val`       |
| **Palourde**               | Naissain            | ?       | `StckVolPNaiss`  | `stock__palourde__nais__qt`      |
|                            |                     | €       | `StckValPNaiss`  | `stock__palourde__nais__val`     |
|                            | Demi-élevage        | kg      | `StckVolPDElv`   | `stock__palourde__demi_elv__qt`  |
|                            |                     | €       | `StckValPDElv`   | `stock__palourde__demi_elv__val` |
|                            | Adulte consommation | kg      | `StckVolPConso`  | `stock__palourde__conso__qt`     |
|                            |                     | €       | `StckValPConso`  | `stock__palourde__conso__val`    |
| **Gambas**                 | Larves              | millier | `StckVolGLarv`   | `stock__gambas__larve__qt`       |
|                            |                     | €       | `StckValGLarv`   | `stock__gambas__larve__val`      |
|                            | Pré-grossies        | kg      | `StckVolGPreg`   | `stock__gambas__pregros__qt`     |
|                            |                     | €       | `StckValGPreg`   | `stock__gambas__pregros__val`    |
|                            | Adulte consommation | kg      | `StckVolGConso`  | `stock__gambas__conso__qt`       |
|                            |                     | €       | `StckValGConso`  | `stock__gambas__conso__val`      |
| **Poissons**               |                     | libellé | `LibPois`        | `stock__poisson__lib`            |
|                            |                     | kg      | `StckVolPois`    | `stock__poisson__qt`             |
|                            |                     | €       | `StckValPois`    | `stock__poisson__val`            |
| **Autres coquillages**     |                     | libellé | `LibACoq`        | `stock__autre_coq__lib`          |
|                            |                     | kg      | `StckVolACoq`    | `stock__autre_coq__qt`           |
|                            |                     | €       | `StckValACoq`    | `stock__autre_coq__val`          |
| **Autres prod. aquacoles** |                     | libellé | `LibAPAqua`      | `stock__autre__lib`              |
|                            |                     | kg      | `StckVolAPAqua`  | `stock__autre__qt`               |
|                            |                     | €       | `StckValAPAqua`  | `stock__autre__val`              |

---

## Données de Production

| Espèce                | Stade               | Destination    | Détail       | Unité   | Nom CGO          | Nom Aquapreneur                             |
| --------------------- | ------------------- | -------------- | ------------ | ------- | ---------------- | ------------------------------------------- |
| **Huître**            | Naissain            | France         |              | millier | `VolVtHNaissFr`  | `prod__huitre__nais__fr__qt`                |
|                       |                     |                |              | €       | `CAHNaissFr`     | `prod__huitre__nais__fr__val`               |
|                       |                     | Export UE      |              | millier | `VolVtHNaissUE`  | `prod__huitre__nais__ue__qt`                |
|                       |                     |                |              | €       | `CAHNaissUE`     | `prod__huitre__nais__ue__val`               |
|                       |                     | Export hors UE |              | millier | `VolVtHNaissAu`  | `prod__huitre__nais__nue__qt`               |
|                       |                     |                |              | €       | `CAHNaissAu`     | `prod__huitre__nais__nue__val`              |
|                       | Demi-élevage        | France         |              | kg      | `VolVtHDElvFr`   | `prod__huitre__demi_elv__fr__qt`            |
|                       |                     |                |              | €       | `CAHDElvFr`      | `prod__huitre__demi_elv__fr__val`           |
|                       |                     | Export UE      |              | kg      | `VolVtHDElvUE`   | `prod__huitre__demi_elv__ue__qt`            |
|                       |                     |                |              | €       | `CAHDElvUE`      | `prod__huitre__demi_elv__ue__val`           |
|                       |                     | Export hors UE |              | kg      | `VolVtHDElvAu`   | `prod__huitre__demi_elv__nue__qt`           |
|                       |                     |                |              | €       | `CAHDElvAU`      | `prod__huitre__demi_elv__nue__val`          |
|                       | Adulte élevage      | France         |              | kg      | `VolVtHElvFr`    | `prod__huitre__elv__fr__qt`                 |
|                       |                     |                |              | €       | `CAHElvFr`       | `prod__huitre__elv__fr__val`                |
|                       |                     | Export UE      |              | kg      | `VolVtHElvUE`    | `prod__huitre__elv__ue__qt`                 |
|                       |                     |                |              | €       | `CAHElvUE`       | `prod__huitre__elv__ue__val`                |
|                       |                     | Export hors UE |              | kg      | `VolVtHElvAu`    | `prod__huitre__elv__nue__qt`                |
|                       |                     |                |              | €       | `CAHElvAu`       | `prod__huitre__elv__nue__val`               |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtHCoFrPro`  | `prod__huitre__conso__fr__pro__qt`          |
|                       |                     |                |              | €       | `CAHCoFrPro`     | `prod__huitre__conso__fr__pro__val`         |
|                       |                     |                | Détail       | kg      | `VolVtHCoFrDet`  | `prod__huitre__conso__fr__detail__qt`       |
|                       |                     |                |              | €       | `CAHCoFrDet`     | `prod__huitre__conso__fr__detail__val`      |
|                       |                     |                | Grossistes   | kg      | `VolVtHCoFrGros` | `prod__huitre__conso__fr__grossiste__qt`    |
|                       |                     |                |              | €       | `CAHCoFrGros`    | `prod__huitre__conso__fr__grossiste__val`   |
|                       |                     |                | Poissoneries | kg      | `VolVtHCoFrPCE`  | `prod__huitre__conso__fr__poiss__qt`        |
|                       |                     |                |              | €       | `CAHCoFrPCE`     | `prod__huitre__conso__fr__poiss__val`       |
|                       |                     |                | PGMS         | kg      | `VolVtHCoFrPGMS` | `prod__huitre__conso__fr__pgms__qt`         |
|                       |                     |                |              | €       | `CAHCoFrPGMS`    | `prod__huitre__conso__fr__pgms__val`        |
|                       |                     |                | Dégustation  | kg      | `VolVtHCoFrDeg`  | `prod__huitre__conso__fr__degust__qt`       |
|                       |                     |                |              | €       | `CAHCoFrDeg`     | `prod__huitre__conso__fr__degust__val`      |
|                       |                     | Export UE      | En gros      | kg      | `VolVtHCoUEPro`  | `prod__huitre__conso__ue__pro__qt`          |
|                       |                     |                |              | €       | `CAHCoUEPro`     | `prod__huitre__conso__ue__pro__val`         |
|                       |                     |                | Expédition   | kg      | `VolVtHCoUEGros` | `prod__huitre__conso__ue__expe__qt`         |
|                       |                     |                |              | €       | `CAHCoUEGros`    | `prod__huitre__conso__ue__expe__val`        |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtHCoAuPro`  | `prod__huitre__conso__nue__pro__qt`         |
|                       |                     |                |              | €       | `CAHCoAuPro`     | `prod__huitre__conso__nue__pro__val`        |
|                       |                     |                | Expédition   | kg      | `VolVtHCoAuGros` | `prod__huitre__conso__nue__expe__qt`        |
|                       |                     |                |              | €       | `CAHCoAuGros`    | `prod__huitre__conso__nue__expe__val`       |
|                       | Non catégorisées    |                |              | kg      | `VolVtHFrNCat`   | `prod__huitre__autre__qt`                   |
|                       |                     |                |              | €       | `CAHFrNCat`      | `prod__huitre__autre__val`                  |
| **Moule**             | Naissain            | France         |              | m corde | `VolVtMNaissFr`  | `prod__moule__nais__fr__qt`                 |
|                       |                     |                |              | €       | `CAMNaissFr`     | `prod__moule__nais__fr__val`                |
|                       |                     | Export UE      |              | m corde | `VolVtMNaissUE`  | `prod__moule__nais__ue__qt`                 |
|                       |                     |                |              | €       | `CAMNaissUE`     | `prod__moule__nais__ue__val`                |
|                       |                     | Export hors UE |              | m corde | `VolVtMNaissAu`  | `prod__moule__nais__nue__qt`                |
|                       |                     |                |              | €       | `CAMNaissAu`     | `prod__moule__nais__nue__val`               |
|                       | Demi-élevage        | France         |              | kg      | `VolVtMDElvFr`   | `prod__moule__demi_elv__fr__qt`             |
|                       |                     |                |              | €       | `CAMDElvFr`      | `prod__moule__demi_elv__fr__val`            |
|                       |                     | Export UE      |              | kg      | `VolVtMDElvUE`   | `prod__moule__demi_elv__ue__qt`             |
|                       |                     |                |              | €       | `CAMDElvUE`      | `prod__moule__demi_elv__ue__val`            |
|                       |                     | Export hors UE |              | kg      | `VolVtMDElvAu`   | `prod__moule__demi_elv__nue__qt`            |
|                       |                     |                |              | €       | `CAMDElvAU`      | `prod__moule__demi_elv__nue__val`           |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtMCoFrPro`  | `prod__moule__conso__fr__pro__qt`           |
|                       |                     |                |              | €       | `CAMCoFrPro`     | `prod__moule__conso__fr__pro__val`          |
|                       |                     |                | Détail       | kg      | `VolVtMCoFrDet`  | `prod__moule__conso__fr__detail__qt`        |
|                       |                     |                |              | €       | `CAMCoFrDet`     | `prod__moule__conso__fr__detail__val`       |
|                       |                     |                | Grossistes   | kg      | `VolVtMCoFrGros` | `prod__moule__conso__fr__grossiste__qt`     |
|                       |                     |                |              | €       | `CAMCoFrGros`    | `prod__moule__conso__fr__grossiste__val`    |
|                       |                     |                | Poissoneries | kg      | `VolVtMCoFrPCE`  | `prod__moule__conso__fr__poiss__qt`         |
|                       |                     |                |              | €       | `CAMCoFrPCE`     | `prod__moule__conso__fr__poiss__val`        |
|                       |                     |                | PGMS         | kg      | `VolVtMCoFrPGMS` | `prod__moule__conso__fr__pgms__qt`          |
|                       |                     |                |              | €       | `CAMCoFrPGMS`    | `prod__moule__conso__fr__pgms__val`         |
|                       |                     |                | Dégustation  | kg      | `VolVtMCoFrDeg`  | `prod__moule__conso__fr__degust__qt`        |
|                       |                     |                |              | €       | `CAMCoFrDeg`     | `prod__moule__conso__fr__degust__val`       |
|                       |                     | Export UE      | En gros      | kg      | `VolVtMCoUEPro`  | `prod__moule__conso__ue__pro__qt`           |
|                       |                     |                |              | €       | `CAMCoUEPro`     | `prod__moule__conso__ue__pro__val`          |
|                       |                     |                | Expédition   | kg      | `VolVtMCoUEGros` | `prod__moule__conso__ue__expe__qt`          |
|                       |                     |                |              | €       | `CAMCoUEGros`    | `prod__moule__conso__ue__expe__val`         |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtMCoAuPro`  | `prod__moule__conso__nue__pro__qt`          |
|                       |                     |                |              | €       | `CAMCoAuPro`     | `prod__moule__conso__nue__pro__val`         |
|                       |                     |                | Expédition   | kg      | `VolVtMCoAuGros` | `prod__moule__conso__nue__expe__qt`         |
|                       |                     |                |              | €       | `CAMCoAuGros`    | `prod__moule__conso__nue__expe__val`        |
|                       | Non catégorisées    |                |              | kg      | `VolVtMFrNCat`   | `prod__moule__autre__qt`                    |
|                       |                     |                |              | €       | `CAMFrNCat`      | `prod__moule__autre__val`                   |
| **Palourde**          | Naissain            | France         |              | ?       | `VolVtPNaissFr`  | `prod__palourde__nais__fr__qt`              |
|                       |                     |                |              | €       | `CAPNaissFr`     | `prod__palourde__nais__fr__val`             |
|                       |                     | Export UE      |              | ?       | `VolVtPNaissUE`  | `prod__palourde__nais__ue__qt`              |
|                       |                     |                |              | €       | `CAPNaissUE`     | `prod__palourde__nais__ue__val`             |
|                       |                     | Export hors UE |              | ?       | `VolVtPNaissAu`  | `prod__palourde__nais__nue__qt`             |
|                       |                     |                |              | €       | `CAPNaissAu`     | `prod__palourde__nais__nue__val`            |
|                       | Demi-élevage        | France         |              | kg      | `VolVtPDElvFr`   | `prod__palourde__demi_elv__fr__qt`          |
|                       |                     |                |              | €       | `CAPDElvFr`      | `prod__palourde__demi_elv__fr__val`         |
|                       |                     | Export UE      |              | kg      | `VolVtPDElvUE`   | `prod__palourde__demi_elv__ue__qt`          |
|                       |                     |                |              | €       | `CAPDElvUE`      | `prod__palourde__demi_elv__ue__val`         |
|                       |                     | Export hors UE |              | kg      | `VolVtPDElvAu`   | `prod__palourde__demi_elv__nue__qt`         |
|                       |                     |                |              | €       | `CAPDElvAU`      | `prod__palourde__demi_elv__nue__val`        |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtPCoFrPro`  | `prod__palourde__conso__fr__pro__qt`        |
|                       |                     |                |              | €       | `CAPCoFrPro`     | `prod__palourde__conso__fr__pro__val`       |
|                       |                     |                | Détail       | kg      | `VolVtPCoFrDet`  | `prod__palourde__conso__fr__detail__qt`     |
|                       |                     |                |              | €       | `CAPCoFrDet`     | `prod__palourde__conso__fr__detail__val`    |
|                       |                     |                | Grossistes   | kg      | `VolVtPCoFrGros` | `prod__palourde__conso__fr__grossiste__qt`  |
|                       |                     |                |              | €       | `CAPCoFrGros`    | `prod__palourde__conso__fr__grossiste__val` |
|                       |                     |                | Poissoneries | kg      | `VolVtPCoFrPCE`  | `prod__palourde__conso__fr__poiss__qt`      |
|                       |                     |                |              | €       | `CAPCoFrPCE`     | `prod__palourde__conso__fr__poiss__val`     |
|                       |                     |                | GMS          | kg      | `VolVtPCoFrPGMS` | `prod__palourde__conso__fr__pgms__qt`       |
|                       |                     |                |              | €       | `CAPCoFrPGMS`    | `prod__palourde__conso__fr__pgms__val`      |
|                       |                     |                | Dégustation  | kg      | `VolVtPCoFrDeg`  | `prod__palourde__conso__fr__degust__qt`     |
|                       |                     |                |              | €       | `CAPCoFrDeg`     | `prod__palourde__conso__fr__degust__val`    |
|                       |                     | Export UE      | En gros      | kg      | `VolVtPCoUEPro`  | `prod__palourde__conso__ue__pro__qt`        |
|                       |                     |                |              | €       | `CAPCoUEPro`     | `prod__palourde__conso__ue__pro__val`       |
|                       |                     |                | Expédition   | kg      | `VolVtPCoUEGros` | `prod__palourde__conso__ue__expe__qt`       |
|                       |                     |                |              | €       | `CAPCoUEGros`    | `prod__palourde__conso__ue__expe__val`      |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtPCoAuPro`  | `prod__palourde__conso__nue__pro__qt`       |
|                       |                     |                |              | €       | `CAPCoAuPro`     | `prod__palourde__conso__nue__pro__val`      |
|                       |                     |                | Expédition   | kg      | `VolVtPCoAuGros` | `prod__palourde__conso__nue__expe__qt`      |
|                       |                     |                |              | €       | `CAPCoAuGros`    | `prod__palourde__conso__nue__expe__val`     |
|                       | Non catégorisées    |                |              | kg      | `VolVtPFrNCat`   | `prod__palourde__autre__qt`                 |
|                       |                     |                |              | €       | `CAPFrNCat`      | `prod__palourde__autre__val`                |
| **Gambas**            | Larces              | France         |              | millier | `VolVtGNaissFr`  | `prod__gambas__larve__fr__qt`               |
|                       |                     |                |              | €       | `CAGNaissFr`     | `prod__gambas__larve__fr__val`              |
|                       |                     | Export UE      |              | millier | `VolVtGNaissUE`  | `prod__gambas__larve__ue__qt`               |
|                       |                     |                |              | €       | `CAGNaissUE`     | `prod__gambas__larve__ue__val`              |
|                       |                     | Export hors UE |              | millier | `VolVtGNaissAu`  | `prod__gambas__larve__nue__qt`              |
|                       |                     |                |              | €       | `CAGNaissAu`     | `prod__gambas__larve__nue__val`             |
|                       | Prégrossies         | France         |              | kg      | `VolVtGDElvFr`   | `prod__gambas__pregros__fr__qt`             |
|                       |                     |                |              | €       | `CAGDElvFr`      | `prod__gambas__pregros__fr__val`            |
|                       |                     | Export UE      |              | kg      | `VolVtGDElvUE`   | `prod__gambas__pregros__ue__qt`             |
|                       |                     |                |              | €       | `CAGDElvUE`      | `prod__gambas__pregros__ue__val`            |
|                       |                     | Export hors UE |              | kg      | `VolVtGDElvAu`   | `prod__gambas__pregros__nue__qt`            |
|                       |                     |                |              | €       | `CAGDElvAU`      | `prod__gambas__pregros__nue__val`           |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtGCoFrPro`  | `prod__gambas__conso__fr__pro__qt`          |
|                       |                     |                |              | €       | `CAGCoFrPro`     | `prod__gambas__conso__fr__pro__val`         |
|                       |                     |                | Détail       | kg      | `VolVtGCoFrDet`  | `prod__gambas__conso__fr__detail__qt`       |
|                       |                     |                |              | €       | `CAGCoFrDet`     | `prod__gambas__conso__fr__detail__val`      |
|                       |                     |                | Grossistes   | kg      | `VolVtGCoFrGros` | `prod__gambas__conso__fr__grossiste__qt`    |
|                       |                     |                |              | €       | `CAGCoFrGros`    | `prod__gambas__conso__fr__grossiste__val`   |
|                       |                     |                | Poissoneries | kg      | `VolVtGCoFrPCE`  | `prod__gambas__conso__fr__poiss__qt`        |
|                       |                     |                |              | €       | `CAGCoFrPCE`     | `prod__gambas__conso__fr__poiss__val`       |
|                       |                     |                | PGMS         | kg      | `VolVtGCoFrPGMS` | `prod__gambas__conso__fr__pgms__qt`         |
|                       |                     |                |              | €       | `CAGCoFrPGMS`    | `prod__gambas__conso__fr__pgms__val`        |
|                       |                     |                | Dégustation  | kg      | `VolVtGCoFrDeg`  | `prod__gambas__conso__fr__degust__qt`       |
|                       |                     |                |              | €       | `CAGCoFrDeg`     | `prod__gambas__conso__fr__degust__val`      |
|                       |                     | Export UE      | En gros      | kg      | `VolVtGCoUEPro`  | `prod__gambas__conso__ue__pro__qt`          |
|                       |                     |                |              | €       | `CAGCoUEPro`     | `prod__gambas__conso__ue__pro__val`         |
|                       |                     |                | Expédition   | kg      | `VolVtGCoUEGros` | `prod__gambas__conso__ue__expe__qt`         |
|                       |                     |                |              | €       | `CAGCoUEGros`    | `prod__gambas__conso__ue__expe__val`        |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtGCoAuPro`  | `prod__gambas__conso__nue__pro__qt`         |
|                       |                     |                |              | €       | `CAGCoAuPro`     | `prod__gambas__conso__nue__pro__val`        |
|                       |                     |                | Expédition   | kg      | `VolVtGCoAuGros` | `prod__gambas__conso__nue__expe__qt`        |
|                       |                     |                |              | €       | `CAGCoAuGros`    | `prod__gambas__conso__nue__expe__val`       |
|                       | Non catégorisées    |                |              | kg      | `VolVtGFrNCat`   | `prod__gambas__autre__qt`                   |
|                       |                     |                |              | €       | `CAGFrNCat`      | `prod__gambas__autre__val`                  |
| **Poisson**           |                     | France         |              | kg      | `VolVtPoisFr`    | `prod__poisson__fr__qt`                     |
|                       |                     |                |              | €       | `CAPoisFr`       | `prod__poisson__fr__val`                    |
| **Autres coq.**       |                     | France         |              | kg      | `VolVtACoqFr`    | `prod__autre_coq__fr__qt`                   |
|                       |                     |                |              | €       | `CAACoqFr`       | `prod__autre_coq__fr__val`                  |
|                       |                     | Export UE      |              | kg      | `VolVtACoqUE`    | `prod__autre_coq__ue__qt`                   |
|                       |                     |                |              | €       | `CAACoqUE`       | `prod__autre_coq__ue__val`                  |
|                       |                     | Export hors UE |              | kg      | `VolVtACoqAu`    | `prod__autre_coq__nue__qt`                  |
|                       |                     |                |              | €       | `CAACoqAu`       | `prod__autre_coq__nue__val`                 |
| **Autres prod. aqu.** |                     | France         |              | kg      | `VolVtAPAquaFr`  | `prod__autre__fr__qt`                       |
|                       |                     |                |              | €       | `CAAPAquaFr`     | `prod__autre__fr__val`                      |
|                       |                     | Export UE      |              | kg      | `VolVtAPAquaUE`  | `prod__autre__ue__qt`                       |
|                       |                     |                |              | €       | `CAAPAquaUE`     | `prod__autre__ue__val`                      |
|                       |                     | Export hors UE |              | kg      | `VolVtAPAquaAu`  | `prod__autre__nue__qt`                      |
|                       |                     |                |              | €       | `CAAPAquaAu`     | `prod__autre__nue__val`                     |

## Données économiques

### Revenus

|                                                | Unité | Nom CGO     | Nom Aquapreneur                        |
| ---------------------------------------------- | ----- | ----------- | -------------------------------------- |
| **Total Production vendue**                    | €     | `CATot`     | `eco__revs__total_production_vendue`   |
| **CA vente produit aquaculture achat/revente** | €     | `CAAchRev`  | `eco__revs__ca_aqua_achat_revente`     |
| **Autres revenus**                             | €     | `ArevD`     | `eco__revs__autres_revenus`            |
| **Subventions d'exploitation**                 | €     | `Subv`      | `eco__revs__subvention_exploitation`   |
| **Subventions d'investissement**               | €     | `SubInvest` | `eco__revs__subvention_investissement` |

### Dépenses de personnel

|                                                           | Unité | Nom CGO       | Nom Aquapreneur                                      |
| --------------------------------------------------------- | ----- | ------------- | ---------------------------------------------------- |
| **Traitements et salaires des personnels**                | €     | `Salaire`     | `eco__rh__traitements_salaires_personnels`           |
| **Dépenses liées à la main d'œuvre extérieure**           | €     | `MOExt`       | `eco__rh__main_oeuvre_exterieure`                    |
| **Charges sociales liées à la main d'œuvre non salariée** | €     | `CHSocNonSal` | `eco__rh__charges_sociales_main_oeuvre_non_salariee` |
| **Valeur imputée de la main d'œuvre non salariée**        | €     | `NonSal`      | `eco__rh__valeur_imputee_main_oeuvre_non_salariee`   |

### Coûts énergétiques

|                        | Unité | Nom CGO   | Nom Aquapreneur           |
| ---------------------- | ----- | --------- | ------------------------- |
| **Coûts énergétiques** | €     | `Energie` | `eco__couts_energetiques` |

### Coûts des matières premières

| Espèce                | Stade               | Unité   | Nom CGO        | Nom Aquapreneur                       |
| --------------------- | ------------------- | ------- | -------------- | ------------------------------------- |
| **Huître**            | Naissain            | €       | `AchHNaiss`    | `eco__achat__huitre__nais__val`       |
|                       |                     | millier | `VolAchHNaiss` | `eco__achat__huitre__nais__qt`        |
|                       | Demi-élevage        | €       | `AchHDElv`     | `eco__achat__huitre__demi_elv__val`   |
|                       |                     | kg      | `VolAchHDElv`  | `eco__achat__huitre__demi_elv__qt`    |
|                       | Adulte élevage      | €       | `AchHElv`      | `eco__achat__huitre__elv__val`        |
|                       |                     | kg      | `VolAchHElv`   | `eco__achat__huitre__elv__qt`         |
|                       | Adulte consommation | €       | `AchHConso`    | `eco__achat__huitre__conso__val`      |
|                       |                     | kg      | `VolAchHConso` | `eco__achat__huitre__conso__qt`       |
| **Moule**             | Naissain            | €       | `AchMNaiss`    | `eco__achat__moule__nais__val`        |
|                       |                     | m corde | `VolAchMnaiss` | `eco__achat__moule__nais__qt`         |
|                       | Demi-élevage        | €       | `AchMDElv`     | `eco__achat__moule__demi_elv__val`    |
|                       |                     | kg      | `VolAchMDElv`  | `eco__achat__moule__demi_elv__qt`     |
|                       | Adulte consommation | €       | `AchMConso`    | `eco__achat__moule__conso__val`       |
|                       |                     | kg      | `VolAchMConso` | `eco__achat__moule__conso__qt`        |
| **Palourde**          | Naissain            | €       | `AchPNaiss`    | `eco__achat__palourde__nais__val`     |
|                       |                     | m corde | `VolAchPnaiss` | `eco__achat__palourde__nais__qt`      |
|                       | Demi-élevage        | €       | `AchPDElv`     | `eco__achat__palourde__demi_elv__val` |
|                       |                     | kg      | `VolAchPDElv`  | `eco__achat__palourde__demi_elv__qt`  |
|                       | Adulte consommation | €       | `AchPConso`    | `eco__achat__palourde__conso__val`    |
|                       |                     | kg      | `VolAchPConso` | `eco__achat__palourde__conso__qt`     |
| **Gambas**            | Larves              | €       | `AchGNaiss`    | `eco__achat__gambas__larve__val`      |
|                       |                     | m corde | `VolAchGnaiss` | `eco__achat__gambas__larve__qt`       |
|                       | Prégrossies         | €       | `AchGDElv`     | `eco__achat__gambas__pregros__val`    |
|                       |                     | kg      | `VolAchGDElv`  | `eco__achat__gambas__pregros__qt`     |
|                       | Adulte consommation | €       | `AchGConso`    | `eco__achat__gambas__conso__val`      |
|                       |                     | kg      | `VolAchGConso` | `eco__achat__gambas__conso__qt`       |
| **Autres coq.**       | Toutes tailles      | €       | `AchAcoq`      | `eco__achat__autre_coq__val`          |
|                       |                     | kg      | `VolAchAcoq`   | `eco__achat__autre_coq__qt`           |
| **Autres prods. aq.** |                     | €       | `AchAPAqua`    | `eco__achat__autre__val`              |
|                       |                     | kg      | `VolAchAPAqua` | `eco__achat__autre__qt`               |

|                        | Unité | Nom CGO | Nom Aquapreneur        |
| ---------------------- | ----- | ------- | ---------------------- |
| **Coûts des aliments** | €     | CtAlim  | `eco__achat__aliments` |

|                                | Unité | Nom CGO | Nom Aquapreneur                   |
| ------------------------------ | ----- | ------- | --------------------------------- |
| **Autres coûts opérationnels** | €     | `CtOp`  | `eco__autres_couts_operationnels` |

|                               | Unité | Nom CGO | Nom Aquapreneur               |
| ----------------------------- | ----- | ------- | ----------------------------- |
| **Entretiens et réparations** | €     | `Repar` | `eco__entretiens_reparations` |

### Coûts en capital

|                              | Unité | Nom CGO  | Nom Aquapreneur                             |
| ---------------------------- | ----- | -------- | ------------------------------------------- |
| **Amortissement du capital** | €     | `Amort`  | `eco__couts_capital__amortissement_capital` |
| **Charges financières**      | €     | `CtFi`   | `eco__couts_capital__charges_financieres`   |
| **Produits financiers**      | €     | `ProdFi` | `eco__couts_capital__produits_financiers`   |
| **Capitaux propres**         | €     | `Capito` | `eco__couts_capital__capitaux_propres`      |

### Resultat exceptionnel

|                             | Unité | Nom CGO    | Nom Aquapreneur                    |
| --------------------------- | ----- | ---------- | ---------------------------------- |
| **Charges exceptionnelles** | €     | `CtExcp`   | `eco__res_except__charges_except`  |
| **Produits exceptionnels**  | €     | `ProdExcp` | `eco__res_except__produits_except` |

### Valeur totale des actifs

|                              | Unité | Nom CGO | Nom Aquapreneur                 |
| ---------------------------- | ----- | ------- | ------------------------------- |
| **Valeur totale des actifs** | €     | `Actif` | `eco__valeur_totale_des_actifs` |

### Investissements

|                                  | Unité | Nom CGO      | Nom Aquapreneur            |
| -------------------------------- | ----- | ------------ | -------------------------- |
| **Total des investissements**    | €     | `Invest`     | `eco__invest__total`       |
| **Acquisition d'immobilisation** | €     | `Acqui_Immo` | `eco__invest__acquisition` |
| **Cession d'immobilisation**     | €     | `Cess_Immo`  | `eco__invest__cession`     |

### Passif

|                                   | Unité | Nom CGO    | Nom Aquapreneur                        |
| --------------------------------- | ----- | ---------- | -------------------------------------- |
| **Total dettes**                  | €     | `Dettes`   | `eco__passif__dettes`                  |
| **Emprunts et dettes assimilées** | €     | `Emprunts` | `eco__passif__emprunts_dettes_assimil` |

### Chiffre d’affaires

|                        | Unité | Nom CGO   | Nom Aquapreneur |
| ---------------------- | ----- | --------- | --------------- |
| **Chiffre d’affaires** | €     | `CACompt` | `eco__ca`       |

### Total produits

|                    | Unité | Nom CGO   | Nom Aquapreneur       |
| ------------------ | ----- | --------- | --------------------- |
| **Total produits** | €     | `TotProd` | `eco__total_produits` |

### Total charges

|                   | Unité | Nom CGO     | Nom Aquapreneur      |
| ----------------- | ----- | ----------- | -------------------- |
| **Total charges** | €     | `TotCharge` | `eco__total_charges` |

### Soldes intermédiaires de gestion

|                                  | Unité | Nom CGO           | Nom Aquapreneur                        |
| -------------------------------- | ----- | ----------------- | -------------------------------------- |
| **Valeur ajoutée**               | €     | `VA`              | `eco__sig__valeur_ajoutee`             |
| **Excédent brut d'exploitation** | €     | `EBE`             | `eco__sig__excedent_brut_exploitation` |
| **Résultat courant**             | €     | `ResultatCourant` | `eco__sig__resultat_courant`           |
| **Résultat net**                 | €     | `ResultatNet`     | `eco__sig__resultat_net`               |
