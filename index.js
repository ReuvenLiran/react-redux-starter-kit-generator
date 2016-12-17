const readline = require('readline');
const fs = require('fs');
var ncp = require('ncp').ncp;
const starterKit = './starter-kit';
//var exec  = require('child_process').execFile;
var path = require('path')
var spawn = require('child_process').spawn;
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var dirNotExist = true;
var projectDir;
var gen


function createDir(dir) {
    return new Promise(
        function (resolve, reject) {
            if (!fs.existsSync(dir)){

                console.log('Creating directory...')
                ncp(starterKit, dir, function (err) {
                
                if (err) {
                    console.error(err);
                }
                    console.log(`Directory ${dir} was created`);
                    resolve(dir)
                }); 
            } else {
                reject(`Directory ${dir} already exists`)
            } 
        })
}

function createReactAction(projectDir, actionName) {
     return new Promise(
        function (resolve, reject) {

        const actionDir = path.join(projectDir, '/src/actions')
        const actionFile = 'Action.js'
        const actionConvName = {
            Action : actionName.replace(actionName[0], actionName[0].toUpperCase()),
            ACTION : actionName.toUpperCase(),
            action : actionName.toLowerCase()
        }

        // Change action file
        var data = fs.readFileSync(path.join(actionDir, actionFile), 'utf-8')
        var newAction = data.replace(/ACTION/gm, actionConvName.ACTION).
                        replace(/Action/gm, actionConvName.Action).
                        replace(/action/gm, actionConvName.action);

        fs.writeFileSync(path.join(actionDir, actionFile), newAction, 'utf-8');
        fs.renameSync(path.join(actionDir, actionFile), path.join(actionDir, actionConvName.action + '.js'))
        console.log('action complete');

        resolve(actionConvName)
            
    }) 
}

function createReactReducer(reducerName, projectDir, actionConvName, compConvName) {
    return new Promise(
        function (resolve, reject) {
        const reducerDir = path.join(projectDir, '/src/reducers')
        const reducerFile = 'reducer.js'
        const rootReducerFile = 'index.js'
       
        // Change reducer file
        data = fs.readFileSync(path.join(reducerDir, reducerFile), 'utf-8')
            
        var newReducer = data.replace(/ACTION/gm, actionConvName.ACTION).
                        replace(/Action/gm, actionConvName.action). 
                        replace(/mComponent/gm, compConvName.compName);

        fs.writeFileSync(path.join(reducerDir, reducerFile), newReducer, 'utf-8')
        fs.renameSync(path.join(reducerDir, reducerFile), 
                path.join(reducerDir, reducerName.toLowerCase() + '.js'))
       

        data = fs.readFileSync(path.join(reducerDir, rootReducerFile), 'utf-8')
        console.log(data)
        var newReducer = data.replace(/reducer/gm, reducerName.toLowerCase())
                             .replace(/Mcomponent/gm, compConvName.CompName)
                             .replace(/mComponent/gm, compConvName.compName)
        fs.writeFileSync(path.join(reducerDir, rootReducerFile), newReducer, 'utf-8')
    })
}

function createReactComponent(compName, projectDir, actionConvName) {
    return new Promise(
        function (resolve, reject) {
        const compDir = path.join(projectDir, '/src/components')
        const compFile = 'Mcomponent.js'
        const compConvName = {
                compName : compName,
                CompName : compName.replace(compName[0], compName[0].toUpperCase()),
            }

        // Change component file
        data = fs.readFileSync(path.join(compDir ,compFile), 'utf-8')
        
        var newComp = data.replace(/Mcomponent/gm, compConvName.CompName)
                        .replace(/mComponent/gm, compConvName.compName)
                        .replace(/Action/gm, actionConvName.Action);

        fs.writeFileSync(path.join(compDir, compFile), newComp, 'utf-8')
        fs.renameSync(path.join(compDir, compFile), 
                path.join(compDir, compConvName.CompName + '.js'))
        resolve(compConvName)
     })
}

var dir
var actionConvName
var question
var compConvName

function scenario(count) {
    switch (count) {

        case 1:
            question = 'Name of project: '
            break
        case 2:
            question = 'Name of action: '
            break
        case 3:
            question = 'Name of component: '
            break
        case 4:
            question = 'Name of reducer: '
            break
        default:
            return
    }
    
    process.stdin.resume()

    rl.question(question, (answer) => {

     if (answer.length === 0) scenario(count) 
     process.stdin.pause()
              console.log(count)

     switch (count) {
         case 1:
            createDir(answer).then(data => { count++; 
                                             dir = data  
                                             scenario(count)} )
                             .catch(error => { console.log(error); scenario(count)})
            break;
        case 2:
            createReactAction(dir ,answer)
                            .then(data => { actionConvName = data ;count++; scenario(count) } )
                            .catch(error => { scenario(count) })
            break;
        case 3:
            createReactComponent(answer, dir, actionConvName)
                            .then(data => { compConvName = data; count++; scenario(count) } )
                            .catch(error => { console.log(error) })
            break;
    
        case 4:
            createReactReducer(answer, dir, actionConvName, compConvName)
                            .then(data => { count++; scenario(count) } )
                            .catch(error => { console.log(error) })
            break;
        default:
           return  
     }
     });
 }
 scenario(1)
/*
 gen = scenario(1)
 gen.next()
 gen.next()
*/

/*
 function askQuestions(question) {
    rl.question(question, (answer) => {
        createDir(answer)
    });
    
}*/
/*
  var projectDir = createDir()
  var actionConvName = createReactAction(projectDir)
    createReactReducer(projectDir, actionConvName, 'Todo')*/

/*
var nodes = {
  type: 'root',
  value: [
    { type: 'char', value: 'a' },
    { type: 'char', value: 'b' },
    { type: 'root', value: [
        { type: 'char', value: 'c' },
        { type: 'char', value: 'd' },
        { type: 'char', value: 'e' },
      ] 
    },
  ],
}

function * foreach (arr, fn) {
  var i

  for (i = 0; i < arr.length; i++) {
    yield * fn(arr[i])
  }
}

function * value (val) {
  yield val
}

function * recursiveGenerator(node) {
  yield * node.type === 'root' ?  foreach(node.value, recursiveGenerator) : value(node.value)
}

for (var generated of recursiveGenerator(nodes)) {
  console.log(generated);
}


*/

