# Nombre del archivo Makefile: Makefile

# Comando predeterminado que se ejecutará cuando solo se llame `make`
default: help

# Objetivo para agregar, confirmar y enviar cambios a Git
commit:
	@read -p "Enter your commit message: " MESSAGE; \
	git add .; \
	git commit -m "$$MESSAGE"; \
	git push

# Objetivo de ayuda que muestra las opciones disponibles
help:
	@echo "Uso: make <comando>"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  commit  Agrega, confirma y envía los cambios a Git (requiere ingresar un mensaje de confirmación)"

install:
	npm install --force

migrate:
	npx prisma migrate dev

up:
	npm run directionUpload
	npm run salonUpload

createUser:
	npm run seed

delete:
	#sudo chmod 777 -R prisma/
	rm -R prisma/migrations
	rm prisma/database.db
run:
	#npm run dev
	npm run build
	npm run start &
run2:
	npm run dev
	
pull:
	git pull
.PHONY: help commit install run pull
