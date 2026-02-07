export const useStopwatch = (id = 'default', initialSeconds = 0) => {
  const seconds = useState<number>('stopwatch:${id}:seconds', () => 0)
  const isRunning = useState<boolean>('stopwatch:${id}:running', () => false)
  const isFinished = useState<boolean>('stopwatch:${id}:finished', () => false)

  seconds.value = initialSeconds

  let timer: ReturnType<typeof setInterval> | null = null

  // formato MM:SS
  const time = computed(() => {
    const safe = Math.max(seconds.value, 0)

    const mins = Math.floor(safe / 60)
      .toString()
      .padStart(2, '0')

    const secs = (safe % 60).toString().padStart(2, '0')

    return `${mins}:${secs}`
  })

  // Control interno
  const tick = () => {
    if (seconds.value <= 0) {
      finish()
      return
    }

    seconds.value--
    console.log('tick')
  }

  const start = () => {
    if (isRunning.value || seconds.value <= 0) return

    isFinished.value = false
    isRunning.value = true

    timer = setInterval(tick, 1000)
  }

  const pause = () => {
    if (!timer) return

    clearInterval(timer)
    timer = null
    isRunning.value = false
  }

  const reset = (newSeconds = initialSeconds) => {
    pause()
    seconds.value = newSeconds
    isFinished.value = false
  }

  const finish = () => {
    pause()
    seconds.value = 0
    isFinished.value = true
  }

  // limpieza defensiva
  if (import.meta.client) {
    window.addEventListener('beforeunload', pause)

    onUnmounted(() => {
      window.addEventListener('beforeunload', pause)
    })
  }

  return { time, seconds, isRunning, start, pause, reset }
}
