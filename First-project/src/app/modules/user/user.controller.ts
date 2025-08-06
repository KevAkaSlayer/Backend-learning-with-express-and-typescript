








const createStudent = async (req: Request, res: Response) => {
  try {

    const student  = req.body

    //creating schema validation using zod
    const zodParsedData = studentSchema.parse(student);

    

    //creating a schema validation using joi
    // const {error,value} = studentValidationSchema.validate(student)
    // will call service function to send this data
    // Ensure dateOfBirth is always a string
    if (typeof zodParsedData.dateOfBirth === 'undefined') {
      throw new Error('dateOfBirth is required');
    }
    // Ensure dateOfBirth is always a string
    const studentData = {
      ...zodParsedData,
      dateOfBirth: String(zodParsedData.dateOfBirth),
    };
    const result = await StudentServices.createStudentIntoDB(studentData)
    
    // if(error){
    //     res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error:error.details,
    //   })
    // }


    // send response

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
    return res.status(400).json({ errors: err.errors });
  }
  throw err;
  }
}
