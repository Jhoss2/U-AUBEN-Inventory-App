Architecture Plan: Aube Supplies Tracker (React Native CLI)

1. Project Structure

•
src/

•
assets/ (fonts, images)

•
components/ (UI elements)

•
database/ (SQLite setup, migrations, queries)

•
screens/ (Home, BlocDetails, RoomDetails, etc.)

•
navigation/ (React Navigation stack)

•
services/ (AI Assistant logic, File handling)

•
utils/ (Constants, Helpers)



2. Database Schema (SQLite)

Using react-native-sqlite-storage.

Table: settings

•
key (TEXT, PRIMARY KEY)

•
value (TEXT)

Table: blocs

•
id (TEXT, PRIMARY KEY)

•
mainImage (TEXT)

Table: sub_blocs

•
id (TEXT, PRIMARY KEY)

•
blocId (TEXT, FOREIGN KEY)

•
title (TEXT)

•
imageTitle (TEXT)

•
image (TEXT)

Table: salles

•
id (TEXT, PRIMARY KEY)

•
nom (TEXT)

•
emplacement (TEXT)

•
niveau (TEXT)

•
photoId (TEXT)

Table: materiel

•
id (TEXT, PRIMARY KEY)

•
salleId (TEXT, FOREIGN KEY)

•
categorie (TEXT)

•
nom (TEXT)

•
marque (TEXT)

•
couleur (TEXT)

•
etat (TEXT)

•
dateAcq (TEXT)

•
dateRen (TEXT)

•
infos (TEXT)

•
photoId (TEXT)

Table: notes

•
id (TEXT, PRIMARY KEY)

•
title (TEXT)

•
content (TEXT)

•
date (TEXT)

Table: alerts

•
id (TEXT, PRIMARY KEY)

•
title (TEXT)

•
message (TEXT)

•
date (TEXT)

•
read (INTEGER, 0 or 1)

•
materielId (TEXT, FOREIGN KEY)

Table: photos (to replace IndexedDB/FileSystem for blobs if needed, or store paths)

•
id (TEXT, PRIMARY KEY)

•
data (BLOB or TEXT for base64)

3. Navigation

Using @react-navigation/native and @react-navigation/stack.

•
Main Stack: Home -> BlocDetails -> SubBlocLevels -> RoomProfiles -> RoomDetails -> RoomContents

•
Modals: AddRoom, AddMateriel, Settings, ChatAube

4. Fonts

•
Inter

•
Algerian

•
Monotype Corsiva

