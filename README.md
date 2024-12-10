
# Backend sistem informasi E-book

berikut adalah cara untuk instalasi


## Instalasi
1. clone project
```bash
  git clone https://github.com/Teknologi-Open-Source-Kelas-C/Backend-Engineer.git
  cd Backend-Engineer
  code .
```
2. install npm
```bash
  npm install
```
3. run project
with nodemon
```bash
  npm run dev
```
without nodemon
```bash
  npm run start
```


## API Reference Documentation

#### End Point Matakuliah



| End Point | Method | Params | Description |
| :-- | :-- | :-- | :-- |
| `/api/matakuliah` | `GET` | `-`  | return semua matakuliah |
| `/api/matakuliah/:id` | `GET` | `id`(opt, number)  | return mengembalikan matakuliah berdasarkan id |
| `/api/matakuliah/` | `POST` | `-`  | menambah matakuliah baru |
| `/api/matakuliah/` | `PUT` | `-`  | mengedit matakuliah |
| `/api/matakuliah/` | `DELETE` | `-`  | menghapus matakuliah |

#### End Point Modul



| End Point | Method | Params | Description |
| :-- | :-- | :-- | :-- |
| `/api/modul` | `GET` | `-`  | return semua modul |
| `/api/modul/:id` | `GET` | `id` (opt, number)  | return modul berdasarkan id matakuliah  |
| `/api/modul/` | `POST` | `-`  | menambah modul baru |
| `/api/modul/` | `DELETE` | `-`  | menghapus modul |



