import mssql from 'mssql'
import logger from '../util/logger.js'

import { functions } from './crudMssqlFunctions.js'

const libName = '[[api/crudMssqlExecuteFunctions.js]]'

export const executeFunctions = {

  async executeMssqlString(header, sql, bind){
    let connection
    const functionName = `${libName} [executeMssqlString]`
    try {
      connection = await mssql.connect(process.env.DBCONN ?? functions.extractDbConn(header))
      logger.info(`${functionName} - Connection success by ${process.env.DBCONN ?  'ENV' : 'Header'}`)
      logger.info(`${functionName} SQL= ${sql}`)
      const res = await connection.query(sql)
      return { success: true, data:res.recordset?? [], rowsAfffected:res.rowsAffected?? 0 }
    } catch (error) {
      logger.error(`${functionName} ${error.message}`)
      return { success:false, error: error.message }
    } finally {
      if (connection) {
        await connection.close()
        logger.info(`${functionName} - Close connection`)
      }
    }
  },
  
}
