const async = require('async');

let autoworkflow=(req,res)=>{
 const workflow=[
  {name:"validateOrder",dependencies:[]},
  {name:"processPayment",dependencies:['validateOrder']},
  {name:"sendConfirmationEmail",dependencies:['validateOrder', 'processPayment']}

 ]
 //defining the task handelers
 let tashHandlers={
  validateOrder:async()=>{console.log("validating the order")
  await delay(2000);

},

 processPayment: async()=>{
   console.log("processing payment")
   await delay(3000);

},
sendConfirmationEmail: async ()=>{
  console.log("sending confirmation email");
  await delay(1500);
 }
}

function delay(delay){
    return new Promise((resolve)=>setTimeout(resolve,delay))
}
//keep track of completed tasks
const completedTasks=new Set();
//fnction to process a task
function processTask(task,callback){
    let  taskhandler=tashHandlers[task.name]
    if(taskhandler){
       taskhandler().then(()=>{
       completedTasks.add(task.name)
       callback()
    }) .catch((err)=>{
        console.log(`error executing ${task.name}`,err)
        callback()//callback even if there's an error to continue the workflow 
    })

    }
    else{
        console.log(`task handler not founde for ${task.name}`)
        callback()//callback to continue the workflow
    }
}
//define the workflow execution function
function executeWorkflow(){
    async.eachSeries(
        workflow,(task,callback)=>{
            const { name,dependencies}=task
            if (dependencies.every((dep)=>completedTasks.has(dep))){
                //All dependencies are completed the task
                if (!completedTasks.has(name)){
                    //checking if the task has not been completed already
                    processTask(task, callback);
                }else{
                    callback()
                }
                }else{callback()}
            }
        
    
    )
}
executeWorkflow();
}

    
module.exports=autoworkflow