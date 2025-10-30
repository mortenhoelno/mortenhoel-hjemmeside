# Morten Hoel - Brukerveiledning

## Om nettstedet

**Formål:** Dette er Morten Hoels personlige nettsted hvor besøkende kan lære om hans fire tjenester: vektnedgang, mental styrke, dronefilm og keepertrening.

**Tilgang:** Offentlig tilgjengelig. Administratortilgang kreves kun for å publisere nyheter.

## Powered by Manus

Dette nettstedet er bygget med moderne webutviklingsteknologi for optimal ytelse og brukeropplevelse. Frontend er utviklet med React 19, TypeScript og Tailwind CSS for et responsivt og moderne design. Backend kjører på Express med tRPC for type-sikker kommunikasjon mellom klient og server. Databasen er MySQL/TiDB som håndterer nyhetsinnlegg og nyhetsbrevabonnenter. Autentisering er implementert med Manus OAuth for sikker innlogging. Deployment skjer på auto-skalerende infrastruktur med globalt CDN for rask lasting over hele verden.

## Bruke nettstedet

Når du besøker forsiden møter du Mortens portrett og introduksjon. Scroll ned for å se fire tjenestekort: "Fysisk helse", "Dronefilm", "Mental styrke" og "Idrettsviphing". Klikk på "GÅ TIL PORTAL" på et kort for å lese mer om tjenesten i en popup-dialog. Lukk dialogen ved å klikke utenfor eller på X-knappen.

For å melde deg på nyhetsbrevet, scroll til bunnen av siden. Fyll inn e-postadressen din (navn er valgfritt) og klikk "Meld deg på". Du får en bekreftelse når påmeldingen er vellykket.

Nyhetsområdet viser de tre siste nyhetene fra Morten. Dette oppdateres automatisk når nye nyheter publiseres.

## Administrere nettstedet

For å publisere nyheter må du være logget inn som administrator. Gå til `/admin` i nettleseren. Hvis du ikke er logget inn blir du bedt om å logge inn via Manus OAuth. På admin-panelet finner du et skjema for å publisere nye nyheter. Fyll inn tittel, kort beskrivelse (valgfritt) og innhold, deretter klikk "Publiser". Nyheten vises umiddelbart på forsiden.

Du kan også se alle nyhetsbrevabonnenter i admin-panelet. Listen viser navn og e-postadresse for hver abonnent.

For å endre nettstedets navn eller logo, gå til Management UI → Settings → General. For å administrere domenet, gå til Settings → Domains. Database-administrasjon er tilgjengelig i Management UI → Database hvor du kan se og redigere alle tabeller.

## Neste steg

Snakk med Manus AI når som helst for å be om endringer eller legge til nye funksjoner. Du kan for eksempel legge til en kontaktskjema, integrere dronevideoer direkte på siden, eller utvide admin-panelet med flere funksjoner. Nettstedet er klart til bruk og kan publiseres ved å klikke Publish-knappen i Management UI.
