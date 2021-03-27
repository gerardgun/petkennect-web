import _ from 'lodash'
import fs from 'fs'
import glob from 'glob'

function customizer(objValue, srcValue) {
  if(_.isArray(objValue))
    return objValue.concat(srcValue)
}

glob('./src/lib/constants/list-configs/**/*.js', async (err, res) => {
  console.log(res)
})

glob('./src/lib/constants/list-configs/**/*.js', async (err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log(`${res.length} files found.`)

    let config = {}
    let notLoadedFiles = []
    let loadedFiles = []

    while (res.length > 0) {
      const lastPath = res.pop()

      try {
        const fileConfig = await import(lastPath)

        config = _.mergeWith(config, fileConfig, customizer)

        loadedFiles.push(lastPath)

        // console.log(config)
      } catch (e) {
        // console.log(e)

        notLoadedFiles.push(lastPath)
      }
    }

    fs.writeFileSync('./print_global_list_config.result.json', JSON.stringify(config))

    console.error('Files loaded')
    console.log(loadedFiles)
    console.error('Files not loaded')
    console.log(notLoadedFiles)
  }
})
