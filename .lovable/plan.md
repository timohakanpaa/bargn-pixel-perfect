
# Instagram-julkaisuintegraatio — Admin Some-asetukset

## Kokonaisarkkitehtuuri

Admin syöttää Instagram-tunnistetiedot (Access Token + Instagram Account ID) erilliselle asetussivulle, jotka tallennetaan tietokantaan salattuna. MaterialBank-näkymässä jokaisen materiaalin korttiin ilmestyy "Julkaise Instagramiin" -nappi, joka kutsuu uutta Edge Functionia.

```text
Admin (/materials tai /admin)
  ↓ Syöttää Instagram Access Token + Account ID
  ↓ Tallennetaan tietokantaan (social_accounts -taulu)
  
MaterialBank -kortti
  ↓ Admin klikkaa "📸 Julkaise Instagramiin"
  ↓ publish-to-instagram Edge Function
      1. Hakee Access Tokenin tietokannasta
      2. Luo media-containerin Meta Graph API:lla (kuvan URL + caption)
      3. Julkaisee containerin (publish API call)
      4. Tallentaa instagram_post_id materiaaliin
  ↓ Nappi muuttuu vihreäksi checkmarkiksi + näyttää julkaisupäivän
```

## Mitä rakennetaan

### 1. Tietokantamigraatio

Uusi taulu `social_accounts` Instagram-tokenien tallentamiseen (admin-only RLS):

```sql
CREATE TABLE public.social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,          -- 'instagram'
  account_id text NOT NULL,        -- Instagram Business Account ID
  account_name text,               -- Näytettävä nimi (esim. @bargn.fi)
  access_token text NOT NULL,      -- Long-lived Access Token
  expires_at timestamptz,          -- Token vanhenemisaika
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

Lisäksi sarakkeet `content_materials`-tauluun:
```sql
ALTER TABLE content_materials 
  ADD COLUMN instagram_post_id text,
  ADD COLUMN published_to_instagram_at timestamptz;
```

### 2. Uusi Edge Function: `publish-to-instagram`

Logiikka:
1. Tarkistaa admin-roolin (sama kaava kuin muissakin funktioissa)
2. Hakee `social_accounts`-taulusta Instagram Access Tokenin ja Account ID:n
3. Hakee materiaalin `content_materials`-taulusta (image_url + caption)
4. Kutsuu Meta Graph API:a kahdessa vaiheessa:
   - `POST /{ig-user-id}/media` → luo containerin
   - `POST /{ig-user-id}/media_publish` → julkaisee
5. Tallentaa `instagram_post_id` ja `published_to_instagram_at` materiaaliin
6. Palauttaa `{ success: true, post_id: "..." }`

### 3. Uusi komponentti: `InstagramSettings.tsx`

Sijoitus: `/materials`-sivun admin-näkymään (MaterialBank sisälle uutena välilehtenä tai korttina "Some-asetukset").

Sisältää:
- **Syötekentät**: Instagram Access Token (password-kenttä) + Instagram Business Account ID
- **Tallennusnappi**: Kutsuu suoraan `social_accounts`-tauluun upsertillä
- **Nykyinen tila**: Näyttää onko tili yhdistetty (account_name + vanhenemisaika), ei paljasta tokenia
- **Ohjeet**: Lyhyt selitys mistä saa tokenin (developers.facebook.com)

### 4. Muutokset MaterialBank.tsx:ään

Jokaisen materiaalin korttiin admin-napeiksi lisätään:

```tsx
// Uusi nappi olemassa olevien Copy/Download/Edit-nappien rinnalle
<Button 
  size="sm" 
  variant={material.instagram_post_id ? "default" : "outline"}
  onClick={() => publishToInstagram(material)}
  disabled={publishing || !instagramConnected}
>
  {material.instagram_post_id 
    ? <><Check className="w-3 h-3 mr-1 text-green-400" /> Instassa</>
    : <><Instagram className="w-3 h-3 mr-1" /> Julkaise Instaan</>
  }
</Button>
```

Uusi funktio `publishToInstagram(material)`:
- Kutsuu `supabase.functions.invoke("publish-to-instagram", { body: { material_id } })`
- Päivittää tilan lokaalisti onnistumisen jälkeen

### 5. Muutokset `content_materials`-tyyppiin

Päivitetään `ContentMaterial`-interface MaterialBank.tsx:ssä lisäämällä:
- `instagram_post_id: string | null`
- `published_to_instagram_at: string | null`

## Tekniset yksityiskohdat

### Meta Graph API -kutsut

```
POST https://graph.instagram.com/v22.0/{ig-user-id}/media
  body: { image_url, caption, access_token }
  → palauttaa: { id: "container_id" }

POST https://graph.instagram.com/v22.0/{ig-user-id}/media_publish
  body: { creation_id: "container_id", access_token }
  → palauttaa: { id: "post_id" }
```

**Tärkeää**: Kuvan URL täytyy olla julkisesti saatavilla — `content-materials` storage-bucket on julkinen, joten image_url toimii suoraan.

### RLS-politiikat `social_accounts`-taululle

- SELECT, INSERT, UPDATE, DELETE: vain admin (`has_role(auth.uid(), 'admin')`)
- Anonyymit ja tavalliset käyttäjät eivät pääse lainkaan dataan

### Edge Function -autentikointi

Sama malli kuin `generate-content-material`: `verify_jwt = false` config.tomlissa, manuaalinen token-tarkistus + admin-rolin varmistus.

## Toteutusjärjestys

1. **Migraatio**: Luo `social_accounts` taulu + lisää sarakkeet `content_materials`-tauluun
2. **Edge Function**: `publish-to-instagram/index.ts`
3. **Config.toml**: Lisää `[functions.publish-to-instagram] verify_jwt = false`
4. **InstagramSettings-komponentti**: Tokenien syöttö ja tallentaminen
5. **MaterialBank.tsx**: Lisää "Julkaise Instaan" -nappi + `publishToInstagram`-funktio + Some-asetukset-välilehti/osio
6. **Tyypit**: Päivitä `ContentMaterial`-interface

## Mitä admin tarvitsee ennen käyttöä

Admin-paneelissa näytetään ohjeet:

1. Mene osoitteeseen [developers.facebook.com](https://developers.facebook.com)
2. Luo App → Business-tyyppi → lisää "Instagram Graph API" -tuote
3. Hanki **Long-lived Access Token** (kestää 60 päivää)
4. Hanki **Instagram Business Account ID** (löytyy IG:n asetuksista tai Graph API Explorerista)
5. Syötä nämä alla oleviin kenttiin

## Rajoitukset

- Kuvien täytyy olla PNG/JPEG — generoidut kuvat ovat PNG, mikä toimii
- Instagram sallii max 100 julkaisua/24h
- Long-lived token vanhenee 60 päivän kuluttua — näytetään varoitus kun vanheneminen lähestyy
- Reels/video-julkaisuja tämä ei tue (vain stillkuvat)
