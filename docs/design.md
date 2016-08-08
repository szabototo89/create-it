# Design document

## Component factories

```js
// Container.js
const Container = ({ children }) => <div>{children}</div>;

// SidebarMenu.js
const SidebarMenu = (Container) => () => <Container>SidebarMenu</Container>;

// MainContent.js
const MainContent = (Container) => () => <Container>MainContent</Container>;

// Header.js
const Header = (Container) => () => <Container>Header</Container>;

// App.js
const App = ({ Container, SidebarMenu, MainContent, Header }) => (
  <Container>
    <Header />  
    <SidebarMenu />
    <MainContent />
  </Container>
);  
```

## Build dependency graph

### Version 1

```js
const container = createContainer(applyMiddlewares(...middlewares));

const SidebarMenu = container.bind(Container).to(SidebarMenuFactory);

const App = container.bind({ Container, SidebarMenu, MainContent, Header }).to(AppFactory);

export default createComponent(container)(App);  
```

### Version 2

```js
const container = createContainer(applyMiddlewares(...middlewares));

container
  .constant(Container)
  .bind(Container).to(SidebarMenu, MainContent, Header)
  .bind({ Container, SidebarMenu, MainContent, Header }).to(AppFactory);

export default createComponent(container)(App);  
```

`Container` could be an actual React component or just a factory.

### Version 3 (WRONG)

It's not good practice, because there is no reference to any factories.

```js
const dependencyGraph = {
  Container: Container, 
  SidebarMenu: [{ Container: "Container" }],
  MainContent: [{ Container: "Container" }]
  Header: [{ Container: "Container" }]
  AppFactory: [{
    Container: "Container",
    SidebarMenu: "SidebarMenu",
    MainContent: "MainContent",
    Header: "Header"
  }]
};
```

### Version 4

```js
const dependencyGraph = { 
  SidebarMenu: [{ Container: "Container" }],
  MainContent: [{ Container: "Container" }]
  Header: [{ Container: "Container" }]
  AppFactory: [{
    Container: "Container",
    SidebarMenu: "SidebarMenu",
    MainContent: "MainContent",
    Header: "Header"
  }]
};

const containerConfiguration = {
  dependencyGraph: dependencyGraph,
  factories: {
    Container: Container,
    SidebarMenu: SidebarMenu, 
    MainContent: MainContent,
    Header: Header,
    AppFactory: AppFactory  
  }
};
```

## Resolvers

- simple resolver
- lazy resolver
- configuration resolver

## Middlewares

- debug React Components
- autologger: appends logger to every Component
- logging state changes: shims `this.setState` function
- placeholder
- container to catch any render errors