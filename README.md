# 🎧 Recommendify

An engineer thesis React app that generates **Spotify music recommendations** based on a song you love. Built with **React + TypeScript**, Spotify Web API — perfect for exploring music tailored to your taste.

## 🌟 Features

- 🔗 **Paste a Spotify track URL** to get song-based recommendations
- 🧠 Uses **Spotify’s recommendation engine** for accuracy
- 🎯 Displays a **seed song card** and a grid of recommended tracks
- 📊 "Some Cool Stats" modal showing:
  - Your top artists (short/medium/long term)
- 🎵 Create and export a playlist to your **Spotify account**
- ✅ Playlist visibility toggle (public/private)
- 🌈 Fully responsive & stylish UI with themed Bootstrap + SCSS
- ✅ Unit tests & component tests powered by **Vitest**
- 🚀 Clean modular architecture with best practices (hooks, separation of concerns)

## 🧪 Tech Stack

| Category        | Tools / Libraries                         |
|----------------|--------------------------------------------|
| Frontend       | React, TypeScript                         |
| Styling        | SCSS (modularized), Bootstrap             |
| API            | Spotify Web API                           |
| Testing        | Vitest, React Testing Library             |
| State & Data   | React Query (@tanstack/react-query)       |
| Tooling        | Vite, ESLint, React Hook Form             |

## ⚙️ How It Works

This app allows users to generate a personalized playlist based on a song they input, leveraging Spotify’s recommendation engine and user profile data.

### 1. 🔐 Authentication with Spotify

The app uses **OAuth 2.0 Authorization Code Flow (Implicit Grant)** to authenticate users:

- When the user clicks **"Sign in and connect with Spotify"**, they are redirected to the Spotify login screen with the necessary scopes.
- After consent, Spotify redirects the user back with an **access token** embedded in the URL.
- The token is parsed and stored in **`localStorage`**, and passed to all API requests as a Bearer token.
- Token is validated and used to fetch user profile and top artist data.

---

### 2. 🔎 Track Search and Recommendation Flow

1. The user submits a **Spotify track URL** and selects the number of tracks.
2. The app extracts the **track ID** using a regular expression.
3. A call is made to the Spotify `GET /v1/recommendations` endpoint using the seed track.
4. The app displays recommended tracks with:
   - Track name
   - Artist(s)
   - Album image
   - Popularity score (visualized with a progress bar)

---

### 3. 📈 "Some Cool Stats" Modal

A modal accessible via the floating button shows personalized Spotify stats:

- Uses `/v1/me/top/artists`
- Time ranges: `short_term`, `medium_term`, `long_term`
- Popularity-based **bar chart** for top artists (via **Recharts**)
- Optional genre distribution chart (disabled if genre data is unavailable)

---

### 4. 💾 Export to Spotify Playlist

Once recommendations are generated:

1. The user clicks **"Add to my playlist!"**
2. Fills a modal form:
   - Playlist name
   - Public/Private toggle
3. The app sends:
   - `POST /v1/users/{user_id}/playlists` to create a playlist
   - `POST /v1/playlists/{playlist_id}/tracks` to add recommended tracks by URI
4. Displays a toast notification on success or error.

---


## 🤖 AI-Assisted Documentation

This README and project documentation were partially generated and refactored using **AI (ChatGPT)** to ensure clarity, consistency, and professionalism in structure and language — while maintaining full technical accuracy.

---

