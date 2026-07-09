let cached = null

// Testa uma única vez se o navegador consegue criar um contexto WebGL.
// Evita que o react-three-fiber tente (e falhe) repetidamente quando a
// aceleração de hardware está desabilitada.
export function isWebGLAvailable() {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    cached = !!gl
    if (gl && gl.getExtension) {
      const lose = gl.getExtension('WEBGL_lose_context')
      if (lose) lose.loseContext()
    }
  } catch {
    cached = false
  }
  return cached
}
