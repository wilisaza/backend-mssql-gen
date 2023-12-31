import { functions } from './crudMssqlFunctions.js'

export const sentences = {

  filterString(table, where, resWords) {
    let sqlString = `SELECT * FROM ${table} WHERE `
    for (let colum in where) {
      if (!resWords.includes(colum.toLowerCase())){ //Valida que las palabras reservadas no se incluyan en el WHERE
        if (typeof where[colum] === 'string') {
          //Condición para fechas y valores nulos
          if((parseInt(where[colum].substring(0,2),10) <= 21) && (parseInt(where[colum].substring(0,4),10) > 1970) && (parseInt(where[colum].substring(5,7),10) <= 12) && (parseInt(where[colum].substring(8,10),10) <= 31) &&
                        (parseInt(where[colum].substring(11,13),10) <= 21) && (parseInt(where[colum].substring(11,15),10) > 1970) && (parseInt(where[colum].substring(16,18),10) <= 12) && (parseInt(where[colum].substring(19,21),10) <= 31)){
            sqlString += `${colum} BETWEEN TO_DATE('${where[colum].substring(0,10)}','YYYY-MM-DD') AND TO_DATE('${where[colum].substring(11,21)}','YYYY-MM-DD') AND `
          }
          else if((parseInt(where[colum].substring(0,2),10) <= 21) && (parseInt(where[colum].substring(0,4),10) > 1970) && (parseInt(where[colum].substring(5,7),10) <= 12) && (parseInt(where[colum].substring(8,10),10) <= 31)){
            sqlString += `${colum} = TO_DATE('${where[colum]}','YYYY-MM-DD') AND `
          }
          else if(where[colum] === 'NULL'){
            sqlString += `${colum} IS NULL AND `
          }
          else{
            sqlString += `${colum} = '${where[colum]}' AND `
          }
          //sqlString += `${colum} = '${where[colum]}' AND `;
        } else {
          sqlString += `${colum} = ${where[colum]} AND `
        }
      }
    }
    sqlString += '*'
    sqlString = sqlString.replace(' AND *', '')
    return sqlString
  },

  filterStringCount(table, where, resWords) {
    let sqlString
    if(Object.keys(where).length === 0){
      sqlString = `SELECT COUNT(*) COUNT FROM ${table}`    
    }
    else{
      sqlString = `SELECT COUNT(*) COUNT FROM ${table} WHERE `
      for (let colum in where) {
        if (!resWords.includes(colum.toLowerCase())){ //Valida que las palabras reservadas no se incluyan en el WHERE
          if (typeof where[colum] === 'string') {
            sqlString += `${colum} = '${where[colum]}' AND `
          } else {
            sqlString += `${colum} = ${where[colum]} AND `
          }
        }
      }
      sqlString += '*'
      sqlString = sqlString.replace(' AND *', '')
    }
        
    return sqlString
  },

  filterStringMax(table, field, where, resWords) {
    let sqlString
    if(Object.keys(where).length === 0){
      sqlString = `SELECT NVL(MAX(${field}),0) MAX FROM ${table}`
    }
    else{
      sqlString = `SELECT NVL(MAX(${field}),0) MAX FROM ${table} WHERE `
      for (let colum in where) {
        if (!resWords.includes(colum.toLowerCase())){ //Valida que las palabras reservadas no se incluyan en el WHERE
          if (typeof where[colum] === 'string') {
            sqlString += `${colum} = '${where[colum]}' AND `
          } else {
            sqlString += `${colum} = ${where[colum]} AND `
          }
        }
      }
      sqlString += '*'
      sqlString = sqlString.replace(' AND *', '')
    }
    return sqlString
  },

  deleteString(table, where) {
    let sqlString = `DELETE FROM ${table} WHERE `
    for (let colum in where) {
      if (typeof where[colum] === 'string') {
        sqlString += `${colum} = '${where[colum]}' AND `
      } else {
        sqlString += `${colum} = ${where[colum]} AND `
      }
    }
    sqlString += '*'
    sqlString = sqlString.replace(' AND *', '')
    return sqlString
  },

  updateString(table, data, where) {
    let dataMod = data
    
    //dataMod.date_updated = this.dateToYMD(date);
    let sqlString = `UPDATE ${table} SET `
    for (let colum in dataMod) {
      if (typeof dataMod[colum] === 'string') {
        sqlString += `${colum} = '${dataMod[colum]}', `
      } else {
        sqlString += `${colum} = ${dataMod[colum]}, `
      }
    }

    sqlString += '*'
    sqlString = sqlString.replace(', *', ' WHERE ')
    for (let columw in where) {
      if (typeof where[columw] === 'string') {
        sqlString += `${columw} = '${where[columw]}' AND `
      } else {
        sqlString += `${columw} = ${where[columw]} AND `
      }
    }
    sqlString += '*'
    sqlString = sqlString.replace(' AND *', '')
    return sqlString
  },

  insertString(table, data) {
    let dataMod = data
    let sqlString = `INSERT INTO ${table} (`
    for (let colum in dataMod) {
      if (dataMod[colum] != null) {
        sqlString += `${colum}, `
      }
    }
    sqlString += ')'
    sqlString = sqlString.replace(', )', ') VALUES(')
    //VALUES
    for (let colum in dataMod) {
      if (dataMod[colum] != null) {
        if (typeof dataMod[colum] === 'string') {
          if((dataMod[colum].substring(0,2) == '20') && (parseInt(dataMod[colum].substring(4,6),10) <= 12) && (parseInt(dataMod[colum].substring(6,8),10) <= 31)){
            sqlString += `TO_TIMESTAMP('${functions.jsonDateCam(dataMod[colum])}','YYYY-MM-DD'), `
          }
          else{
            sqlString += `'${dataMod[colum]}', ` 
          }
                    
        } else {
          sqlString += `${dataMod[colum]}, `
        }
      }
    }
    sqlString += ')'
    sqlString = sqlString.replace(', )', ')')
    return sqlString
  },

  insertConfeString(table, data) {
    let dataMod = data
    let sqlString = `INSERT INTO ${table} (`
    for (let colum in dataMod) {
      if (dataMod[colum] != null) {
        sqlString += `${colum}, `
      }
    }
    sqlString += ')'
    sqlString = sqlString.replace(', )', ') VALUES(')
    //VALUES
    for (let colum in dataMod) {
      if (dataMod[colum] != null) {
        if (typeof dataMod[colum] === 'string') {
          sqlString += `'${dataMod[colum]}', ` 
        } else {
          sqlString += `${dataMod[colum]}, `
        }
      }
    }
    sqlString += ')'
    sqlString = sqlString.replace(', )', ')')
    return sqlString
  },

  customSelectString(table, field, where, resWords) {
    let sqlString = 'SELECT '
    for (let colum in field) {
      sqlString += `${colum}, `
    }
    sqlString += '*'

    if(Object.keys(where).length === 0){
      sqlString = sqlString.replace(', *', ` FROM ${table}`)
    }
    else{
      sqlString = sqlString.replace(', *', ` FROM ${table} WHERE `)
      for (let columw in where) {
        if (!resWords.includes(columw.toLowerCase())){ //Valida que las palabras reservadas no se incluyan en el WHERE
          if (typeof where[columw] === 'string') {
            //Condición para fechas y valores nulos
            if((parseInt(where[columw].substring(0,2),10) <= 21) && (parseInt(where[columw].substring(0,4),10) > 1970) && (parseInt(where[columw].substring(5,7),10) <= 12) && (parseInt(where[columw].substring(8,10),10) <= 31) &&
                            (parseInt(where[columw].substring(11,13),10) <= 21) && (parseInt(where[columw].substring(11,15),10) > 1970) && (parseInt(where[columw].substring(16,18),10) <= 12) && (parseInt(where[columw].substring(19,21),10) <= 31)){
              sqlString += `${columw} BETWEEN TO_DATE('${where[columw].substring(0,10)}','YYYY-MM-DD') AND TO_DATE('${where[columw].substring(11,21)}','YYYY-MM-DD') AND `
            }
            else if((parseInt(where[columw].substring(0,2),10) <= 21) && (parseInt(where[columw].substring(0,4),10) > 1970) && (parseInt(where[columw].substring(5,7),10) <= 12) && (parseInt(where[columw].substring(8,10),10) <= 31)){
              sqlString += `${columw} = TO_DATE('${where[columw]}','YYYY-MM-DD') AND `
            }
            else if(where[columw] === 'NULL'){
              sqlString += `${columw} IS NULL AND `
            }
            else{
              sqlString += `${columw} = '${where[columw]}' AND `
            }
          } else {
            sqlString += `${columw} = ${where[columw]} AND `
          }
        }
      }
      sqlString += '*'
      sqlString = sqlString.replace(' AND *', '')
    }
    return sqlString
  },
 
}

