import hljs from 'highlight.js/lib/core'
import swift from 'highlight.js/lib/languages/swift'

hljs.registerLanguage('swift', swift)

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block)
  })
})