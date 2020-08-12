import { useEffect } from 'react'

let observer = null
let currentTarget = null

const useInfiniteScroll = (
  targetSelector,
  list, // list store
  get // redux creator to get items
) => {
  useEffect(() => {
    // Configuring the observer
    const options = {
      root      : document.querySelector('.app-content'),
      rootMargin: '0px',
      threshold : 1.0
    }

    observer = new IntersectionObserver(_handleCallback, options)
    observeLastTargetElement()

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if(list.status === 'GOT') observeLastTargetElement()
  }, [ list.status ])

  const observeLastTargetElement = () => {
    const targets = document.querySelectorAll(targetSelector)

    if(targets.length > 0) {
      if(currentTarget) observer.unobserve(currentTarget)

      currentTarget = targets[targets.length - 1] // last target
      currentTarget.dataset.currentPage = list.pagination.meta.current_page
      currentTarget.dataset.lastPage = list.pagination.meta.last_page

      observer.observe(currentTarget)
    }
  }

  const _handleCallback = entries => {
    const entry = entries[0]
    const currentPage = +entry.target.dataset.currentPage
    const lastPage = +entry.target.dataset.lastPage

    if(entry.intersectionRatio === 1 && currentPage < lastPage) get({ page: currentPage + 1 })
  }
}

export default useInfiniteScroll
