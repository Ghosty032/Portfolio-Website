import { NextResponse } from "next/server"

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing"

async function getAccessToken() {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: REFRESH_TOKEN!,
        }),
    })

    return response.json()
}

async function getNowPlaying() {
    const { access_token } = await getAccessToken()

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
}

export async function GET() {
    try {
        // Check if environment variables are set
        if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
            return NextResponse.json(
                { isPlaying: false, error: "Spotify credentials not configured" },
                { status: 500 }
            )
        }

        if (REFRESH_TOKEN === "your_refresh_token_here") {
            return NextResponse.json(
                { isPlaying: false, error: "Refresh token not set. Run the script to get it." },
                { status: 500 }
            )
        }

        const response = await getNowPlaying()

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false })
        }

        const song = await response.json()

        if (!song.item) {
            return NextResponse.json({ isPlaying: false })
        }

        const isPlaying = song.is_playing
        const title = song.item.name
        const artist = song.item.artists.map((artist: any) => artist.name).join(", ")
        const album = song.item.album.name
        const albumImageUrl = song.item.album.images[0]?.url
        const songUrl = song.item.external_urls.spotify

        return NextResponse.json({
            isPlaying,
            title,
            artist,
            album,
            albumImageUrl,
            songUrl,
        })
    } catch (error) {
        console.error("Error fetching Spotify data:", error)
        return NextResponse.json(
            { isPlaying: false, error: "Failed to fetch Spotify data" },
            { status: 500 }
        )
    }
}
