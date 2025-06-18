# Correspondance des données CGO

## Données de Stock

| Espèce                     | Stade               | Unité   | Nom CGO          |
| -------------------------- | ------------------- | ------- | ---------------- |
| **Huître**                 | Naissain en mille   | millier | `StckVolHNaisMi` |
|                            |                     | €       | `StckValHNaisMi` |
|                            | Naissain en kg      | kg      | `StckVolHNaisKg` |
|                            |                     | €       | `StckValHNaisKg` |
|                            | Demi-élevage        | kg      | `StckVolHDElv`   |
|                            |                     | €       | `StckValHDElv`   |
|                            | Adulte élevage      | kg      | `StckVolHElv`    |
|                            |                     | €       | `StckValHElv`    |
|                            | Adulte consommation | kg      | `StckVolHConso`  |
|                            |                     | €       | `StckValHConso`  |
| **Moule**                  | Naissain            | m corde | `StckVolMNaiss`  |
|                            |                     | €       | `StckValMNaiss`  |
|                            | Demi-élevage        | kg      | `StckVolMDElv`   |
|                            |                     | €       | `StckValMDElv`   |
|                            | Adulte consommation | kg      | `StckVolMConso`  |
|                            |                     | €       | `StckValMConso`  |
| **Palourde**               | Naissain            | ?       | `StckVolPNaiss`  |
|                            |                     | €       | `StckValPNaiss`  |
|                            | Demi-élevage        | kg      | `StckVolPDElv`   |
|                            |                     | €       | `StckValPDElv`   |
|                            | Adulte consommation | kg      | `StckVolPConso`  |
|                            |                     | €       | `StckValPConso`  |
| **Gambas**                 | Larves              | millier | `StckVolGLarv`   |
|                            |                     | €       | `StckValGLarv`   |
|                            | Pré-grossies        | kg      | `StckVolGPreg`   |
|                            |                     | €       | `StckValGPreg`   |
|                            | Adulte consommation | kg      | `StckVolGConso`  |
|                            |                     | €       | `StckValGConso`  |
| **Poissons**               |                     | libellé | `LibPois`        |
|                            |                     | kg      | `StckVolPois`    |
|                            |                     | €       | `StckValPois`    |
| **Autres coquillages**     |                     | libellé | `LibACoq`        |
|                            |                     | kg      | `StckVolACoq`    |
|                            |                     | €       | `StckValACoq`    |
| **Autres prod. aquacoles** |                     | libellé | `LibAPAqua`      |
|                            |                     | kg      | `StckVolAPAqua`  |
|                            |                     | €       | `StckValAPAqua`  |

---

## Données de Production

| Espèce                | Stade               | Destination    | Détail       | Unité   | Nom CGO          |
| --------------------- | ------------------- | -------------- | ------------ | ------- | ---------------- |
| **Huître**            | Naissain            | France         |              | millier | `VolVtHNaissFr`  |
|                       |                     |                |              | €       | `CAHNaissFr`     |
|                       |                     | Export UE      |              | millier | `VolVtHNaissUE`  |
|                       |                     |                |              | €       | `CAHNaissUE`     |
|                       |                     | Export hors UE |              | millier | `VolVtHNaissAu`  |
|                       |                     |                |              | €       | `CAHNaissAu`     |
|                       | Demi-élevage        | France         |              | kg      | `VolVtHDElvFr`   |
|                       |                     |                |              | €       | `CAHDElvFr`      |
|                       |                     | Export UE      |              | kg      | `VolVtHDElvUE`   |
|                       |                     |                |              | €       | `CAHDElvUE`      |
|                       |                     | Export hors UE |              | kg      | `VolVtHDElvAu`   |
|                       |                     |                |              | €       | `CAHDElvAU`      |
|                       | Adulte élevage      | France         |              | kg      | `VolVtHElvFr`    |
|                       |                     |                |              | €       | `CAHElvFr`       |
|                       |                     | Export UE      |              | kg      | `VolVtHElvUE`    |
|                       |                     |                |              | €       | `CAHElvUE`       |
|                       |                     | Export hors UE |              | kg      | `VolVtHElvAu`    |
|                       |                     |                |              | €       | `CAHElvAu`       |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtHCoFrPro`  |
|                       |                     |                |              | €       | `CAHCoFrPro`     |
|                       |                     |                | Détail       | kg      | `VolVtHCoFrDet`  |
|                       |                     |                |              | €       | `CAHCoFrDet`     |
|                       |                     |                | Grossistes   | kg      | `VolVtHCoFrGros` |
|                       |                     |                |              | €       | `CAHCoFrGros`    |
|                       |                     |                | Poissoneries | kg      | `VolVtHCoFrPCE`  |
|                       |                     |                |              | €       | `CAHCoFrPCE`     |
|                       |                     |                | PGMS         | kg      | `VolVtHCoFrPGMS` |
|                       |                     |                |              | €       | `CAHCoFrPGMS`    |
|                       |                     |                | Dégustation  | kg      | `VolVtHCoFrDeg`  |
|                       |                     |                |              | €       | `CAHCoFrDeg`     |
|                       |                     | Export UE      | En gros      | kg      | `VolVtHCoUEPro`  |
|                       |                     |                |              | €       | `CAHCoUEPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtHCoUEGros` |
|                       |                     |                |              | €       | `CAHCoUEGros`    |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtHCoAuPro`  |
|                       |                     |                |              | €       | `CAHCoAuPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtHCoAuGros` |
|                       |                     |                |              | €       | `CAHCoAuGros`    |
|                       | Non catégorisées    |                |              | kg      | `VolVtHFrNCat`   |
|                       |                     |                |              | €       | `CAHFrNCat`      |
| **Moule**             | Naissain            | France         |              | m corde | `VolVtMNaissFr`  |
|                       |                     |                |              | €       | `CAMNaissFr`     |
|                       |                     | Export UE      |              | m corde | `VolVtMNaissUE`  |
|                       |                     |                |              | €       | `CAMNaissUE`     |
|                       |                     | Export hors UE |              | m corde | `VolVtMNaissAu`  |
|                       |                     |                |              | €       | `CAMNaissAu`     |
|                       | Demi-élevage        | France         |              | kg      | `VolVtMDElvFr`   |
|                       |                     |                |              | €       | `CAMDElvFr`      |
|                       |                     | Export UE      |              | kg      | `VolVtMDElvUE`   |
|                       |                     |                |              | €       | `CAMDElvUE`      |
|                       |                     | Export hors UE |              | kg      | `VolVtMDElvAu`   |
|                       |                     |                |              | €       | `CAMDElvAU`      |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtMCoFrPro`  |
|                       |                     |                |              | €       | `CAMCoFrPro`     |
|                       |                     |                | Détail       | kg      | `VolVtMCoFrDet`  |
|                       |                     |                |              | €       | `CAMCoFrDet`     |
|                       |                     |                | Grossistes   | kg      | `VolVtMCoFrGros` |
|                       |                     |                |              | €       | `CAMCoFrGros`    |
|                       |                     |                | Poissoneries | kg      | `VolVtMCoFrPCE`  |
|                       |                     |                |              | €       | `CAMCoFrPCE`     |
|                       |                     |                | PGMS         | kg      | `VolVtMCoFrPGMS` |
|                       |                     |                |              | €       | `CAMCoFrPGMS`    |
|                       |                     |                | Dégustation  | kg      | `VolVtMCoFrDeg`  |
|                       |                     |                |              | €       | `CAMCoFrDeg`     |
|                       |                     | Export UE      | En gros      | kg      | `VolVtMCoUEPro`  |
|                       |                     |                |              | €       | `CAMCoUEPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtMCoUEGros` |
|                       |                     |                |              | €       | `CAMCoUEGros`    |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtMCoAuPro`  |
|                       |                     |                |              | €       | `CAMCoAuPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtMCoAuGros` |
|                       |                     |                |              | €       | `CAMCoAuGros`    |
|                       | Non catégorisées    |                |              | kg      | `VolVtMFrNCat`   |
|                       |                     |                |              | €       | `CAMFrNCat`      |
| **Palourde**          | Naissain            | France         |              | ?       | `VolVtPNaissFr`  |
|                       |                     |                |              | €       | `CAPNaissFr`     |
|                       |                     | Export UE      |              | ?       | `VolVtPNaissUE`  |
|                       |                     |                |              | €       | `CAPNaissUE`     |
|                       |                     | Export hors UE |              | ?       | `VolVtPNaissAu`  |
|                       |                     |                |              | €       | `CAPNaissAu`     |
|                       | Demi-élevage        | France         |              | kg      | `VolVtPDElvFr`   |
|                       |                     |                |              | €       | `CAPDElvFr`      |
|                       |                     | Export UE      |              | kg      | `VolVtPDElvUE`   |
|                       |                     |                |              | €       | `CAPDElvUE`      |
|                       |                     | Export hors UE |              | kg      | `VolVtPDElvAu`   |
|                       |                     |                |              | €       | `CAPDElvAU`      |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtPCoFrPro`  |
|                       |                     |                |              | €       | `CAPCoFrPro`     |
|                       |                     |                | Détail       | kg      | `VolVtPCoFrDet`  |
|                       |                     |                |              | €       | `CAPCoFrDet`     |
|                       |                     |                | Grossistes   | kg      | `VolVtPCoFrGros` |
|                       |                     |                |              | €       | `CAPCoFrGros`    |
|                       |                     |                | Poissoneries | kg      | `VolVtPCoFrPCE`  |
|                       |                     |                |              | €       | `CAPCoFrPCE`     |
|                       |                     |                | GMS          | kg      | `VolVtPCoFrPGMS` |
|                       |                     |                |              | €       | `CAPCoFrPGMS`    |
|                       |                     |                | Dégustation  | kg      | `VolVtPCoFrDeg`  |
|                       |                     |                |              | €       | `CAPCoFrDeg`     |
|                       |                     | Export UE      | En gros      | kg      | `VolVtPCoUEPro`  |
|                       |                     |                |              | €       | `CAPCoUEPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtPCoUEGros` |
|                       |                     |                |              | €       | `CAPCoUEGros`    |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtPCoAuPro`  |
|                       |                     |                |              | €       | `CAPCoAuPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtPCoAuGros` |
|                       |                     |                |              | €       | `CAPCoAuGros`    |
|                       | Non catégorisées    |                |              | kg      | `VolVtPFrNCat`   |
|                       |                     |                |              | €       | `CAPFrNCat`      |
| **Gambas**            | Larces              | France         |              | millier | `VolVtGNaissFr`  |
|                       |                     |                |              | €       | `CAGNaissFr`     |
|                       |                     | Export UE      |              | millier | `VolVtGNaissUE`  |
|                       |                     |                |              | €       | `CAGNaissUE`     |
|                       |                     | Export hors UE |              | millier | `VolVtGNaissAu`  |
|                       |                     |                |              | €       | `CAGNaissAu`     |
|                       | Prégrossies         | France         |              | kg      | `VolVtGDElvFr`   |
|                       |                     |                |              | €       | `CAGDElvFr`      |
|                       |                     | Export UE      |              | kg      | `VolVtGDElvUE`   |
|                       |                     |                |              | €       | `CAGDElvUE`      |
|                       |                     | Export hors UE |              | kg      | `VolVtGDElvAu`   |
|                       |                     |                |              | €       | `CAGDElvAU`      |
|                       | Adulte consommation | France         | En gros      | kg      | `VolVtGCoFrPro`  |
|                       |                     |                |              | €       | `CAGCoFrPro`     |
|                       |                     |                | Détail       | kg      | `VolVtGCoFrDet`  |
|                       |                     |                |              | €       | `CAGCoFrDet`     |
|                       |                     |                | Grossistes   | kg      | `VolVtGCoFrGros` |
|                       |                     |                |              | €       | `CAGCoFrGros`    |
|                       |                     |                | Poissoneries | kg      | `VolVtGCoFrPCE`  |
|                       |                     |                |              | €       | `CAGCoFrPCE`     |
|                       |                     |                | PGMS         | kg      | `VolVtGCoFrPGMS` |
|                       |                     |                |              | €       | `CAGCoFrPGMS`    |
|                       |                     |                | Dégustation  | kg      | `VolVtGCoFrDeg`  |
|                       |                     |                |              | €       | `CAGCoFrDeg`     |
|                       |                     | Export UE      | En gros      | kg      | `VolVtGCoUEPro`  |
|                       |                     |                |              | €       | `CAGCoUEPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtGCoUEGros` |
|                       |                     |                |              | €       | `CAGCoUEGros`    |
|                       |                     | Export hors UE | En gros      | kg      | `VolVtGCoAuPro`  |
|                       |                     |                |              | €       | `CAGCoAuPro`     |
|                       |                     |                | Expédition   | kg      | `VolVtGCoAuGros` |
|                       |                     |                |              | €       | `CAGCoAuGros`    |
|                       | Non catégorisées    |                |              | kg      | `VolVtGFrNCat`   |
|                       |                     |                |              | €       | `CAGFrNCat`      |
| **Poisson**           |                     | France         |              | kg      | `VolVtPoisFr`    |
|                       |                     |                |              | €       | `CAPoisFr`       |
| **Autres coq.**       |                     | France         |              | kg      | `VolVtACoqFr`    |
|                       |                     |                |              | €       | `CAACoqFr`       |
|                       |                     | Export UE      |              | kg      | `VolVtACoqUE`    |
|                       |                     |                |              | €       | `CAACoqUE`       |
|                       |                     | Export hors UE |              | kg      | `VolVtACoqAu`    |
|                       |                     |                |              | €       | `CAACoqAu`       |
| **Autres prod. aqu.** |                     | France         |              | kg      | `VolVtAPAquaFr`  |
|                       |                     |                |              | €       | `CAAPAquaFr`     |
|                       |                     | Export UE      |              | kg      | `VolVtAPAquaUE`  |
|                       |                     |                |              | €       | `CAAPAquaUE`     |
|                       |                     | Export hors UE |              | kg      | `VolVtAPAquaAu`  |
|                       |                     |                |              | €       | `CAAPAquaAu`     |

## Données économiques

### Revenus

|                                                | Unité | Nom CGO     |
| ---------------------------------------------- | ----- | ----------- |
| **Total Production vendue**                    | €     | `CATot`     |
| **CA vente produit aquaculture achat/revente** | €     | `CAAchRev`  |
| **Autres revenus**                             | €     | `ArevD`     |
| **Subventions d'exploitation**                 | €     | `Subv`      |
| **Subventions d'investissement**               | €     | `SubInvest` |

### Dépenses de personnel

|                                                           | Unité | Nom CGO       |
| --------------------------------------------------------- | ----- | ------------- |
| **Traitements et salaires des personnels**                | €     | `Salaire`     |
| **Dépenses liées à la main d'œuvre extérieure**           | €     | `MOExt`       |
| **Charges sociales liées à la main d'œuvre non salariée** | €     | `CHSocNonSal` |
| **Valeur imputée de la main d'œuvre non salariée**        | €     | `NonSal`      |

### Coûts énergétiques

|                        | Unité | Nom CGO   |
| ---------------------- | ----- | --------- |
| **Coûts énergétiques** | €     | `Energie` |

### Coûts des matières premières

| Espèce                | Stade               | Unité   | Nom CGO        |
| --------------------- | ------------------- | ------- | -------------- |
| **Huître**            | Naissain            | €       | `AchHNaiss`    |
|                       |                     | millier | `VolAchHNaiss` |
|                       | Demi-élevage        | €       | `AchHDElv`     |
|                       |                     | kg      | `VolAchHDElv`  |
|                       | Adulte élevage      | €       | `AchHElv`      |
|                       |                     | kg      | `VolAchHElv`   |
|                       | Adulte consommation | €       | `AchHConso`    |
|                       |                     | kg      | `VolAchHConso` |
| **Moule**             | Naissain            | €       | `AchMNaiss`    |
|                       |                     | m corde | `VolAchMnaiss` |
|                       | Demi-élevage        | €       | `AchMDElv`     |
|                       |                     | kg      | `VolAchMDElv`  |
|                       | Adulte consommation | €       | `AchMConso`    |
|                       |                     | kg      | `VolAchMConso` |
| **Palourde**          | Naissain            | €       | `AchPNaiss`    |
|                       |                     | m corde | `VolAchPnaiss` |
|                       | Demi-élevage        | €       | `AchPDElv`     |
|                       |                     | kg      | `VolAchPDElv`  |
|                       | Adulte consommation | €       | `AchPConso`    |
|                       |                     | kg      | `VolAchPConso` |
| **Gambas**            | Larves              | €       | `AchGNaiss`    |
|                       |                     | m corde | `VolAchGnaiss` |
|                       | Prégrossies         | €       | `AchGDElv`     |
|                       |                     | kg      | `VolAchGDElv`  |
|                       | Adulte consommation | €       | `AchGConso`    |
|                       |                     | kg      | `VolAchGConso` |
| **Autres coq.**       | Toutes tailles      | €       | `AchAcoq`      |
|                       |                     | kg      | `VolAchAcoq`   |
| **Autres prods. aq.** |                     | €       | `AchAPAqua`    |
|                       |                     | kg      | `VolAchAPAqua` |

|                        | Unité | Nom CGO |
| ---------------------- | ----- | ------- |
| **Coûts des aliments** | €     | CtAlim  |

|                                | Unité | Nom CGO |
| ------------------------------ | ----- | ------- |
| **Autres coûts opérationnels** | €     | `CtOp`  |

|                               | Unité | Nom CGO |
| ----------------------------- | ----- | ------- |
| **Entretiens et réparations** | €     | `Repar` |

### Coûts en capital

|                              | Unité | Nom CGO  |
| ---------------------------- | ----- | -------- |
| **Amortissement du capital** | €     | `Amort`  |
| **Charges financières**      | €     | `CtFi`   |
| **Produits financiers**      | €     | `ProdFi` |
| **Capitaux propres**         | €     | `Capito` |

### Resultat exceptionnel

|                             | Unité | Nom CGO    |
| --------------------------- | ----- | ---------- |
| **Charges exceptionnelles** | €     | `CtExcp`   |
| **Produits exceptionnels**  | €     | `ProdExcp` |

### Valeur totale des actifs

|                              | Unité | Nom CGO |
| ---------------------------- | ----- | ------- |
| **Valeur totale des actifs** | €     | `Actif` |

### Investissements

|                                  | Unité | Nom CGO      |
| -------------------------------- | ----- | ------------ |
| **Total des investissements**    | €     | `Invest`     |
| **Acquisition d'immobilisation** | €     | `Acqui_Immo` |
| **Cession d'immobilisation**     | €     | `Cess_Immo`  |

### Passif

|                                   | Unité | Nom CGO    |
| --------------------------------- | ----- | ---------- |
| **Total dettes**                  | €     | `Dettes`   |
| **Emprunts et dettes assimilées** | €     | `Emprunts` |

### Chiffre d’affaires

|                        | Unité | Nom CGO   |
| ---------------------- | ----- | --------- |
| **Chiffre d’affaires** | €     | `CACompt` |

### Total produits

|                    | Unité | Nom CGO   |
| ------------------ | ----- | --------- |
| **Total produits** | €     | `TotProd` |

### Total charges

|                   | Unité | Nom CGO     |
| ----------------- | ----- | ----------- |
| **Total charges** | €     | `TotCharge` |

### Soldes intermédiaires de gestion

|                                  | Unité | Nom CGO           |
| -------------------------------- | ----- | ----------------- |
| **Valeur ajoutée**               | €     | `VA`              |
| **Excédent brut d'exploitation** | €     | `EBE`             |
| **Résultat courant**             | €     | `ResultatCourant` |
| **Résultat net**                 | €     | `ResultatNet`     |
