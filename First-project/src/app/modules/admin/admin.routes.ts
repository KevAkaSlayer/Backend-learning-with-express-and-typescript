import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AdminControllers } from './admin.controllers'
import { updateAdminValidationSchema } from './admin.validation'



const router = express.Router()

// will call controller function

router.get('/', AdminControllers.getAllAdmin)

router.get('/:adminId', AdminControllers.getSingleAdmin)

router.delete('/:adminId', AdminControllers.deleteAdmin)

router.patch('/:adminId',validateRequest(updateAdminValidationSchema),AdminControllers.updateAdmin)

export const AdminRoutes = router