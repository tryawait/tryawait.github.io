const fs = require('fs')
const path = require('path')

class Markdown {
  notesFileNameReg = /(\d+)_notes.md/

  apply (compiler) {
    compiler.hooks.compilation.tap('Markdown', (compilation) => {
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const hooks = HtmlWebpackPlugin.getHooks(compilation)

      // console.log(hooks)

      hooks.afterTemplateExecution.tapAsync('Markdown', (data, callback) => {
        this.markdown(data, callback)
      })
    });
  }

  markdown (data, callback) {
    const hljs = require('highlight.js')
    const swift = require('highlight.js/lib/languages/swift')
    hljs.registerLanguage('swift', swift)

    const md = require('markdown-it')()

    const reg = /<\w+\s[^>]*data-notes=\"(.*?)\"[^>].*>.*<\/\w+>/g
    data.html = data.html.replace(reg, (match, notesName) => {
      console.log(`Generate notes for \x1b[36m%s\x1b[0m`, notesName)
      // console.log(match)

      const notesPath = path.join(path.resolve(__dirname, './notes'), notesName)
      
      if (!fs.existsSync(notesPath)) {
        console.log('\x1b[31m%s\x1b[0m', `No notes for ${notesName}`)
        return match
      }

      const files = fs.readdirSync(notesPath)

      let contents = []
      files.forEach(fileName => {
        console.log('\x1b[36m%s\x1b[0m', fileName)
        
        const notesMatch = this.notesFileNameReg.exec(fileName)
        if (!notesMatch) {
          return
        }
        
        const notesMarkdown = this.readFile(path.join(notesPath, fileName))
        const codesMarkdown = this.readFile(path.join(notesPath, `${notesMatch[1]}_codes.md`))

        if (!notesMarkdown && !codesMarkdown) {
          return
        }

        contents.push('<div class="notes">')

        if (notesMarkdown) {
          contents.push('<div class="notes__content">')
          contents.push(md.render(notesMarkdown))
          contents.push('</div>')
        }

        if (codesMarkdown) {
          contents.push('<div class="codes-wrapper">')
          contents.push(md.render(codesMarkdown))
          contents.push('</div>')
        }
        
        contents.push('</div>')
      })

      return contents.length > 0 ? contents.join('') : match
    })

    callback(null, data)
  }

  readFile (path) {
    if (!fs.existsSync(path)) {
      return null
    }

    return fs.readFileSync(path, { encoding: 'utf-8' })
  }

}

module.exports = Markdown
module.exports.Markdown = Markdown