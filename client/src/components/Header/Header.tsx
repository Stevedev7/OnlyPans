import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faListCheck, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Overlay, Popover, Nav, Button } from 'react-bootstrap';
import './Header.css';

import {
  removeToken,
  removeUserId,
  removeUserName,
  setAuthenticated,
} from '../../slices/auth';
import { RootState } from '../../store';
import { useVerify } from '../../hooks';
import LoginSignUp from '../LoginSignUp';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router';

const Header = () => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const { isAuthenticated, token, userName } = useSelector(
    (state: RootState) => state.auth
  );
  const target = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const isAuth = useVerify({ token });
  dispatch(setAuthenticated(isAuth));

  const onLogOut = () => {
    dispatch(removeToken());
    dispatch(removeUserId());
    dispatch(removeUserName());
  };

  const handleClosePopover = () => {
    setShow(false);
  };

  useEffect(() => {
    handleClosePopover();
  }, [location.pathname]);

  return (
    <>
      <Container fluid className="header">
        <Row>
          <Col>
            <div id="logo">
              <Link
                style={{
                  textDecoration: 'none',
                }}
                to={'/'}
              >
                🍜
              </Link>
            </div>
          </Col>
          <Col xs="auto">
          <div
                style={{
                  display:"flex",
                  justifyContent:'center',
                  flexDirection: "row"
                }}
              >
                <Button
                  variant="link"
                  ref={target}
                  href='/recipes'
                  style={{ textDecoration: 'none', color: 'grey' }}
                >
                  <FontAwesomeIcon icon={faSearch} size="lg" />
                </Button>
            {
              isAuthenticated ? (
              <>
                <Button
                  variant="link"
                  ref={target}
                  href='/profile'
                  style={{ textDecoration: 'none', color: 'grey' }}
                >
                  <FontAwesomeIcon icon={faCircleUser} size="lg" />
                </Button>
                <Button
                  variant="link"
                  ref={target}
                  href='/shopping-list'
                  style={{ textDecoration: 'none', color: 'grey' }}
                >
                  <FontAwesomeIcon icon={faListCheck} size="lg" />
                </Button>
                <Button
                className="login-signup-btn"
                variant="danger"
                onClick={onLogOut}
              >
                Logout
              </Button>
              </>
              
            ) : (
              <Button
                className="login-signup-btn"
                variant="primary"
                onClick={() => setLoginModalVisible(true)}
              >
                Login/Signup
              </Button>
            )}
          </div>
          </Col>
        </Row>
      </Container>
      <LoginSignUp show={loginModalVisible} onClose={() => setLoginModalVisible(false)} />
      <Outlet />
    </>
  );
};

export default Header;
