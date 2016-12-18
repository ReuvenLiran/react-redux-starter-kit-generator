# react-redux-starter-kit-generator
React Redux starter kit generator


Run:
```
npm install && npm start
```
And follow the instructions :)  

You will be asked few questions:
1. Name of project(directory)
2. Name of action
3. Name of component/container
4. Name of reducer
5. Mongodb URL

The app copies starter-kit folder and changes its files' names and variables' names.

index.js contains some scripts in setUpNPM function, you may choose another browser.  
I have tested it on Linux 64bit.

```
function setUpNPM(dir) {
          cp.spawnSync('npm', ['init'], {cwd: dir, stdio: 'inherit'})
          cp.spawnSync('git', ['init'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawnSync('npm', ['install'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawn('npm', ['run', 'server'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawn('npm', ['start'], {cwd: dir, stdio: 'inherit'}) 
          cp.spawnSync('google-chrome', ['--app', 'http://localhost:8080'], {cwd: dir, stdio: 'inherit'}) 
}
```
