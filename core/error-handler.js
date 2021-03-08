export default class ErrorHandler {
  constructor(application) {
    this.application = application
  }

  /**
   * Pretty prints a given error on the terminal
   */
  async prettyPrintError(error) {
    try {
      const Youch = require('youch')
      const output = await new Youch(error, {}).toJSON()
      console.log(require('youch-terminal')(output))
    } catch (err) {
      console.log(error.stack)
    }
  }

  /**
   * Handles ignitor boot errors
   */
  async handleError(error) {
    if (this.application.inDev) {
      await this.prettyPrintError(error)
    } else {
      console.error(error.stack)
    }
  }
}
