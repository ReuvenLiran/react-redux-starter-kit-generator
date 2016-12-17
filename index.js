const readline = require('readline');
const fs = require('fs');
var ncp = require('ncp').ncp;
const starterKit = './starter-kit';
var path = require('path')
var colors = require('colors')
var cp = require('child_process');
var text = 'Hello, \nThis React Redux Nodejs Mongodb Generator.'
text = text + '\nI suggest to open http://mlab.com'
text = text + '\nPress Ctrl + C to exit any time'
text = text + colors.underline('\nNotice: Mongodb is not mandatory')


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var dirNotExist = true;
var projectDir;

function setUpNPM(dir) {
          cp.spawnSync('npm', ['init'], {cwd: dir, stdio: 'inherit'})
          cp.spawnSync('npm', ['install'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawnSync('gnome-terminal', ['-x', 'sh', '-c' ,'npm run server; bash'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawnSync('gnome-terminal', ['-x', 'sh', '-c' ,'npm start; bash'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawnSync('google-chrome', ['--app', 'http://localhost:8080'], {cwd: dir, stdio: 'inherit'}) 
          //cp.spawnSync('npm', ['start'], {cwd: dir, stdio: 'inherit'}) 
         // console.log(`Open a new session and run: cd ${dir} && npm run server`) 
}

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
            actionName : actionName,
            ActionName : actionName.replace(actionName[0], actionName[0].toUpperCase()),
            ACTIONNAME : actionName.toUpperCase(),
            actionname : actionName.toLowerCase()
        }

        // Change action file
        var data = fs.readFileSync(path.join(actionDir, actionFile), 'utf-8')
        var newAction = data.replace(/actions/gm, actionConvName.actionName)
                        .replace(/ACTION/gm, actionConvName.ACTIONNAME)
                        .replace(/Action/gm, actionConvName.ActionName)
                        .replace(/action/gm, actionConvName.actionname)
                      

        fs.writeFileSync(path.join(actionDir, actionFile), newAction, 'utf-8');
        fs.renameSync(path.join(actionDir, actionFile), path.join(actionDir, actionConvName.actionName + '.js'))
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
        
        reducerName[0] = reducerName[0].toLowerCase()

        // Change reducer file
        data = fs.readFileSync(path.join(reducerDir, reducerFile), 'utf-8')
            
        var newReducer = data.replace(/ACTION/gm, actionConvName.ACTIONNAME).
                        replace(/Action/gm, actionConvName.actionName). 
                        replace(/mComponent/gm, compConvName.compName);

        fs.writeFileSync(path.join(reducerDir, reducerFile), newReducer, 'utf-8')
        fs.renameSync(path.join(reducerDir, reducerFile), 
                path.join(reducerDir, reducerName + '.js'))
       

        data = fs.readFileSync(path.join(reducerDir, rootReducerFile), 'utf-8')
        var newReducer = data.replace(/reducer/gm, reducerName)
                             .replace(/Mcomponent/gm, compConvName.CompName)

        fs.writeFileSync(path.join(reducerDir, rootReducerFile), newReducer, 'utf-8')
        resolve(reducerName)
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
                        .replace(/Action/gm, actionConvName.ActionName);

        fs.writeFileSync(path.join(compDir, compFile), newComp, 'utf-8')
        fs.renameSync(path.join(compDir, compFile), 
                path.join(compDir, compConvName.CompName + '.js'))
        resolve(compConvName)
     })
}

function createReactContainer(projectDir, compConvName, actionConvName, reducerName) {
    return new Promise(
        function (resolve, reject) {
        const contDir = path.join(projectDir, '/src/containers')
        const contFile = 'McomponentContainer.js'
   
        // Change container file
        data = fs.readFileSync(path.join(contDir ,contFile), 'utf-8')
        
        var newCont = data.replace(/Mcomponent/gm, compConvName.CompName)
                        .replace(/mComponent/gm, compConvName.compName)
                        .replace(/reducer/gm, reducerName)
                        .replace(/actions\/Action/gm, 'actions' + '/' + actionConvName.actionName)
                        .replace(/Action/gm, actionConvName.ActionName);


        fs.writeFileSync(path.join(contDir, contFile), newCont, 'utf-8')
        fs.renameSync(path.join(contDir, contFile), 
                      path.join(contDir, compConvName.CompName + 'Container.js'))
        resolve('Container was created')
     })
}

function createReactAppComp(projectDir, compConvName) {
    return new Promise(
        function (resolve, reject) {
        const comptDir = path.join(projectDir, '/src/components')
        const appCompFile = 'App.js'
       
        // Change app component file
        data = fs.readFileSync(path.join(comptDir ,appCompFile), 'utf-8')
        
        var newApp = data.replace(/Mcomponent/gm, compConvName.CompName)      

        fs.writeFileSync(path.join(comptDir, appCompFile), newApp, 'utf-8')
        resolve('App component was created')
     })
}


function createServerApp(mongoDBUrl, projectDir, actionConvName) {
    return new Promise(
        function (resolve, reject) {
        const serverDir = projectDir
        const appFile = 'app.js'
       
        // Change server app file
        data = fs.readFileSync(path.join(serverDir ,appFile), 'utf-8')
        
        var newApp = data.replace(/MongoLabUrl/gm, mongoDBUrl) 
                         .replace(/actions/gm, actionConvName.actionName)     

        fs.writeFileSync(path.join(serverDir, appFile), newApp, 'utf-8')
        resolve('Server app was created')
     })
}

function createServerAction(projectDir, actionConvName) {
    return new Promise(
        function (resolve, reject) {
        
        const routesDir = path.join(projectDir, '/routes')
        const actionsFile = 'actions.js'
       
        // Change server app file
        data = fs.readFileSync(path.join(routesDir ,actionsFile), 'utf-8')
        
        var newAction = data.replace(/actions/gm, actionConvName.actionName)     

        fs.writeFileSync(path.join(routesDir, actionsFile), newAction, 'utf-8')
        fs.renameSync(path.join(routesDir, actionsFile), 
                      path.join(routesDir, actionConvName.actionName + '.js'))
        resolve('Server app was created')
     })
}

var dir
var actionConvName
var question
var compConvName
var reducerName
var regex = /^\w+$/;

function scenario(count) {
    
    process.stdin.resume()

    switch (count) {

        case 1:
            question = 'Name of project: '
            break
        case 2:
            question = 'Name of action (e.g. todoList): '
            break
        case 3:
            question = 'Name of component (e.g. todoList): '
            break
        case 4:
            question = 'Name of reducer (e.g. todoList): '
            break
       case 5:
            question = 'MongoDB URL: '
            break
        case 6:
            setUpNPM(dir)
            count++
        default:
            return
    }
    
    rl.question(question, (answer) => {

     if ((answer.length === 0 || !regex.test(answer)) 
        && count !== 5) {
       console.log('Please use React convention name') 
       return scenario(count) 
     }
   
     process.stdin.pause()
   
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
                            .then(data => { 
                                 reducerName = data
                                 Promise.all(
                                     [createReactContainer(dir, compConvName, actionConvName, data)
                                     ,createReactAppComp(dir, compConvName)])          
                                 .then(data => { console.log(data[0])    
                                                 console.log(data[1]) 
                                                 count++; scenario(count); })
                                 .catch(error => { console.log(error[0]) ; console.log(error[1])})
                            })
                            .catch(error => { console.log(error) })
            break

        case 5:
            Promise.all([createServerApp(answer, dir, actionConvName),
            createServerAction(dir, actionConvName)])
                            .then(data => { count++; scenario(count) } )
                            .catch(error => { console.log(error) })
            break
        default:
           process.stdin.resume()
           break  
     }
     });
 }

 //console.log( '\x1b[31mHello world!' ) ;  

 console.log(colors.yellow(text))
 
 scenario(1) 
 

 process.on('SIGINT', function() {
    process.exit();
});
