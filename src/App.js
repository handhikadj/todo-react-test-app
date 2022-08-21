import './assets/styles/scss/index.scss';
import { AppBar, Container, Toolbar } from '@mui/material';
import AppRoutes from './routes';

const App = () => (
  <div className="app">
    <AppBar elevation={0} className="app-bar" position="fixed" color="primary">
      <Toolbar>
        <Container className="common-container" maxWidth={false}>
          <h1 className="appbar-title">TO DO LIST APP</h1>
        </Container>
      </Toolbar>
    </AppBar>

    <Container
      className="content-app-container common-container"
      maxWidth={false}
      style={{ marginTop: 90, paddingBottom: 40 }}
    >
      <AppRoutes />
    </Container>
  </div>
);
export default App;
