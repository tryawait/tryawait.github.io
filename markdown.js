class Markdown {
  apply (compiler) {
    compiler.hooks.compilation.tap('Markdown', (compilation) => {
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const hooks = HtmlWebpackPlugin.getHooks(compilation)

      // console.log(hooks)

      hooks.beforeEmit.tapAsync('Markdown', (data, callback) => {
        this.markdown(data, callback)
      })
    });
  }

  markdown (data, callback) {
    const hljs = require('highlight.js')
    const swift = require('highlight.js/lib/languages/swift')
    hljs.registerLanguage('swift', swift)

    const md = require('markdown-it')()

    const reg = /<\w+\s[^>]*data-notes=\"(.*?)\"*><\/\w+>/ig
    while (reg.exec(data.html)) {
      const notesName = RegExp.$1, match = RegExp.lastMatch
      console.log(notesName, match)
      data.html = data.html.replace(match, md.render('TEST  \n\n\
    ```swift\n\
    func fetchThumbnail(for id: String) async throws -> UIImage {\n\
        let request = thumbnailURLRequest(for: id)\n\
        let (data, response) = try await URLSession.shared.data(for: request)\n\
        guard (response as? HTTPURLResponse)?.statusCode == 200 else { throw FetchError.badID }\n\
        let maybeImage = UIImage(data: data)\n\
        guard let thumbnail = await maybeImage?.thumbnail else { throw FetchError.badImage }\n\
        return thumbnail\n\
    }\n\
    ```'))
    }

    callback(null, data)
  }


}

module.exports = Markdown
module.exports.Markdown = Markdown