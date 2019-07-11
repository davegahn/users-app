import React from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../api';
import { Card, CardText, CardBody, CardHeader } from 'reactstrap';
import styles from './User.module.css';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    API.getUser(id).then(data => {
      this.setState({ user: data, text: data.name });
    });
  }

  updateText = () => {
    const id = this.props.match.params.id;
    const text = this.textInput.current.innerText;
    API.editUser(text, id).then(data => {
      this.setState({ user: data });
    });
  };

  render() {
    let { user } = this.state;
    return (
      <div className={styles.wrapper}>
        <Link exact to="/" className={styles.link}>
          Назад
        </Link>
        <Card>
          <CardHeader>
            Имя:{' '}
            <div
              contentEditable="true"
              ref={this.textInput}
              onBlur={() => this.updateText()}
            >
              {user.name}
            </div>
          </CardHeader>
          <CardBody>
            <CardText>Телефон: {user.phone}</CardText>
            <CardText>Компания: {user.website}</CardText>
            <CardText>Email: {user.email}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default User;
