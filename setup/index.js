const chalk = require('chalk')
const path = require('path')
const { capitalCase, paramCase, constantCase } = require('change-case')
const fs = require('fs')
const rimraf = require('rimraf')

const { runYarn, runYarnWorkspace } = require('./run-command')
const createToken = require('./create-token')

const enterToContinue = () => {
  console.log(
    `\nPress ${chalk.white('ENTER')} to continue or ${chalk.white(
      'CTRL+C'
    )} to exit`
  )

  return new Promise((resolve) => {
    const onData = (buffer) => {
      process.stdin.removeListener('data', onData)
      process.stdin.setRawMode(false)
      process.stdin.pause()

      const [keyCode] = [...buffer]

      if (keyCode === 13) {
        process.nextTick(resolve)
      } else if (keyCode === 3) {
        process.exit(0)
      }
    }

    process.stdin.resume()
    process.stdin.setRawMode(true)
    process.stdin.once('data', onData)
  })
}

async function main() {
  const projectDirName = path.basename(path.join(__dirname, '..'))
  const projectName = capitalCase(projectDirName)

  console.clear()
  console.log(
    `${chalk.white.bold('Welcome to the Gatsby + Sanity + Now starter')}
    
You are about to scaffold a project using Gatsby for the static site generation, Sanity as the CMS and Now.sh as the deployment platform.

Throughout this installation process, you will be asked to log in to Sanity.io to create the project, import the example dataset and deploy the initial GraphQL endpoint and also log in to ZEIT to automatically provision with environment variables.

Also, an ${chalk.yellow(
      '.env.build'
    )} file will be created to provision ${chalk.yellow(
      'now'
    )} with the required environment variables for local development.
`
  )

  await enterToContinue()

  console.clear()
  await runYarnWorkspace('studio', ['sanity', 'login'], true, 'Login to Sanity')

  console.clear()
  await runYarn(['now', 'login'], true, 'Login to ZEIT')

  console.clear()
  await runYarnWorkspace(
    'studio',
    [
      'sanity',
      'init',
      '--create-project',
      projectName,
      '--dataset',
      'production',
    ],
    false,
    'Initializing Sanity project...',
    'Sanity project initialized'
  )

  const sanityFile = path.join(__dirname, '..', 'studio', 'sanity.json')
  const sanityJSON = require(sanityFile)
  const { projectId, dataset } = sanityJSON.api
  const { name } = sanityJSON.project

  const seedDir = path.join(__dirname, 'seed')
  const ndJSONFile = path.join(seedDir, 'data.ndjson')
  const dataNDJSON = fs.readFileSync(ndJSONFile, {
    encoding: 'utf-8',
  })
  fs.writeFileSync(
    ndJSONFile,
    dataNDJSON.replace('"Gatsby + Sanity + Now Starter"', `"${name}"`)
  )

  await runYarnWorkspace(
    'studio',
    ['sanity', 'dataset', 'import', seedDir, dataset],
    false,
    'Importing Sanity dataset...',
    'Sanity dataset imported'
  )

  await runYarnWorkspace(
    'studio',
    ['deploy:graphql'],
    false,
    'Deploying initial Sanity GraphQL endpoint...',
    'Sanity GraphQL endpoint deployed'
  )

  const token = await createToken()

  await runYarn(
    ['prettier', '--write', sanityFile],
    false,
    'Prettifying sanity.json...',
    'sanity.json prettified'
  )

  const envFile = path.join(__dirname, '..', '.env.build')

  const envVars = [
    {
      name: 'SANITY_PROJECT_ID',
      value: projectId,
    },
    {
      name: 'SANITY_DATASET',
      value: dataset,
    },
    {
      name: 'SANITY_TOKEN',
      value: token,
    },
  ]

  const nowFile = path.join(__dirname, '..', 'now.json')
  const nowJson = require(nowFile)
  const nowProjectName = paramCase(name)
  nowJson.name = nowProjectName

  for (const e of envVars) {
    const nowVarName = paramCase(`${nowProjectName}-${e.name}`)
    const varName = constantCase(e.name)

    await runYarn(
      ['now', 'secrets', 'add', nowVarName, e.value],
      false,
      `Adding ${nowVarName} secret to now...`,
      `${nowVarName} secret added to now`
    )

    fs.appendFileSync(envFile, `${varName}=${e.value}\n`)
    nowJson.build.env[varName] = `@${nowVarName}`
  }

  fs.writeFileSync(nowFile, JSON.stringify(nowJson))

  await runYarn(
    ['prettier', '--write', path.join(__dirname, '..', 'now.json')],
    false,
    'Prettifying now.json...',
    'now.json prettified'
  )

  const pkgFile = path.join(__dirname, '..', 'package.json')
  const pkgJson = require(pkgFile)
  delete pkgJson.scripts.postinstall
  fs.writeFileSync(pkgFile, JSON.stringify(pkgJson))

  await runYarn(
    ['remove', '-W', 'chalk', 'change-case', 'configstore', 'ora', 'rimraf'],
    false,
    'Uninstalling setup dependencies...',
    'Setup dependencies uninstalled'
  )

  const templatesDir = path.join(__dirname, 'templates')
  const readmeTemplateFile = path.join(templatesDir, 'README.md')
  const readmeOutputFile = path.join(__dirname, '..', 'README.md')
  const readmeTemplate = fs.readFileSync(readmeTemplateFile, {
    encoding: 'utf-8',
  })
  fs.writeFileSync(
    readmeOutputFile,
    readmeTemplate.replace('PROJECT_NAME', name)
  )

  rimraf.sync(__dirname)

  console.clear()
  console.log(`${chalk.green.bold('Done!')}

Run ${chalk.yellow(`cd ${projectDirName}`)} to change to the project directory
  
Run ${chalk.yellow('yarn start')} to start a web server.
  - Navigate to http://localhost:3000 to preview your Gatsby application.
  - Navigate to http://localhost:3333 to open Sanity Studio.

Run ${chalk.yellow(
    'yarn studio deploy:graphql'
  )} to re-deploy your Sanity GraphQL endpoint AFTER changing your schema.
  (Remember to restart the web server in order to apply schema changes on Gatsby).

Run ${chalk.yellow('yarn deploy')} to deploy to now.sh.

Thank you for using this Gatsby starter!  ♥️`)

  process.exit(0)
}

main()
