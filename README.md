# react-redux-starter-kit-generator
React Redux starter kit generator


Run:
```
npm install && npm start
```
And follow the instructions :)  
index.js contains some scripts in setUpNPM function, you should change them.  
I have tested it on Linux 64bit.

```
function setUpNPM(dir) {
          cp.spawnSync('npm', ['init'], {cwd: dir, stdio: 'inherit'})
          cp.spawnSync('npm', ['install'], {cwd: dir, stdio: 'inherit'})           
          cp.spawnSync('gnome-terminal', ['-x', 'sh', '-c' ,'npm run server; bash'], {cwd: dir, stdio: 'inherit'})           
          cp.spawnSync('gnome-terminal', ['-x', 'sh', '-c' ,'npm start; bash'], {cwd: dir, stdio: 'inherit'})           
          cp.spawnSync('google-chrome', ['--app', 'http://localhost:8080'], {cwd: dir, stdio: 'inherit'})           
          //cp.spawnSync('npm', ['start'], {cwd: dir, stdio: 'inherit'})           
          console.log(`Open a new session and run: cd ${dir} && npm run server`) 
}
```
