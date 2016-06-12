'use strict'

const fs = require('fs-extra')
const path = require('path')

const constants = require('./constants')

/**
 * Ensures that %USERPROFILE%/.windows-build-tools exists
 * and returns the path to it
 *
 * @returns {string} - Path to windows-buildt-tools working dir
 */
function getWorkDirectory () {
  const homeDir = process.env.USERPROFILE || require('os').homedir()
  const workDir = path.join(homeDir, '.windows-build-tools')

  try {
    fs.ensureDirSync(workDir)
    return workDir
  } catch (err) {
    console.log(err)
  }
}

/**
 * Ensures that %USERPROFILE%/.windows-build-tools exists
 * and returns the path to it
 *
 * @returns {Object} - Object containing path and filename of installer
 */
function getInstallerPath () {
  const directory = getWorkDirectory()

  return {
    path: path.join(directory, constants.installerName),
    filename: constants.installerName,
    directory
  }
}

/**
 * Ensures that the currently running platform is Windows,
 * exiting the process if it is not
 */
function ensureWindows () {
  if (process.platform !== 'win32') {
    console.log('This tool requires Windows.\n')
    process.exit(1)
  }
}

module.exports = {
  getWorkDirectory,
  getInstallerPath,
  ensureWindows
}
