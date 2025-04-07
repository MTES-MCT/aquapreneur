# Récupération de la NAF rév. 2
# https://www.insee.fr/fr/information/2120875

library(withr)
library(readxl)
library(janitor)
library(dplyr)
library(stringr)
library(jsonlite)


url = "https://www.insee.fr/fr/statistiques/fichier/2120875/int_courts_naf_rev_2.xls"

with_tempfile("naf_xls_filename", {
  download.file(url, naf_xls_filename, mode = 'wb')
  xls_data = readxl::read_xls(naf_xls_filename) |>
    clean_names() |>
    select(code, label = intitules_de_la_naf_rev_2_version_finale) |>
    filter(!is.na(code) & str_length(code) == 6)
  json_data = toJSON(xls_data)

  writeLines(json_data, "../data/naf-rev2.json")
})
