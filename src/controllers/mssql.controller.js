import { mssqlApi } from '../api/crudMssqlApi.js'
import { functions } from '../api/crudMssqlFunctions.js'

export const mssqlCtrl= {

  getAllObjects : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData
    if (Object.keys(req.query).length === 0){
      outData = await mssqlApi.getAll(req.params.object, req.headers)
    }
    else{
      outData = await mssqlApi.getFiltered(req.params.object, req.query, req.headers)
    }
    res.json(outData)
  },

  getCountObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.getCount(req.params.object, req.query, req.headers)
    res.json(outData)
  },

  getMaxObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.getMax(req.params.object, req.params.field, req.query, req.headers)
    res.json(outData)
  },

  postObject: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }
    let outData = {}
    if (Array.isArray(req.body))
      outData = await mssqlApi.executeTransaction(req.params.object, req.body, req.headers)

    if (!Array.isArray(req.body))
      outData = await mssqlApi.insertOne(req.params.object, req.body, req.headers)
    
    res.json(outData)
  },

  postQuery: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.executeQuery(req.body, req.headers)
    res.json(outData)
  },

  postTransaction: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }
    let outData = {}
    if (Array.isArray(req.body))
      outData = await mssqlApi.executeTransaction('', req.body, req.headers)
    
    res.json(outData)
  },

  putObjects: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.updateFiltered(req.params.object, req.body, req.query, req.headers)
    res.json(outData)
  },

  deleteObjects: async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.deleteFiltered(req.params.object, req.query, req.headers)
    res.json(outData)
  },

  postFunctionObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    //let outData = await mssqlApi.getFunction(req.params.nomFunction, req.query, req.headers);
    let outData = await mssqlApi.getFunction(req.params.nomFunction, req.body, req.headers)
    res.json(outData)
  },

  postAllCustomObjects : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.getCustomSelect(req.params.object, req.body, req.query, req.headers)
    res.json(outData)
  },

  postProcedureObject : async(req, res) => {
    let connError=[]
    if(!functions.validateDbConn(req.headers,connError)){
      res.status(400).json({ success:false, error: connError })
      return
    }

    let outData = await mssqlApi.postProcedure(req.params.nomProcedure, req.body, req.headers)
    res.json(outData)
  },

}
