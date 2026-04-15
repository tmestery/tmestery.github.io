import { useEffect, useRef } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Characters: mix of code symbols + katakana-ish block chars for depth
    const charsNear = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]<>/\\|=+-*&^%$#@!;:'
    const charsFar  = '0123456789abcdefghijklmnopqrstuvwxyz.,;:!?'
    const charsGlitch = '▓▒░█▄▀■□▪▫◆◇○●'

    const BASE_FONT = 14
    const LAYERS = [
      // { fontMult, speed, opacity, charSet, glitchChance }
      { fontMult: 1.3,  speed: 0.6,  opacity: 0.9, chars: charsNear,  glitch: 0.002 },
      { fontMult: 1.0,  speed: 1.0,  opacity: 0.6, chars: charsNear,  glitch: 0.003 },
      { fontMult: 0.75, speed: 1.5,  opacity: 0.35, chars: charsFar,  glitch: 0.001 },
      { fontMult: 0.5,  speed: 2.2,  opacity: 0.18, chars: charsFar,  glitch: 0.0005 },
    ]

    // Build column drops for each layer
    const layers = LAYERS.map(cfg => {
      const fontSize = Math.round(BASE_FONT * cfg.fontMult)
      const cols = Math.floor(canvas.width / fontSize)
      return {
        ...cfg,
        fontSize,
        cols,
        drops: Array.from({ length: cols }, () => Math.random() * -50),
        glitchCols: new Set(),
        glitchTimers: {},
      }
    })

    let frameId
    let lastTime = 0
    const TARGET_FPS = 24
    const FRAME_MS = 1000 / TARGET_FPS

    function draw(now) {
      frameId = requestAnimationFrame(draw)
      if (now - lastTime < FRAME_MS) return
      lastTime = now

      // Fade trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      layers.forEach(layer => {
        const { fontSize, cols, drops, chars, glitch, speed, opacity, glitchCols } = layer

        drops.forEach((y, i) => {
          const x = i * fontSize

          // Occasional glitch column
          if (Math.random() < glitch && !glitchCols.has(i)) {
            glitchCols.add(i)
            setTimeout(() => glitchCols.delete(i), 200 + Math.random() * 400)
          }

          const isGlitching = glitchCols.has(i)
          const charSet = isGlitching ? charsGlitch : chars
          const char = charSet[Math.floor(Math.random() * charSet.length)]

          // Head glyph — bright
          if (isGlitching) {
            ctx.fillStyle = `rgba(255, 170, 0, ${opacity})`
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity * 1.6)})`
          }
          ctx.font = `${fontSize}px 'JetBrains Mono', monospace`
          ctx.fillText(char, x, y * fontSize)

          // Second glyph — bright green
          const trailChar = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`
          ctx.fillText(trailChar, x, (y - 1) * fontSize)

          // Dim mid-trail
          const midChar = chars[Math.floor(Math.random() * chars.length)]
          ctx.fillStyle = `rgba(0, 200, 0, ${opacity * 0.5})`
          ctx.fillText(midChar, x, (y - 2) * fontSize)

          // Reset when off-screen
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i] += speed
        })
      })
    }

    frameId = requestAnimationFrame(draw)

    window.addEventListener('resize', () => {
      resize()
      // Rebuild layer drops on resize
      layers.forEach(layer => {
        layer.cols = Math.floor(canvas.width / layer.fontSize)
        layer.drops = Array.from({ length: layer.cols }, () => Math.random() * -50)
      })
    })

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0.45,
      }}
    />
  )
}