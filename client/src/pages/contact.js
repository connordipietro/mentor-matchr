import { Button, Container } from '@material-ui/core';
import { EmailOutlined } from '@material-ui/icons';

export const ContactPage = () => (
  <Container minWidth="sm" alignContent="center">
    <Button
      variant="primary"
      onClick={() =>
        (window.location.href = 'mailto:connor.dipietro@gmail.com')
      }
    >
      Email connor.dipietro@gmail.com
      <EmailOutlined />
    </Button>
  </Container>
);

export default ContactPage;
