import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import styles from './Users.module.css';
import { Link } from 'react-router-dom';
import * as API from '../../api';
import { USERS_IN_LIST, USERS_START } from '../../config';

class Users extends React.Component {
  state = {
    allUsers: 0,
    users: [],
  };
  componentDidMount() {
    API.getLimitUsers(USERS_START)
      .then(data => {
        this.setState({ users: data });
      })
      // Здесь мы можем поймать ошибку из new Error и вывести в DOM, например
      .catch(e => alert(e.message));
    API.getAllUsers().then(data => {
      this.setState({ allUsers: data.length });
    });
  }

  handlePagClick = offset => {
    API.getLimitUsers(offset).then(data => {
      this.setState({ users: data });
    });
  };

  render() {
    const { users, allUsers } = this.state;
    let paginations = [];
    for (let i = 0; i < allUsers; i++) {
      let offset = i * USERS_IN_LIST;
      paginations.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={e => {
              e.preventDefault();
              this.handlePagClick(offset);
            }}
            href="#"
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return (
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.nav}>
            {users.map((user, idx) => {
              return (
                <li key={idx}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <Pagination aria-label="Page navigation example">
          {paginations}
        </Pagination>
      </div>
    );
  }
}

export default Users;
