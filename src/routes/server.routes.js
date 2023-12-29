import { Router } from 'express'

export const router = Router()

import { mssqlCtrl } from '../controllers/mssql.controller.js'

router.get('/', function (req, res) {res.send('Hello World')})

router.get('/count/:object', mssqlCtrl.getCountObject)

router.get('/max/:object/:field', mssqlCtrl.getMaxObject)

router.get('/:object', mssqlCtrl.getAllObjects)

router.post('/custom/:object', mssqlCtrl.postAllCustomObjects)

router.post('/query', mssqlCtrl.postQuery)

router.post('/:object', mssqlCtrl.postObject)

router.put('/:object', mssqlCtrl.putObjects)

router.delete('/:object', mssqlCtrl.deleteObjects)
