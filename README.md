# Morten Hoel - Profesjonell Nettside

Dette er den offisielle nettsiden for Morten Hoel, som tilbyr tjenester innen:

- **Fysisk helse** - Vektnedgang og energi
- **Mental styrke** - Psykisk helsehjelp
- **Dronefilm** - Profesjonelle videoprosjekter
- **Idrettsviphing** - Keepertrening for barn

## Teknologi

Nettstedet er bygget med:
- React 19 + TypeScript
- Tailwind CSS 4
- tRPC for API-kommunikasjon
- Express backend
- MySQL/TiDB database
- Manus OAuth autentisering

## Utvikling

### Installasjon
```bash
pnpm install
```

### Kjør utviklingsserver
```bash
pnpm dev
```

### Database
```bash
# Push schema endringer
pnpm db:push

# Generer migrasjoner
pnpm db:generate
```

### Bygg for produksjon
```bash
pnpm build
```

## Vedlikehold

For å oppdatere nettstedet:

1. Gjør endringer i koden
2. Test lokalt med `pnpm dev`
3. Commit endringene:
   ```bash
   git add .
   git commit -m "Beskrivelse av endringer"
   git push
   ```

## Lisens

© 2025 Morten Hoel. Alle rettigheter reservert.
