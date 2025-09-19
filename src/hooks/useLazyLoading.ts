import { useEffect, useRef, useState } from 'react'

interface UseLazyLoadingOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options

  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          setIsLoaded(true)
          
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return {
    elementRef,
    isLoaded,
    isInView
  }
}

// Hook for lazy loading images
export const useLazyImage = (src: string, options?: UseLazyLoadingOptions) => {
  const { elementRef, isLoaded } = useLazyLoading(options)
  const [imageSrc, setImageSrc] = useState<string>()
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded && src) {
      const img = new Image()
      img.onload = () => {
        setImageSrc(src)
        setImageLoaded(true)
      }
      img.src = src
    }
  }, [isLoaded, src])

  return {
    elementRef,
    imageSrc,
    imageLoaded,
    isLoaded
  }
}