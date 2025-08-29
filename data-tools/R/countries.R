# Récupération du “Référentiel des pays et des territoires”
# https://www.data.gouv.fr/datasets/referentiel-des-pays-et-des-territoires/

library(withr)
library(readr)
library(janitor)
library(dplyr)
library(stringr)
library(jsonlite)


url = "https://www.data.gouv.fr/api/1/datasets/r/2b38f28d-15e7-4f0c-b61d-6ca1d9b1cfa2"


with_tempfile("referentiel_pays_territoires", {
	download.file(url, referentiel_pays_territoires, mode = 'wb')
	csv_data = read_csv2(
		referentiel_pays_territoires,
		locale = locale(encoding = "windows-1252")
	) |>
		clean_names() |>
		filter(souverain == 'O') |>
		select(iso_alpha2, label = nom_court) |>
		distinct() |>
		arrange(label, .locale = "fr")

	json_data = toJSON(csv_data)

	writeLines(json_data, "../src/lib/assets/data/referentiel-pays.json")
})
