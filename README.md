# FreasyPoll

`FreasyPoll` is a free and easy, interactive online poll.

Go to this [page](https://shenn299.github.io/HEIGVD-TWEB-FreasyPoll/)
in order to use the online application.

## Contribute

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack)
version 4.1.0.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Install

1. Clone this repository.

2. Run `npm install` to install server dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon
running

4. Run `gulp serve` to start the development server. It should automatically
open the client in your browser when ready.

### Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Documentation
![workflow-1](resources/workflow-1.png?raw=true "workflow-1")
![workflow-2](resources/workflow-2.png?raw=true "workflow-2")

From all pages, auditors and presenters can go to the Github repository of the project.

The access of the following pages don't need authentication (typically for auditors) :

  - Welcome
  - Answer
  - Question answered
  - About Freasypoll
  - Sign up
  - Log in

The following pages are available for presenters in addition to the pages above (authentication required):

  - Home
  - Poll room administration
  - Change password
  - Question creation
  - New poll room creation
  - Charts
  - Logout (not a real page)

  From all these pages, presenter can go back to the home page and the welcome page (links not drawn).


## Credits
* FRANCHINI Fabien
* HENNEBERGER Sébastien
