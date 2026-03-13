# AI Image Generator

A browser-based AI image generator using the Hugging Face Inference API.

## Files

- `index.html` — UI and JavaScript
- `style.css` — Styling
- `server.js` — Local proxy server (required to bypass CORS)

## Setup

Make sure Node.js is installed, then run:

```bash
node server.js
```

Open `index.html` in your browser. The proxy runs at `http://localhost:3000`.

## Usage

1. Type a prompt describing the image you want
2. Select a model, number of images, and aspect ratio
3. Hit **Generate**

Use the 🎲 button for a random prompt. Click the download button on any generated image to save it.

## Models

| Model | Speed | Quality |
|---|---|---|
| FLUX.1-schnell | Fast | Good |
| FLUX.1-dev | Slow | Best |
| Stable Diffusion XL | Medium | Good |
| Stable Diffusion v1.5 | Fast | Decent |
| Openjourney | Fast | Stylized |

## Notes

- The proxy server must be running or images will fail to generate
- API key is stored in `server.js`
