import express ,{NextFunction,Request,Response} from 'express'
const app = express()
const port = 3000

//parsers

app.use(express.json());


const useRouter = express.Router()
const courseRouter = express.Router()

app.use('/api/v1/courses',courseRouter)
app.use('/api/v1/users',useRouter)


const logger = (req: Request,res: Response , next : NextFunction) =>{
  console.log(req.url,req.method,req.hostname);
  next();
}


app.get('/',logger,(req:Request,res:Response,next:NextFunction)=>{
  try{
    res.send("something")
  }
  catch(err){
    console.log(err);
    next(err);
  }
})


useRouter.post('/create-user',(req:Request,res:Response)=>{
  const user = req.body;
  console.log(user);
  res.json({
    success : true,
    message : "user is created successfully"
  })
})



app.get('/',logger, (req : Request, res : Response) => {
  console.log(req.query);
  res.send('no entry hello why its not working ig no wq')
})

app.post('/', logger,(req : Request,res : Response)=>{
  console.log(req.body);
  res.json({
    message : "successfully received data"
  });
});



app.all('*',(req:Request,res : Response)=>{
  res.status(400).json({
    success : false,
    message : 'Route is not found',
  })
})

//global error handler 

app.use((error : any,req : Request,res : Response,next : NextFunction)=>{
  if(error){
    res.status(400).json({
      success: false,
      message: "failed to get data"
    })
  }
})



export default app; 