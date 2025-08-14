import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { createAcademicDeptValidationSchema, updateAcademicDeptValidationSchema } from './academicDept.validation';
import { AcademicDeptControllers } from './academicDept.controller';

const router = express.Router();



router.post('/create-academic-dept',validateRequest(createAcademicDeptValidationSchema),AcademicDeptControllers.createAcademyDept);
router.get('/',AcademicDeptControllers.getAllAcademyDept);
router.get('/:deptId',AcademicDeptControllers.getSingleAcademyDept);
router.patch('/:deptId',validateRequest(updateAcademicDeptValidationSchema),AcademicDeptControllers.updateAcademicDept);


export const AcademicDeptRoutes = router;
