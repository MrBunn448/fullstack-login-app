 
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getCurrentUser, logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser.user);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">Dashboard</Card.Header>
            <Card.Body>
              <Card.Title>Welcome, {user.username}!</Card.Title>
              <Card.Text>
                You have successfully logged in to the application.
              </Card.Text>
              <div className="mt-4">
                <h6>User Information:</h6>
                <ul className="list-group">
                  <li className="list-group-item">Username: {user.username}</li>
                  <li className="list-group-item">Email: {user.email}</li>
                  <li className="list-group-item">User ID: {user.id}</li>
                </ul>
              </div>
              <Button 
                variant="primary" 
                onClick={handleLogout}
                className="mt-4"
              >
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;