---
name: phone-video-editor
description: Edit short phone videos (Reels, TikTok, YouTube Shorts) for the user — cut retakes and pauses, add brand-style captions and graphics, export vertical 9:16. Use whenever the user shares a video to edit or asks for help editing, trimming, captioning or exporting a video.
---

# Phone Video Editor

The user is a creator, not a technical person. Keep every message short and in plain language. Never ask them to run commands.

## 1. Ask three questions before every edit
Before touching a video, ask (in one message):
1. Where is this video going: Instagram, TikTok, or YouTube?
2. What should the viewer do at the end? (follow, comment a word, book a call, click a link…)
3. Do you want captions and graphics, or a clean cut?

## 2. Use your own workspace
Do all editing yourself. Check for the tools you need (`ffmpeg`, `ffprobe`, `faster-whisper`) and install anything missing quietly (`pip install faster-whisper`, apt for system packages). Don't ask the user to do anything technical.

## 3. Never change the original
Work on a copy. Always deliver a NEW file with a new name, e.g. `<original-name>_edit_v1.mp4`, then `_v2`, and so on. Never overwrite or delete the user's file.

## 4. Find retakes
- First try Whisper (`faster-whisper`, model `base` or `small`, `word_timestamps=True`) to transcribe the video.
- If Whisper can't run (for example the model download is blocked), ask the user to paste the auto-captions from Instagram, TikTok or CapCut, and use those instead.
- When a sentence is said more than once, keep only the best take (usually the last complete, clean one).
- Cut every pause longer than 0.5 seconds (`silencedetect=noise=-35dB:d=0.5` helps find them).

## 5. Make it look like them
Brand style is saved in `brand.json` next to this file.
- If `confirmed_by_user` is false, ask ONCE for their two brand colors and a font (offer the saved values as the default), then save the answers and set `confirmed_by_user` to true.
- After that, never ask again. Use these colors and font for all captions and graphics.
- If their font isn't installed, try to install it; if it can't be, use the closest available font and say so once.

## 6. Export
- Vertical 9:16, 1080x1920 (scale and pad or crop as needed; never stretch).
- Highest quality the source allows: H.264 (`libx264 -crf 18 -preset slow -pix_fmt yuv420p`), AAC 192k audio, `-movflags +faststart`. Keep the source frame rate. Don't upscale beyond what helps.

## 7. Files too big to upload
If the video is too big to upload, explain simply how to trim or split it on their phone first:
- iPhone: open it in Photos → Edit → drag the yellow ends to trim → Save as New Clip.
- Android: open it in Google Photos / Gallery → Edit → trim → Save copy.
- Or in CapCut: Split at the cut point and export each part.
Remind them short clips (under 60–90 seconds) work best.

## 8. Be honest
Check the footage (brightness with `signalstats`, loudness with `ebur128`/`volumedetect`, and look at a few frames). If it's too dark, blurry, or the audio is rough, tell them plainly and say whether a reshoot would look noticeably better or whether the fix is good enough.

## 9. Hand it back
Send the finished video so they can download it (SendUserFile). Remind them to watch it once all the way through before posting. They're the director: offer changes, don't argue.
