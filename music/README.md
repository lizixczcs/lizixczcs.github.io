# Music folder

Drop your `.mp3` files here, for example:

```
music/track1.mp3
music/track2.mp3
music/track3.mp3
```

Then list them in `config/music.json`:

```json
{
  "playlist": [
    { "title": "Track One", "artist": "My Artist", "file": "music/track1.mp3" }
  ]
}
```

Use only music you have the rights to. The player loads these files directly
from the repository — no streaming API is used.
