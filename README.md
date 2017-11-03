# Falcinator
Falcinate your react app!

## Install
`npm install https://github.com/quangogage/falcinator`

import falcinator into your desired component.

`import { Falcinator } from 'falcinator'`

Then place it as you like!

`<Falcinator />`


## Development Setup
If you want to develop on this library, start by cloning this repo

`git clone https://github.com/quangogage/falcinator`

Install Dependencies

`npm install`

### Dev
Run `npm run build:watch`. This will automatically compile any changes made in the `/lib/` directory and compile them into the `/build/` directory.

There is no built in way to run a local instance of the Falcinator. My suggestion is to use a seperate testing app.

• Install create-react-app - `npm install create-react-app -g`

• Navigate to the desired location on your local, run `create-react-app falcinator-testing-app`.

• Once that is installed cd into the app you just created, run `npm install`, then install this github repository as a dependency as shown above - `npm install https://github.com/quangogage/falcinator`.

Now when you want to see the changes you've made to this repo, simply push your changes up to master, and go into your testing app and run `npm update`.

### Deploy
Push your updates to the master branch and you've deployed!
