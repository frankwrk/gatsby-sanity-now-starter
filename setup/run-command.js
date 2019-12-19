const { spawn } = require('child_process')
const ora = require('ora')
const chalk = require('chalk')

exports.runYarn = function runYarn(args, ...rest) {
  return exports.runCommand('yarn', ['-s', ...args], ...rest)
}

exports.runYarnWorkspace = function runYarnWorkspace(workspace, args, ...rest) {
  return exports.runYarn([workspace, '-s', ...args], ...rest)
}

exports.runCommand = function runCommand(
  command,
  args,
  isPrompt,
  title,
  success
) {
  return new Promise((resolve) => {
    const p = spawn(command, args, {
      stdio: isPrompt ? 'inherit' : 'pipe',
      encoding: 'utf-8',
    })

    const spinner = ora(title)
    let output = ''

    if (!isPrompt) {
      spinner.start()
    } else {
      console.log(chalk.white.bold(`${title}\n`))
    }

    if (p.stdout) {
      p.stdout.on('data', (chunk) => {
        output += chunk.toString()
      })
    }

    p.on('error', (e) => {
      if (!isPrompt) spinner.fail(e.message)
      process.exit(1)
    })

    p.on('exit', (code) => {
      if (code !== 0) {
        if (!isPrompt)
          spinner.fail(`${command} ${args.join(' ')} exited with code ${code}`)
        process.exit(1)
      } else {
        if (!isPrompt) spinner.succeed(chalk.white.bold(success))
        resolve(output)
      }
    })
  })
}
