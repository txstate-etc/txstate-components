Local Development Server
---
Run this command:
> `docker-compose up --build`


Adding A Component (React)
---
1. Create a new folder: `src/React/MyComponent`
1. Add two files to the folder `index.js` and `MyComponent.js`
    1. Add `export * from './MyComponent'` to your new `index.js`
    1. Write your sweet new React component
1. Make your component available to import from the library by adding and entry to `src/index.js`
    * `export { MyComponent } from './MyComponent'`
1. When you're _really_ done with the component, create some type defs in `src/React/index.d.ts`
    * This lets people using your component see what props are available, and get auto completion on enum type props. For an example, check the variant prop of Button

Using Storybook to Develop
---
Storybook is a framework that allows us to develop components in an isolated environment. It acts as a living set of documentation and is extremely useful for development since you don't have to link this library with another project in order to develop with it. When you've written your component and ready to test it using Storybook, do the following:

1. Add a file to `src/stories` called `MyComponent.stories.jsx`
2. Add an entry to `src/stories/index.js` to import your component's stories.
3. Write a story.


Versioning
---
#### Patch (1.0.X)
Increment the minor version if you changed anything and you want other people to have it.

#### Minor (1.X.0)
If you've added a new component the major version should be incremented. 

#### Major (X.0.0)
If you've changed the way a component is used increment the major version and explain to the rest of the team why this change is needed (cookies help).

> **The easiest way to communicate changes is to _update CHANGELOG.md_**

#### Location
The version number is in `package.json`

Build A New Version
---
1. Run `yarn build` or `npm run build`
2. You can either publish the new version, or use it locally:
    * To use locally, run `npm pack` and install the `.tgz` file it generates as a dependency in your project.
    * To publish the package, learn how to publish a package and then write these instructions.
