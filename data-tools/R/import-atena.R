library(conflicted)
library(readxl)
library(dplyr)
library(stringr)
library(janitor)
library(sf)
library(gdalUtilities)

conflict_prefer_all("dplyr", quiet = TRUE)

###################################
# Définition des chemins, à adapter

atena_filename = "data/Aquapreneur_ATENA_fev2025.xlsx"
linear_geoms_filename = "data/Charente/bassin_LR_MN_polyline.shp"
poly_geoms_filename = "data/Charente/bassin_LR_MN_region.shp"


################################
# Chargement des fichiers source

atena = read_excel(atena_filename) |>
  clean_names() |>
  # La colonne "NUM_VERSION" est en double dans la source
  select(-num_version_70) |>
  rename(num_version = num_version_7)

linear_geoms = st_read(linear_geoms_filename) |>
  st_transform(2154) |>
  st_buffer(5, endCapStyle = "SQUARE")

poly_geoms = st_read(poly_geoms_filename) |>
  st_transform(2154)


########################
# Traitement des données

all_geoms = linear_geoms |>
  rbind(poly_geoms) |>
  clean_names() |>
  filter(!is.na(cm1par) & !is.na(quartier)) |>
  # Certaines parcelles apparaissent en multiple exemplaires, on aggrège leurs géométries
  group_by(quartier, cm1par) |>
  summarise(.groups = "drop") |>
  st_cast("MULTIPOLYGON")

geo_atena = atena |>
  left_join(
    all_geoms,
    by = c("code_quartier_parcelle" = "quartier", "numero_parcelle" = "cm1par")
  ) |>
  # filter(!st_is_empty(geometry)) |>
  st_as_sf() |>
  st_transform(4326)


###########################
# Envoi à la base de donnée

tmp_filename = tempfile(fileext = ".geojson")
st_write(geo_atena, tmp_filename, delete_dsn = TRUE)

dotenv::load_dot_env("../.env")
gdalUtilities::ogr2ogr(
  tmp_filename,
  str_glue(
    "Pg:{Sys.getenv('DATABASE_URL')}&application_name=ogr2ogr"
  ),
  nln = "atena",
  overwrite = TRUE,
  update = TRUE,
  lco = c("FID=id", "-lco", "GEOMETRY_NAME=geom")
)
