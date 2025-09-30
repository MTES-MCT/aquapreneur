.PHONY: init clean atena nafv2

init:
	Rscript -e "renv::restore()"

# Traitement de l’export brut ATENA, et import dans la BDD
atena: init
	Rscript R/import-atena.R

# Mise à jour des codes NAFv2
nafv2: init
	Rscript R/naf.R

clean:
	rm -rf renv/library renv/staging
