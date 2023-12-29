import { sentences } from './crudMssqlSentences.js'
import { functions } from './crudMssqlFunctions.js'
import { executeFunctions } from './crudMssqlExecuteFunctions.js'

let connection

let resWords = ['pags', 'offset', 'numrows', 'orderby'] //Array de palabras reservadas para ser excluidas del WHERE

export const mssqlApi = {
  async getAll(table, header) {
    const sql = `SELECT * FROM ${table}`
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async getCount(table, where, header) {
    const sql = sentences.filterStringCount(table, where, resWords)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async getMax(table, field, where, header) {
    const sql = sentences.filterStringMax(table, field, where, resWords)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async getFiltered(table, where, header) {
    const sql = functions.paginationString(sentences.filterString(table, where, resWords),connection, where)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async getCustomSelect(table, field, where, header) {
    const sql = functions.paginationString(sentences.customSelectString(table, field, where, resWords),connection, where)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async executeQuery(data, header) {
    const sql = data.query?? "SELECT 'No query' as error "
    const bind = data.bind?? {}
    return await executeFunctions.executeMssqlString(header,sql, bind)
  },

  async insertOne(table, data, header) {
    const sql = sentences.insertString(table,data)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async updateFiltered(table, data, where, header) {
    const sql = sentences.updateString(table,data,where)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

  async deleteFiltered(table, where, header) {
    const sql = sentences.deleteString(table, where)
    return executeFunctions.executeMssqlString(header,sql,{})
  },

}
