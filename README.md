# Ios
Instructor Operating Station to work with Lockheed Martin Prepar3D though P3DControl.  
See https://github.com/rbp28668/Glider-Simulator P3DInstruments sub project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Setting up Angular for this project

#Install NodeJS -see
https://github.com/nodesource/distributions/blob/master/README.md#deb

#Install basic angular cli  
sudo npm install -g @angular/cli

#Get the project from Github  
mkdir ios  
cd ios  
git init  
git pull https://github.com/rbp28668/WebIOS  

#the critical non-obvious bit - pulls down all the node dependencies (and fix audit output)  
npm install  
npm audit fix  

#compile and serve  
ng serve  
